import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'src/app/shared/classes/message';
import { Reponse } from 'src/app/shared/classes/reponse';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  messages: Message[];
  board: any;
  reponseForm: FormGroup;
  user: any;
  messagesrecu: Message[];
  reponses: Reponse[];
  id_message: any;

  constructor(private contactService: ContactService, private router: Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.getServices();
    this.reponseForm = this.fb.group({
      reponse:['']
    })
    //this.user = JSON.parse(sessionStorage.getItem('userinfo'));
  }
  getServices(){
    this.contactService.getmessages().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.messages = data;
        //console.log(this.messages[0].id_recepteur);
         
        this.messages = this.messages.filter(x=>{
          return x.id_recepteur.id == this.user.id;
        }); 
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
  }
  getreponse(id){
    this.id_message = id;
    this.contactService.getreponses().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.reponses = data;
        //console.log(this.messages[0].id_recepteur);
         
        this.reponses = this.reponses.filter(x=>{
          return x.id_message.id == id;
        }); 
        console.log(this.reponses);
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
  }

  send(){
    console.log(this.reponseForm.value);
    let record= {};
    let userr={};
    let usere={}
    let message={};
    userr['id']=this.user.id;
    usere['id']= this.user.id;
    message['id']= this.id_message;
    record['texte']= this.reponseForm.value.reponse;
    record['id_emmeteur']= userr;
    record['id_recepteur']= usere;
    record['id_message']= message;
    record['date']= new Date();
    console.log(record);
    this.contactService.addreponse(record)    
    .subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/dashboard/tasks/managejobs'])
      },
      error => console.log(error));
  }

}
