export interface User {
    name:string;
    email:string;
    password:string;
    role: "user"; // or simply `string` if you want it flexible
    createdAt?: Date;
}