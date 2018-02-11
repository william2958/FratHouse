import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class DashboardComponent implements OnInit, OnDestroy {

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	constructor(
		private store: Store<ApplicationState>,
		private houseService: HouseService,
		private router: Router
	) { }

	ngOnInit() {

		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
			if (this.user && !this.user.username) {
				this.router.navigate(['/', 'home', 'username']);
			}
		});
	}

	searchUsernames(query = 'billbrick') {
		const usernames = this.houseService.findUser(query);
		usernames.subscribe(username => {
			console.log('name found: ', username);
		});
	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
	}

}
