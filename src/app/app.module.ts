import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {PlayersComponent} from './players/players.component';
import {APIInterceptor} from './api.interceptor';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './store/effects/users';
import {UserService} from './user.service';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ViewPageComponent} from './view-page/view-page.component';

const appRoutes: Routes = [
    {path: 'players', component: PlayersComponent},
    {path: 'register/:id', component: RegisterPageComponent},
    {path: 'players/:id', component: ViewPageComponent},
    {path: '', component: HomeComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PlayersComponent,
        RegisterPageComponent,
        ViewPageComponent
    ],
    entryComponents: [
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([UsersEffects])
    ],
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
