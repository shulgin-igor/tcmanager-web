import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {UserService} from '../user.service';
import {Store} from '@ngrx/store';
import {State} from '../store/reducers';
import {List} from '../store/actions/users';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
    providers: [UserService]
})
export class PlayersComponent implements OnInit {

    public players$: Observable<{[id: number]: User}>;

    constructor(private store: Store<State>) {
        this.players$ = this.store.select(state => state.users.list);
    }

    ngOnInit() {

        this.players$.subscribe(list => console.log(list))

        this.store.dispatch(new List());
    }

}
