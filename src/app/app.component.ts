import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void { 
    this.isUserAuthenticated();   
  }

  @ViewChild('logIn') logInButton: ElementRef;
  @ViewChild('logOut') logOutButton: ElementRef;
  @ViewChild('helloUser') logInText: ElementRef;

  constructor(private loginService: AuthService) {  }

  LogIn(){
    this.loginService.login();
    this.isUserAuthenticated();
  }

  LogOut(){
    this.loginService.logout();
    this.isUserAuthenticated();
  }
  
  isUserAuthenticated(){
    this.loginService.isAuthenticated().then((isAuth:boolean)=>{
      this.logInButton.nativeElement.style.display = isAuth ? 'none' : 'block';
      this.logInText.nativeElement.style.display = !isAuth ? 'none' : 'inline-block';
      this.logOutButton.nativeElement.style.display = !isAuth ? 'none' : 'block';
    });
  }
}
