import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
import {ExpenseService} from "../services/expense.service";
import {HouseService} from "../services/house.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {userKeySelector} from "../store/selectors/user-key-selector";
import {userSelector} from "../store/selectors/user-selector";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	userKey$: Observable<string>;
	userKey: string;
	userKeySubscription$: Subscription;

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	constructor(
		private store: Store<ApplicationState>,
		private expenseService: ExpenseService,
		private houseService: HouseService,
		private authService: AuthService,
		private router: Router
	) { }

	ngOnInit() {
		this.userKey$ = this.store.select(userKeySelector);
		this.userKeySubscription$ = this.userKey$.subscribe(key => {
			this.userKey = key;
		});

		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
		});
	}

	createHouse() {
		this.router.navigate(['/', 'home', 'create-house']);
	}

	searchUsernames(query = 'billbrick') {
		const usernames = this.houseService.findUser(query);
		usernames.subscribe(username => {
			console.log('name found: ', username);
		});
	}

	setUsername(username: string) {
		if (this.user) {
			console.log('setting Username...');
			this.authService.setUsername(this.user.uid, username, this.user.first_name + ' ' + this.user.last_name);
		} else {
			console.error('user not found');
		}
	}

}
