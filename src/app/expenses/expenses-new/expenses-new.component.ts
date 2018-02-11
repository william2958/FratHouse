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
import {Router} from "@angular/router";

@Component({
	selector: 'app-expenses-new',
	templateUrl: './expenses-new.component.html',
	styleUrls: ['./expenses-new.component.css']
})
export class ExpensesNewComponent implements OnInit {

	houses$: Observable<any[]>;
	house: House;
	houses: House[];

	members: BasicUser[] = [];

	selectedMembers: BasicUser[] = [];

	newExpenseForm: FormGroup;

	user$: Observable<any>;
	user: any;
	userSubscription$: Subscription;

	constructor(
		private store: Store<ApplicationState>,
	    private fb: FormBuilder,
	    private router: Router
	) {
		this.newExpenseForm = this.fb.group({
			title: ['Groceries', Validators.required],
			amount: ['20', Validators.required],
			reason: ['milk & cookies']
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
					this.houses = houses;
					// TODO: REMOVE THIS LINEs
					// this.house = houses[0];
					this.initHouseAndMembers(houses[0]);
				}
			}
		});

		this.user$ = this.store.select(userSelector);
		this.userSubscription$ = this.user$.subscribe(user => {
			this.user = user;
		});

	}

	selectHouse(house: House) {
		this.initHouseAndMembers(house);
	}

	initHouseAndMembers(house: House) {
		if (!this.house) {
			this.house = _.cloneDeep(house);
			this.members = [];
			for (const property in this.house.members) {
				this.members.push({
					key: property,
					name: (<any>this.house.members[property]).name,
					username: (<any>this.house.members[property]).username
				});
			}
			console.log('members found: ', this.members);
		}
	}

	selectMember(e, member) {

		if (e.target.checked) {
			if (_.includes(this.selectedMembers, member.key)) {
				console.log('already included');
			} else {
				this.selectedMembers.push(member);
			}
		} else {
			_.remove(this.selectedMembers, member);
		}

	}

	createExpense() {
		if (this.selectedMembers.length <= 0) {
			console.log('there are no members selected');
		} else {
			console.log('creating expense...');
			if (this.user && this.house) {
				console.log('creating expense...');
				const individual_expense = this.newExpenseForm.value.amount / this.selectedMembers.length;
				_.remove(this.selectedMembers, member => {
					return member.key === this.user.uid;
				});
				this.store.dispatch(new ClearErrorAction(CREATE_EXPENSE_ERROR));
				this.store.dispatch(new CreateNewExpenseAction({
					title: this.newExpenseForm.value.title,
					reason: this.newExpenseForm.value.reason,
					amount: this.newExpenseForm.value.amount,
					individualAmount: individual_expense,
					payers: this.selectedMembers,
					userKey: this.user.uid,
					houseKey: this.house.key,
					payeeName: this.user.first_name + ' ' + this.user.last_name
				}));
				this.router.navigate(['/', 'home', 'expenses']);
			} else {
				console.error('user key not found');
			}
		}
	}

}
