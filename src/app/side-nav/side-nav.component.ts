import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SignOutAction} from "../store/actions/authActions";
import {ApplicationState} from "../store/application-state";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
	selector: 'side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit, OnChanges {

	@Input() houses;

	constructor(
		private store: Store<ApplicationState>,
	    private router: Router
	) { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {


	}

	goToHouse(house) {
		this.router.navigate(['/', 'home', 'house-detail', house.key]);
	}

	logout() {
		this.store.dispatch(new SignOutAction());
	}

}
