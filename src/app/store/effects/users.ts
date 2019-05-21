import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {UserService} from '../../user.service';
import * as UserActions from '../actions/users';
import {map, switchMap, catchError, withLatestFrom} from 'rxjs/internal/operators';
import {of} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {Create, List, View} from '../actions/users';

@Injectable()

export class UsersEffects {
    constructor(private actions$: Actions, private userService: UserService, private store: Store<State>) {
    }

    @Effect()
    listUsers$ = this.actions$.pipe(
        ofType<List>(UserActions.LIST),
        switchMap(() => {
            return this.userService.all().pipe(
                map(users => {
                    users = users.reduce((obj: any, u: User) => {
                        obj[u.id] = new User(u);
                        return obj;
                    }, {});
                    return new UserActions.ListLoaded(users);
                })
            );
        })
    );

    @Effect()
    createUser$ = this.actions$.pipe(
        ofType<Create>(UserActions.CREATE),
        map(action => action.payload),
        switchMap(payload => {
            return this.userService.create(payload).pipe(
                map(user => new UserActions.Created(user)),
                catchError(error => of(new UserActions.ValidationFailed(error.error))) // TODO: check if error status is 422
            );
        })
    );

    @Effect()
    viewUser$ = this.actions$.pipe(
        ofType<View>(UserActions.VIEW),
        withLatestFrom(this.store.select(state => state.users.list)),
        map(([action, list]) => {
            const id = action.payload;
            return [list[id] || null, id];
        }),
        switchMap(([user, id]: [User | null, number]) => {
            if (user) {
                return of(user).pipe(
                    map(user => {
                        return new UserActions.ViewSuccess(user);
                    })
                );
            }

            return this.userService.one(id).pipe(
                map(user => new UserActions.ViewSuccess(user)),
                catchError(error => of(new UserActions.ViewFailed(error.error))) // TODO: check if error status is 404
            );
        })
    );

}