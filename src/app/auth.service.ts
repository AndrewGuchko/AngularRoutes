export class AuthService{
    loggedIn:boolean = false;

    login(){
        this.loggedIn = true;    
    }

    logOut(){
        this.loggedIn = false;
    }

    isAuthenticate(){
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => resolve(this.loggedIn), 800);
            }
        );
        return promise;
    }
}