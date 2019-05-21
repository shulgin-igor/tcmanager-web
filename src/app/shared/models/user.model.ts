import * as moment from 'moment';

export class User {
    id: number;
    card_id: String;
    first_name: String;
    last_name: String;
    phone_number: String;
    expires_on: moment.Moment;

    constructor(data: any) {
        if (data.expires_on) {
            data.expires_on = moment(data.expires_on);
        }
        Object.assign(this, data);
    }

    public expired(): boolean {
        return this.expires_on < moment();
    }

    public fullName() {
        return this.first_name + " " + this.last_name;
    }

}