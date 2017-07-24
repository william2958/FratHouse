import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {ShowLoginModalAction, ShowSignupModalAction} from "../store/actions/authActions";

@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	constructor(
		private store: Store<ApplicationState>
	) { }

	ngOnInit() {

	}

	activateLoginModal() {
		this.store.dispatch(new ShowLoginModalAction());
	}

	activateSignupModal() {
		this.store.dispatch(new ShowSignupModalAction());
	}

}
