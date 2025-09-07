
export interface IAuth{
    name: string;
    avatar?: string;
    email: string;
    password:string;
    role: "user" | "admin"
};


export interface Ilogin {
    email: string;
    password: string;
}