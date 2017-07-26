import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {HouseService} from "../services/house.service";
import * as _ from 'lodash';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {userKeySelector} from "../store/selectors/user-key-selector";
import {User} from "../shared/models/user";
import {userSelector} from "../store/selectors/user-selector";

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
		console.log('searching: ', this.usernameSearchForm.value.username);
		const result = this.houseService.findUser(this.usernameSearchForm.value.username);
		result.subscribe(username => {
			console.log('name found: ', username);
			this.searchResults = username[0];
		});
	}

	selectUser() {
		let exists = false;
		for (const user of this.selectedUsers) {
			if (user.key === this.searchResults.key) {
				exists = true;
			}
		}
		if (exists) {
			console.log('that user has already been selected');
		} else {
			this.selectedUsers.push(this.searchResults);
		}

	}

	createHouse(houseName: string) {
		if (this.user) {
			console.log('CREATING HOUSE WITH: ', this.selectedUsers, houseName);
			const memberKeys = this.selectedUsers;
			console.log('keys: ', memberKeys);
			this.houseService.createHouse(this.user, memberKeys, houseName);
		}
	}

	back() {
		this.router.navigate(['/', 'home', 'dashboard']);
	}

}
