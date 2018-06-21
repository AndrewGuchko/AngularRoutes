import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDiactivate{
    canDiactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDiactivateGuard implements CanDeactivate<CanComponentDiactivate> {
    canDeactivate(component: CanComponentDiactivate, 
                    currentRoute: ActivatedRouteSnapshot, 
                    currentState: RouterStateSnapshot, 
                    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDiactivate();
    }
}