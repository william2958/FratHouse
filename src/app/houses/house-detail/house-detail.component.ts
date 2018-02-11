import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {House} from "../../shared/models/house";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';
import {
	currentHouseOutstandingExpensesSelector, currentHouseOwedExpensesSelector,
	housesSelector
} from "../../store/selectors/houses-selector";
import {BasicUser, User} from "../../shared/models/user";
import {userSelector} from "../../store/selectors/user-selector";
import {Expense} from "../../shared/models/expense";
import {
	LoadCurrentHouseOutstandingExpensesAction,
	LoadCurrentHouseOwedExpensesAction
} from "../../store/actions/expenseActions";

@Component({
	selector: 'app-house-detail',
	templateUrl: './house-detail.component.html',
	styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit, OnDestroy {

	houseId: string;
	house: House;
	houses$: Observable<House[]>;
	houses: House[];
	housesSubscription$: Subscription;

	user$: Observable<User>;
	user: User;
	userSubscription$: Subscription;

	members: BasicUser[] = [];

	currentHouseOwedExpenses$: Observable<Expense[]>;
	currentHouseOutstandingExpenses$: Observable<Expense[]>;
	expensesLoaded = false;

	constructor(
		private store: Store<ApplicationState>,
	    private route: ActivatedRoute
	) {

	}


	ngOnInit() {

		this.route.params.subscribe(params => {
			this.houseId = params['houseId'];
			this.findHouse();
		});
		this.houses$ = this.store.select(housesSelector);
		this.user$ = this.store.select(userSelector);

		this.currentHouseOwedExpenses$ = this.store.select(currentHouseOwedExpensesSelector);
		this.currentHouseOutstandingExpenses$ = this.store.select(currentHouseOutstandingExpensesSelector);

		this.housesSubscription$ = this.houses$.subscribe(houses => {
			this.houses = houses;
			this.findHouse();
			if (this.user && this.house && !this.expensesLoaded) {
				this.store.dispatch(new LoadCurrentHouseOwedExpensesAction({userKey: this.user.uid, houseKey: this.house.key}));
				this.store.dispatch(new LoadCurrentHouseOutstandingExpensesAction({userKey: this.user.uid, houseKey: this.house.key}));
				this.expensesLoaded = true;
			}
		});

		this.userSubscription$ = this.user$.subscribe(user => {
			if (user) {
				this.user = user;
			}
			if (user && this.house && !this.expensesLoaded) {
				this.store.dispatch(new LoadCurrentHouseOwedExpensesAction({userKey: user.uid, houseKey: this.house.key}));
				this.store.dispatch(new LoadCurrentHouseOutstandingExpensesAction({userKey: user.uid, houseKey: this.house.key}));
				this.expensesLoaded = true;
			}
		});

	}

	findHouse() {
		if (this.houses) {
			for (const house of this.houses) {
				if (house.key === this.houseId) {
					this.house = _.cloneDeep(house);
					console.log('house found: ', this.house);
					this.members = [];
					for (const property in this.house.members) {
						this.members.push({
							key: property,
							name: (<any>this.house.members[property]).name,
							username: (<any>this.house.members[property]).username
						});
					}
					console.log('members: ', this.members);
				}
			}
		}
	}

	ngOnDestroy() {
		this.userSubscription$.unsubscribe();
		this.housesSubscription$.unsubscribe();
	}

}
