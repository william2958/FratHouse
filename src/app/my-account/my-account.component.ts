import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Observable";
import {userSelector} from "../store/selectors/user-selector";
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs/Subscription";

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

	user$: Observable<User>;
	user: any;
	userSubscription$: Subscription;

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {
		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
		});
	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
	}

}
