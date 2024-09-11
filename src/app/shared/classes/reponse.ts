import { Message } from "./message";
import { User } from "./user";

export class Reponse{
    id:string;
    texte:string;
    date:string;
    id_message: Message;
    id_emmeteur:User;
    id_recepteur:User;
}