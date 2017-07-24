import {Component, EventEmitter, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MaterializeAction} from "angular2-materialize";
import * as firebase from 'firebase';
import {User} from "../shared/models/user";
import {ApplicationState} from "../store/application-state";
import {
	loginErrorsSelector, showLoginSelector, showSignupSelector,
	signupErrorsSelector
} from "../store/selectors/show-modal-selectors";
import {
	ClearErrorAction, ErrorOccurredAction, LOGIN_ERROR, ShowToastAction, SIGNUP_ERROR,
	SUCCESS_TOAST
} from "../store/actions/globalActions";
import {userSelector} from "../store/selectors/user-selector";
import {SignInEmailAction, SignInGoogleAction, SignupAction} from "../store/actions/authActions";

@Component({
	selector: 'modals',
	templateUrl: './modals.component.html',
	styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

	showLoginModal$: Observable<boolean>;
	showSignupModal$: Observable<boolean>;

	loginErrors$: Observable<string[]>;
	signupErrors$: Observable<string[]>;
	forgotError: string;

	loginForm: FormGroup;
	signupForm: FormGroup;

	user$: Observable<User>;

	loginModalActions = new EventEmitter<string|MaterializeAction>();
	signupModalActions = new EventEmitter<string|MaterializeAction>();
	forgotModalActions = new EventEmitter<string|MaterializeAction>();

	constructor(
		private store: Store<ApplicationState>,
		private router: Router,
		private fb: FormBuilder
	) {
		this.showLoginModal$ = this.store.select(showLoginSelector).skip(1);
		this.showSignupModal$ = this.store.select(showSignupSelector).skip(1);

		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.signupForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			confirm_password: ['', Validators.required]
		});

	}

	ngOnInit() {

		this.showLoginModal$.subscribe(
			() => {
				this.loginModalActions.emit({action: 'modal', params: ['open']});
			}
		);

		this.showSignupModal$.subscribe(
			() => {
				this.signupModalActions.emit({action: 'modal', params: ['open']});
			}
		);

		this.loginErrors$ = this.store.select(loginErrorsSelector);
		this.signupErrors$ = this.store.select(signupErrorsSelector);

	}

	// TODO: find a better place to do a router.navigate instead of subscribing to the user here

	login() {
		this.store.dispatch(new ClearErrorAction(LOGIN_ERROR));
		this.store.dispatch(new SignInEmailAction({
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		}));
		this.user$ = this.store.select(userSelector);
		this.user$.take(2).subscribe(
			user => {
				const firebaseUser = firebase.auth().currentUser;
				if (firebaseUser) {
					const verified = firebaseUser.emailVerified;
					if (user && verified) {
						this.loginModalActions.emit({action: 'modal', params: ['close']});
						this.loginForm.reset();
						this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Login Successful!']));
						this.router.navigate(['/', 'home']);
					} else if (!verified && user) {
						console.log(verified);
						this.store.dispatch(new ClearErrorAction(LOGIN_ERROR));
						this.store.dispatch(new ErrorOccurredAction({
							type: LOGIN_ERROR,
							message: 'Email has not been verified!'
						}));
					}
				}
			}
		);
	}

	forgotPassword() {
		this.loginModalActions.emit({action: 'modal', params: ['close']});
		this.forgotModalActions.emit({action: 'modal', params: ['open']});
	}

	sendResetEmail(email: string) {
		firebase.auth().sendPasswordResetEmail(email).then(() => {
			console.log('email sent.');
			this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Email sent!']));
			this.forgotModalActions.emit({action: 'modal', params: ['close']});
		}, (error: any) => {
			console.log('error found', error);
			if (error.code === 'auth/user-not-found') {
				this.forgotError = 'Could not find an account with that email.';
			} else {
				this.forgotError = error.message;
			}
		});
	}

	loginWithGoogle() {
		this.store.dispatch(new SignInGoogleAction());
		this.user$ = this.store.select(userSelector);
		this.user$.take(2).subscribe(
			user => {
				if (user) {
					this.loginModalActions.emit({action: 'modal', params: ['close']});
					this.loginForm.reset();
					this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Login Successful!']));
					this.router.navigate(['/', 'home']);
				}
			}
		);
	}

	signup() {
		this.store.dispatch(new ClearErrorAction(SIGNUP_ERROR));

		if (!this.signupForm.valid) {
			this.store.dispatch(new ErrorOccurredAction({
				type: SIGNUP_ERROR,
				message: 'Invalid form'
			}));
		} else {

			this.store.dispatch(new SignupAction({
				email: this.signupForm.value.email,
				password: this.signupForm.value.password,
				first_name: this.signupForm.value.first_name,
				last_name: this.signupForm.value.last_name
			}));
			this.store.select(userSelector).take(2).subscribe(
				user => {
					if (user) {
						firebase.auth().currentUser.sendEmailVerification().then(() => {
							this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Signup Successful!']));
							this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Email confirmation sent!']));
							this.signupModalActions.emit({action: 'modal', params: ['close']});
							this.signupForm.reset();
						}, error => {
							this.store.dispatch(new ErrorOccurredAction({
								type: SIGNUP_ERROR,
								message: 'Something went wrong when sending the email verification'
							}));
						});
					}
				}
			);
		}
	}

	close() {
		this.loginModalActions.emit({action: 'modal', params: ['close']});
		this.signupModalActions.emit({action: 'modal', params: ['close']});
		this.forgotModalActions.emit({action: 'modal', params: ['close']});
	}

}
