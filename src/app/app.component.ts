import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationStart, Router} from '@angular/router'
import {Store} from '@ngrx/store';
import {State} from './store/reducers';
import {MenuToggle} from './store/actions/ui';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private menuOpened$: Observable<boolean>;

    constructor(private store: Store<State>, private router: Router, private renderer: Renderer2) {
        this.menuOpened$ = this.store.select(state => state.ui.opened);
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationStart) {
                this.store.dispatch(new MenuToggle());
            }
        });
    }

    ngOnInit() {
        this.menuOpened$.subscribe(value => this.renderer[value ? 'addClass' : 'removeClass'](document.body, 'site-wrapper--has-overlay'));
    }

    toggleMenu() {
        this.store.dispatch(new MenuToggle());
    }

}
