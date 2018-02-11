import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {HouseService} from "../../services/house.service";
import * as _ from 'lodash';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {User} from "../../shared/models/user";
import {userSelector} from "../../store/selectors/user-selector";
import {ERROR_TOAST, ShowToastAction, SUCCESS_TOAST} from "../../store/actions/globalActions";
import {CreateHouseAction} from "../../store/actions/houseActions";

@Component({
	selector: 'app-create-house',
	templateUrl: './create-house.component.html',
	styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {

	usernameSearchForm: FormGroup;
	searchResults: any;
	selectedUsers: any[] = [];

	user$: Observable<User>;
	user: User;
	userSubscription$: Subscription;

	searchUsernameErrors: string;

	constructor(
		private router: Router,
	    private store: Store<ApplicationState>,
	    private fb: FormBuilder,
	    private houseService: HouseService
	) {

		this.usernameSearchForm = this.fb.group({
			username: ['billbrick', Validators.required]
		});

	}

	ngOnInit() {
		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
		});
	}

	searchUsername() {
		this.searchUsernameErrors = '';
		const username = this.usernameSearchForm.value.username;
		if (username.length === 0) {
			this.searchUsernameErrors = 'Username cannot be blank!';
		} else if (username.length < 8) {
			this.searchUsernameErrors = 'Username must be at least 8 characters!';
		} else {
			console.log('searching: ', this.usernameSearchForm.value.username);
			const result = this.houseService.findUser(this.usernameSearchForm.value.username);
			result.subscribe(username => {
				console.log('name found: ', username);
				this.searchResults = username[0];
			});
		}
	}

	selectUser() {
		let exists = false;
		for (const user of this.selectedUsers) {
			if (user.key === this.searchResults.key) {
				exists = true;
			}
		}
		if (exists) {
			this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'User has already been selected!']));
		} else {
			this.selectedUsers.push(this.searchResults);
			this.searchResults = undefined;
		}

	}

	removeUser(user) {
		console.log('removing: ', user, ' from: ', this.selectedUsers);
	}

	createHouse(houseName: string) {
		if (this.selectedUsers.length <= 0) {
			this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'Cannot create a house with no members!']));
		} else if (!houseName) {
			this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'Must choose a house name!']));
		} else {
			if (this.user) {
				this.store.dispatch(new ShowToastAction([SUCCESS_TOAST, 'Creating group...']));
				this.store.dispatch(new CreateHouseAction({
					user: this.user,
					selectedUsers: this.selectedUsers,
					houseName: houseName
				}));
				this.router.navigate(['/', 'home', 'dashboard']);
			}
		}
	}

}
