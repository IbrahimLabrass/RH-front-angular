import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from 'src/app/shared/classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[];

  constructor(private afs:AngularFirestore) { }

  ngOnInit() {
    /*
    this.afs.collection('messages').snapshotChanges().subscribe(pass => {
      this.messages = pass.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Message;
      });
      this.messages = this.messages.filter(x=>{
        return x.recepteur == 2;
      })

      //console.log(this.publications);
      //let i =0;     
        console.log(this.messages);
  });
  */
  }

}
