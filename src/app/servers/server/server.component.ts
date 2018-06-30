import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit: boolean;

  constructor(private serversService: ServersService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (param: Params) =>{
        this.server = this.serversService.getServer(Number(param["id"]));        
      }
    );
    this.activeRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.allowEdit = queryParam["allowEdit"] == 0;
      }
    );
  }

  onEdit(){
    this.router.navigate(["/servers", this.server.id, "edit"]);
  }
}
