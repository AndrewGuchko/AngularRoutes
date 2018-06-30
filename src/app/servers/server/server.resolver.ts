import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

interface Server{
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server>{
    
    constructor(private serverService: ServersService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server{
        console.log(route.params["id"]);
        return this.serverService.getServer(+route.params["id"]);
    }
}