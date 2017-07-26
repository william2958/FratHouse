import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterializeModule} from "angular2-materialize";
import {firebaseConfig} from "../environments/firebase.config";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LandingComponent } from './landing/landing.component';
import {routes} from "./routes";
import {RouterModule} from "@angular/router";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {Action, StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {routerReducer, RouterStoreModule} from '@ngrx/router-store';
import {ApplicationState, INITIAL_APPLICATION_STATE} from "./store/application-state";
import {uiState} from "./store/reducers/uiStateReducer";
import {AuthGuard} from "./shared/guards/auth.guard";
import {LoggedOutGuard} from "./shared/guards/logged-out.guard";
import {AuthService} from "./services/auth.service";
import {AuthEffectService} from "./store/effects/auth-effect.service";
import {ToastService} from "./services/toast.service";
import {GlobalEffectService} from "./store/effects/global-effect.service";
import { ModalsComponent } from './modals/modals.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import {ExpenseService} from "./services/expense.service";
import {HouseService} from "./services/house.service";
import { CreateHouseComponent } from './create-house/create-house.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {houseData} from "./store/reducers/houseDataReducer";
import {HouseEffectService} from "./store/effects/house-effect.service";
import { MyAccountComponent } from './my-account/my-account.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import {expenseData} from "./store/reducers/expenseDataReducer";
import {ExpenseEffectService} from "./store/effects/expense-effect.service";
import { ExpensesNewComponent } from './expenses/expenses-new/expenses-new.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import {TransactionService} from "./services/transaction.service";
import {transactionData} from "./store/reducers/transactionDataReducer";
import {TransactionEffectService} from "./store/effects/transaction-effect.service";
import { TransactionsComponent } from './transactions/transactions/transactions.component';

export function storeReducer(state: ApplicationState, action: Action): ApplicationState {
	return {
		uiState: uiState(state.uiState, action),
		houseData: houseData(state.houseData, action),
		expenseData: expenseData(state.expenseData, action),
		transactionData: transactionData(state.transactionData, action),
		router: routerReducer(state.router, action)
	};
}

@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		ModalsComponent,
		HomeComponent,
		Error404Component,
		CreateHouseComponent,
		DashboardComponent,
		SideNavComponent,
		MyAccountComponent,
		HouseDetailComponent,
		ExpensesComponent,
		ExpensesNewComponent,
		ExpenseDetailComponent,
		TransactionsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MaterializeModule,
		RouterModule.forRoot(routes),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		StoreModule.provideStore(
			storeReducer,
			INITIAL_APPLICATION_STATE
		),
		RouterStoreModule.connectRouter(),
		StoreDevtoolsModule.instrumentOnlyWithExtension(),
		EffectsModule.run(AuthEffectService),
		EffectsModule.run(GlobalEffectService),
		EffectsModule.run(HouseEffectService),
		EffectsModule.run(ExpenseEffectService),
		EffectsModule.run(TransactionEffectService)
	],
	providers: [
		AuthGuard,
		LoggedOutGuard,
		AuthService,
		AuthEffectService,
		GlobalEffectService,
		HouseEffectService,
		ToastService,
		ExpenseService,
		HouseService,
		ExpenseEffectService,
		TransactionService,
		TransactionEffectService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
