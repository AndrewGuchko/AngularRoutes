import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router'

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, 
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {let id = param["id"]; this.server = this.serversService.getServer(Number(id))});
  }

  onEdit(){
    this.router.navigate(['edit'], { relativeTo: this.activeRoute, queryParamsHandling: 'preserve'});
  }
}
