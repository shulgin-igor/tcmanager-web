import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {User} from './shared/models/user.model';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    all(): Observable<User[]> {
        return this.http.get<User[]>('/users').pipe(
            map(data => data.map(item => new User(item)))
        );
    }

    one(id: number): Observable<User> {
        return this.http.get<User>(`/users/${id}`).pipe(
            map(data => new User(data))
        );
    }

    create(data: User): Observable<User> {
        return this.http.post<User>(`/users`, data).pipe(
            map(data => new User(data))
        );
    }

    update(id: number, data: any): Observable<User> {
        return this.http.put<User>(`/users/${id}`, data).pipe(
            map(data => new User(data))
        );
    }

}
