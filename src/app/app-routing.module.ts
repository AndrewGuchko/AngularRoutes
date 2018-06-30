import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { Routes, RouterModule } from '@angular/router'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './users/user/user.component';
import { ActivateGuardService } from './activate-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server.resolver';
import { ServerComponent } from './servers/server/server.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children:[
      { path: ':id/:name', component: UserComponent }
    ] },
    { path: 'servers', component: ServersComponent, children:[
      { path: ':id', component: ServerComponent,  canActivate: [ActivateGuardService], 
        resolve: {servResol: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent,   canActivate: [ActivateGuardService], 
          canDeactivate: [CanDeactivateGuard] }
    ] },
  //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', redirectTo: '/not-found' },
  ];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}