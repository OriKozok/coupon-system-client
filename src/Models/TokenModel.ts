import ClientType from "./ClientType";

export class TokenModel{
    public id?: number;//Only customer and company
    public firstName?: string;//Customer's first name
    public lastName?: string;//Customer's last name
    public name?: string;//Company's name
    public email: string;
    public type: ClientType;

    constructor(id: number, firstName: string, lastName: string, name: string, email: string, type: ClientType){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email; 
        this.type = type;
    }
}