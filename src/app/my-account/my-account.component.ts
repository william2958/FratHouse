import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Observable";
import {userSelector} from "../store/selectors/user-selector";
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";

@Component({
	selector: 'app-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

	user$: Observable<User>

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {
		this.user$ = this.store.select(userSelector);
	}

}
