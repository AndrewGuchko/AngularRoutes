import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { Routes, RouterModule } from "@angular/router";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFountComponent } from "./page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth-guard.service";
import { CanDiactivateGuard } from "./servers/edit-server/can-diactivate.service";


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children:[
      { path: ':id/:name', component: UserComponent }
    ] },
    { 
        path: 'servers', 
        //canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent, 
        children:[
        { path: ':id', component: ServerComponent },
        { path: ':id/edit', component: EditServerComponent , canDeactivate: [CanDiactivateGuard]}
        ] 
    },
    { path: 'something', component: PageNotFountComponent}
  ];
  @NgModule({
      imports:[RouterModule.forRoot(appRoutes)],
      exports: [RouterModule]
  })
export class appRoutingModule{
    
}