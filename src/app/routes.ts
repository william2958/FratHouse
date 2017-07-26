import {Routes} from "@angular/router";
import {LandingComponent} from "./landing/landing.component";
import {LoggedOutGuard} from "./shared/guards/logged-out.guard";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {Error404Component} from "./error404/error404.component";
import {CreateHouseComponent} from "./create-house/create-house.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {HouseDetailComponent} from "./house-detail/house-detail.component";
import {ExpensesComponent} from "./expenses/expenses/expenses.component";
import {ExpensesNewComponent} from "./expenses/expenses-new/expenses-new.component";
import {ExpenseDetailComponent} from "./expenses/expense-detail/expense-detail.component";
import {TransactionsComponent} from "./transactions/transactions/transactions.component";
export const routes: Routes = [

	{
		path: '',
		component: LandingComponent,
		pathMatch: 'full',
		canActivate: [LoggedOutGuard]
	},
	{
		path: 'home',
		canActivate: [AuthGuard],
		component: HomeComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'create-house',
				component: CreateHouseComponent
			},
			{
				path: 'user',
				component: MyAccountComponent
			},
			{
				path: 'house-detail/:houseId',
				component: HouseDetailComponent
			},
			{
				path: 'expenses',
				children: [
					{
						path: 'new',
						component: ExpensesNewComponent
					},
					{
						path: ':expenseId',
						component: ExpenseDetailComponent
					},
					{
						path: '',
						pathMatch: 'full',
						component: ExpensesComponent
					}
				]
			},
			{
				path: 'transactions',
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: TransactionsComponent
					}
				]
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'dashboard'
			}
		]
	},
	{
		path: '**',
		component: Error404Component
	}

];
