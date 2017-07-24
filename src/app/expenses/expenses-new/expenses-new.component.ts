import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../../store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {housesSelector} from "../../store/selectors/houses-selector";
import {House} from "../../shared/models/house";
import * as _ from 'lodash';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExpenseService} from "../../services/expense.service";
import {userSelector} from "../../store/selectors/user-selector";
import {Subscription} from "rxjs/Subscription";
import {CreateNewExpenseAction} from "../../store/actions/expenseActions";
import {ClearErrorAction, CREATE_EXPENSE_ERROR} from "../../store/actions/globalActions";
import {BasicUser} from "../../shared/models/user";

@Component({
	selector: 'app-expenses-new',
	templateUrl: './expenses-new.component.html',
	styleUrls: ['./expenses-new.component.css']
})
export class ExpensesNewComponent implements OnInit {

	houses$: Observable<any[]>;
	house: House;

	members: BasicUser[] = [];

	selectedMembers: BasicUser[] = [];

	newExpenseForm: FormGroup;

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	constructor(
		private store: Store<ApplicationState>,
	    private fb: FormBuilder,
	    private expenseService: ExpenseService
	) {
		this.newExpenseForm = this.fb.group({
			amount: ['', Validators.required],
			reason: ['']
		});
	}

	ngOnInit() {
		this.houses$ = this.store.select(housesSelector);
		this.houses$.subscribe(houses => {
			if (houses) {
				if (houses.length === 0) {
					console.log('no houses found');
				} else if (houses.length === 1) {
					console.log('house found and set.', houses[0]);
					this.initHouseAndMembers(houses[0]);
				} else {
					// TODO: FIX SO THAT IT DOESN'T AUTOMATICALLY CHOOSE THE FIRST HOUSE
					console.log('multiple houses found. TODO ADD FUNCTIONALITY');
					console.log('house found and set.', houses[1]);
					this.initHouseAndMembers(houses[1]);
				}
			}
		});

		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
		});

	}

	initHouseAndMembers(house: House) {
		this.house = _.cloneDeep(house);
		this.members = [];
		for (const property in this.house.members) {
			if (property !== this.user.uid) {
				this.members.push({
					key: property,
					name: (<any>this.house.members[property]).name,
					username: (<any>this.house.members[property]).username
				});
			}
		}
		console.log('members found: ', this.members);
	}

	memberSelected(member) {
		if (_.includes(this.selectedMembers, member.key)) {
			console.log('already included');
		} else {
			this.selectedMembers.push(member);
			console.log('selected members: ', this.selectedMembers);
		}
	}

	createExpense() {
		if (this.selectedMembers.length <= 0) {
			console.log('there are no members selected');
		} else {
			console.log('creating expense...');
			if (this.user) {
				console.log('creating expense...');
				this.store.dispatch(new ClearErrorAction(CREATE_EXPENSE_ERROR));
				this.store.dispatch(new CreateNewExpenseAction({
					reason: this.newExpenseForm.value.reason,
					amount: this.newExpenseForm.value.amount,
					payers: this.selectedMembers,
					userKey: this.user.uid
				}));
			} else {
				console.error('user key not found');
			}
		}
	}

}
