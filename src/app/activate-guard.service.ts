import { CanActivate, ActivatedRoute, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class ActivateGuardService implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, routeState: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean
    {
        return this.authService.isAuthenticated().then((isLogged: boolean) => {
            if(isLogged) {return true; }
            else{
                this.router.navigate(['/access-denied']);
            }
        })
    }
    constructor(private authService: AuthService, private router: Router){}
}