import {Component, EventEmitter, OnInit} from '@angular/core';
import {ApplicationState} from "../store/application-state";
import { Store } from '@ngrx/store';
import {SignOutAction} from "../store/actions/authActions";
import {ExpenseService} from "../services/expense.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {userKeySelector} from "../store/selectors/user-key-selector";
import {HouseService} from "app/services/house.service";
import {AuthService} from "../services/auth.service";
import {userSelector} from "../store/selectors/user-selector";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {housesSelector} from "../store/selectors/houses-selector";
import {LoadHousesAction} from "../store/actions/houseActions";

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	sidenavActions = new EventEmitter<any>();
	user$: Observable<User>;
	houses$: Observable<any[]>;

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {
		this.user$ = this.store.select(userSelector);
		this.houses$ = this.store.select(housesSelector);


		this.user$.skip(1).first().subscribe(user => {
			console.log('user recieved: ', user);
			if (user) {
				this.store.dispatch(new LoadHousesAction(user.uid));
			}
		});
	}

	shownav() {
		this.sidenavActions.emit({action: "sideNav", params: ['show']});
	}

}
