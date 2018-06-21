import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDiactivate } from './can-diactivate.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDiactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  editDisabled: boolean = false;
  changesSave: boolean = false;

  constructor(private serversService: ServersService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param: Params) => {
      this.editDisabled = param['allowEdit'] === '1' ? true : false;
    });  

    this.activeRoute.params.subscribe((params:Params) => {
      let id:number = Number(params['id']); 
      this.server = this.serversService.getServer(id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSave = true;
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }

  canDiactivate(): boolean | Observable<boolean> | Promise<boolean>{
    if(!this.editDisabled && this.changesSave){
      return true;
    }
    else{
      if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSave) {
        return confirm("Do you want to discard the changes");
      }
      return false;
    }
  }
}
