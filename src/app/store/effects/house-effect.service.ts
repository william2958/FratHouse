import {Injectable} from "@angular/core";
import {HouseService} from "../../services/house.service";
import {Actions, Effect} from "@ngrx/effects";
import {HousesLoadedAction, LOAD_HOUSES_ACTION} from "../actions/houseActions";
import {Observable} from "rxjs/Observable";
import {ERROR_TOAST, ShowToastAction} from "../actions/globalActions";
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

}
