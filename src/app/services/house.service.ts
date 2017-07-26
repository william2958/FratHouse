import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {House} from "../shared/models/house";
import {BasicUser, User} from "../shared/models/user";
import * as firebase from 'firebase';

@Injectable()
export class HouseService {

	constructor(
		private db: AngularFireDatabase
	) { }

	getHouses(userKey: string) {

		const houseKeys$ = this.findHouseKeys(userKey);

		// Once we have the house Keys we go find the houses associated to them.
		return this.findHousesForHouseKeys(houseKeys$);
	}

	createHouse(user: User, members: BasicUser[], houseName: string) {
		const newHouseKey = this.db.database.ref().child('houses').push().key;
		const dataToSave = {};
		const membersObject = {};

		for (const member of members) {
			console.log('adding house to memberKey: ', member.key);
			dataToSave['housesPerUser/' + member.key + '/' + newHouseKey] = true;
			membersObject[member.key] = {
				name: member.name,
				username: member.username
			};
		}

		membersObject[user.uid] = {
			name: user.first_name + ' ' + user.last_name,
			username: user.username
		};

		dataToSave['houses/' + newHouseKey] = {
			admin: user.uid,
			members: membersObject,
			name: houseName,
			date_created: firebase.database.ServerValue.TIMESTAMP
		};

		dataToSave['housesPerUser/' + user.uid + '/' + newHouseKey] = true;

		return this.firebaseUpdate(dataToSave);

	}

	findUser(nickname: string) {
		return this.db.list('usernames', {
			query: {
				orderByKey: true,
				equalTo: nickname,
				limitToFirst: 1
			}
		}).first().map(user => {
			console.log('mapping: ', user);
			return user.map(userdetail => {
				return {
					username: userdetail.$key,
					key: userdetail.userKey,
					name: userdetail.name
				};
			});
		});
	}

	findHouseKeys(userKey: string): Observable<string[]> {
		return this.db.list('housesPerUser/' + userKey)
			.map(housePerUser => {
				return housePerUser.map(house => house.$key);
			});
	}

	findHousesForHouseKeys(houseKeys$: Observable<string[]>): Observable<House[]> {
		return houseKeys$
			.map(houses => {
				// this is the array of keys
				return houses.map(houseKey => {
					return this.db.object('houses/' + houseKey);
				});
			})
			.flatMap(firebaseObjectObservables => Observable.combineLatest(firebaseObjectObservables));
	}

	firebaseUpdate(dataToSave) {

		const subject = new Subject();

		this.db.database.ref().update(dataToSave)
			.then(
				val => {
					subject.next(val);
					subject.complete();
				},
				err => {
					subject.error(err);
					subject.complete();
				}
			);

		return subject.asObservable();

	}

}
