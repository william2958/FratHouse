import {Injectable} from "@angular/core";
import {HouseService} from "../../services/house.service";
import {Actions, Effect} from "@ngrx/effects";
import {
	ADD_USER_TO_HOUSE_ACTION, CREATE_HOUSE_ACTION, DELETE_HOUSE_ACTION, HousesLoadedAction,
	LOAD_HOUSES_ACTION, REMOVE_USER_FROM_HOUSE_ACTION
} from "../actions/houseActions";
import {Observable} from "rxjs/Observable";
import {ERROR_TOAST, ShowToastAction, SUCCESS_TOAST} from "../actions/globalActions";
import {ApplicationState} from "../application-state";
import {Store} from "@ngrx/store";

@Injectable()
export class HouseEffectService {

	constructor (
		private actions$: Actions,
		private houseService: HouseService,
	    private store: Store<ApplicationState>
	) { }

	@Effect() getHouses$ = this.actions$
		.ofType(LOAD_HOUSES_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.houseService.getHouses(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(houses => new HousesLoadedAction(houses));

	@Effect() createHouse$ = this.actions$
		.ofType(CREATE_HOUSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.houseService.createHouse(
					action.payload.user,
					action.payload.selectedUsers,
					action.payload.houseName
				)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'Group created!']));

	@Effect() addUserToHouse$ = this.actions$
		.ofType(ADD_USER_TO_HOUSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.houseService.addUserToHouse(action.payload.user, action.payload.houseKey)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'User Added!']));

	@Effect() removeUserFromHouse$ = this.actions$
		.ofType(REMOVE_USER_FROM_HOUSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.houseService.removeUserFromHouse(action.payload.user, action.payload.houseKey)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'User Removed.']));

	@Effect() deleteHouse$ = this.actions$
		.ofType(DELETE_HOUSE_ACTION)
		.switchMap(action => Observable
			.from(
				// Payload is user uid
				this.houseService.deleteHouse(action.payload)
			).catch(
				(err) => {
					this.store.dispatch(new ShowToastAction([ERROR_TOAST, err.message]));
					return Observable.empty();
				}
			)
		)
		.map(response => new ShowToastAction([SUCCESS_TOAST, 'House deleted!']));

}
