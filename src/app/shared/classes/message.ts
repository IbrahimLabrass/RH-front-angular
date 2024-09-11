import { User } from "./user";

export class Message{
    id:string;
    message:string;
    date:string;
    id_emmeteur:User;
    id_recepteur:User;
}