import ClientType from "./ClientType";

class UserCred{
    email:string;
    password:string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }
}

export default UserCred;