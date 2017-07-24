import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {House} from "../shared/models/house";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';
import {housesSelector} from "../store/selectors/houses-selector";
import {BasicUser} from "../shared/models/user";

@Component({
	selector: 'app-house-detail',
	templateUrl: './house-detail.component.html',
	styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

	houseId: string;
	house: House;
	houses$: Observable<House[]>;
	houses: House[];
	housesSubscription$: Subscription;

	members: BasicUser[] = [];

	constructor(
		private store: Store<ApplicationState>,
	    private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {

		this.route.params.subscribe(params => {
			this.houseId = params['houseId'];
			this.findHouse();
		});
		this.houses$ = this.store.select(housesSelector);

		this.housesSubscription$ = this.houses$.subscribe(houses => {
			this.houses = houses;
			this.findHouse();
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

}
