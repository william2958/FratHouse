import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../store/application-state";
import {ERROR_TOAST, ShowToastAction} from "../../store/actions/globalActions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../../services/house.service";
import {House} from "../../shared/models/house";
import {AddUserToHouseAction, DeleteHouseAction} from "../../store/actions/houseActions";
import {User} from "../../shared/models/user";
import * as _ from 'lodash';
import {MaterializeAction} from "angular2-materialize";
import {Router} from "@angular/router";

@Component({
	selector: 'house-admin-panel',
	templateUrl: './house-admin-panel.component.html',
	styleUrls: ['./house-admin-panel.component.css']
})
export class HouseAdminPanelComponent implements OnInit {

	@Input() house: House;
	@Input() user: User;

	usernameSearchForm: FormGroup;
	searchResults: any;
	searchUsernameErrors: string;

	confirmDeleteActions = new EventEmitter<string|MaterializeAction>();

	constructor(
		private store: Store<ApplicationState>,
	    private houseService: HouseService,
	    private fb: FormBuilder,
	    private router: Router
	) {
		this.usernameSearchForm = this.fb.group({
			username: ['billbrick', Validators.required]
		});
	}

	ngOnInit() {
	}

	searchUsername() {
		this.searchUsernameErrors = '';
		const username = this.usernameSearchForm.value.username;
		if (username.length === 0) {
			this.searchUsernameErrors = 'Username cannot be blank!';
		} else if (username.length < 8) {
			this.searchUsernameErrors = 'Username must be at least 8 characters!';
		} else {
			console.log('searching: ', this.usernameSearchForm.value.username);
			const result = this.houseService.findUser(this.usernameSearchForm.value.username);
			result.subscribe(username => {
				console.log('name found: ', username);
				if (username.length === 0) {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'No user found!']));
				}
				this.searchResults = username[0];
			});
		}
	}

	addUser() {
		if (this.searchResults && this.house) {
			if (!_.includes( _.keys(this.house.members), this.searchResults.key)) {
				this.store.dispatch(new AddUserToHouseAction({
					user: this.searchResults,
					houseKey: this.house.key
				}));
			} else {
				this.store.dispatch(new ShowToastAction([ERROR_TOAST, 'User is already a member of this group!']));
			}
		}
	}

	showDeleteGroupModal() {
		this.confirmDeleteActions.emit({action: 'modal', params: ['open']});
	}

	close() {
		this.confirmDeleteActions.emit({action: 'modal', params: ['close']});
	}

	deleteGroup() {
		if (this.house) {
			this.store.dispatch(new DeleteHouseAction(this.house));
			this.router.navigate(['/', 'home', 'dashboard']);
		}
	}

}
