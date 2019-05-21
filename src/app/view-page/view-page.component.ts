import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {View} from '../store/actions/users';
import {Observable} from 'rxjs';
import {State} from '../store/reducers';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-view-page',
    templateUrl: './view-page.component.html',
    styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

    public user$: Observable<any>;

    constructor(private store: Store<State>, private route: ActivatedRoute) {
        this.user$ = this.store.select(state => state.users.selected)
    }

    ngOnInit() {
        this.route.params.subscribe(params => this.store.dispatch(new View(params.id)));

    }

}
