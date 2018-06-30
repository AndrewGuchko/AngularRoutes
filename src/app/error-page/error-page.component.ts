import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector:'app-error-page',
    templateUrl:'error-page.component.html'
})
export class ErrorPageComponent implements OnInit{
    errorMessage: string = '';

    constructor(private route: ActivatedRoute){ }

    ngOnInit(){
        this.route.data.subscribe((dataObject: Data) => {
            this.errorMessage =  dataObject["message"];
        });
    }
}