import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {State} from '../store/reducers';
import {Create} from '../store/actions/users';
import {User} from '../shared/models/user.model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

    public radioOptions: any = {
        day: moment().add(1, 'day').format('YYYY-MM-DD'),
        month: moment().add(1, 'month').format('YYYY-MM-DD')
    };

    public form: FormGroup;
    private errors$: Observable<any>;

    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.form = new FormGroup({
            first_name: new FormControl(),
            last_name: new FormControl(),
            phone_number: new FormControl(),
            expires_on: new FormControl(),
            card_id: new FormControl()
        });

        this.errors$ = store.select(state => state.users.errors)

    }

    ngOnInit() {
        this.route.params.subscribe(params => this.form.get('card_id').setValue(params.id));
        this.errors$.subscribe(errors => {
            if (errors !== {}) { // TODO: improve this check
                const e = {};
                for (const key in errors) {
                    e[key] = errors[key][0];
                }
                this.form.setErrors(e);
            }
        });
    }

    register() {
        this.store.dispatch(new Create(new User(this.form.value)));
        // TODO: redirect after created
    }

}
