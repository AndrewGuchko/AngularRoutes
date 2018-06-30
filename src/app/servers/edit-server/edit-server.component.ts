import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  
  CanDeactivate(){
    if(!this.changesSaved && (this.serverName != this.server.name || this.serverStatus != this.server.status)) {
      if(confirm("You don't save any changes. Do you want discard changes?"))
      {
        return true;
      }
      else{
        return false;
      }
    }
    return true;
  };
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  changesSaved: boolean = false;

  constructor(private serversService: ServersService, 
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (param: Params) => {
        let id = Number(param["id"]);
        this.server = this.serversService.getServer(id);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );

    /*this.activeRoute.data.subscribe(
      (dataObj: Data) => {
        this.server = dataObj["servResol"];
        console.log(dataObj);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );*/
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

}
