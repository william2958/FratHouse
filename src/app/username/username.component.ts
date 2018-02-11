import {Component, OnDestroy, OnInit} from '@angular/core';
import {SetUsernameAction} from "../store/actions/authActions";
import {userSelector} from "../store/selectors/user-selector";
import {Subscription} from "rxjs/Subscription";
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {usernameErrorsSelector} from "../store/selectors/global-error-selectors";
import {ClearErrorAction, ErrorOccurredAction, SET_USERNAME_ERROR} from "../store/actions/globalActions";
import {Router} from "@angular/router";

@Component({
	selector: 'username',
	templateUrl: './username.component.html',
	styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit, OnDestroy {

	user$: Observable<User>;
	user: any;
	userSubscription$: Subscription;

	usernameErrors$: Observable<string[]>;

	constructor(
		private store: Store<ApplicationState>,
	    private router: Router
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
			if (user && user.username) {
				this.router.navigate(['/', 'home', 'dashboard']);
			}
		});

		this.usernameErrors$ = this.store.select(usernameErrorsSelector);

	}

	setUsername(username: string) {
		this.store.dispatch(new ClearErrorAction(SET_USERNAME_ERROR));
		if (!username) {
			this.store.dispatch(new ErrorOccurredAction({
				type: SET_USERNAME_ERROR,
				message: 'Username cannot be blank!'
			}));
		} else if (username.length <= 3) {
			this.store.dispatch(new ErrorOccurredAction({
				type: SET_USERNAME_ERROR,
				message: 'Username cannot be less than 3 characters!'
			}));
		} else {
			if (this.user && username) {
				console.log('setting username...');
				this.store.dispatch(new SetUsernameAction({
					userKey: this.user.uid,
					username: username,
					fullname: this.user.first_name + ' ' + this.user.last_name
				}));
			}
		}
	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
	}

}
