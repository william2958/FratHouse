export interface User {
	uid: string;
	email: string;
	first_name: string;
	last_name: string;
	username: string;
	first_time: boolean;
	date_created: number;
	email_confirmed: boolean;
}

export interface BasicUser {
	key: string;
	name: string;
	username: string;
}
