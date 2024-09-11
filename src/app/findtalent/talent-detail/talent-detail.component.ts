import { CondidatureService } from '../../shared/services/condidature.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Condidature } from '../../shared/classes/condidature';
import { filter } from 'rxjs/operators';
import { ServicesService } from 'src/app/shared/services/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-talent-detail',
  templateUrl: './talent-detail.component.html',
  styleUrls: ['./talent-detail.component.css']
})
export class TalentDetailComponent implements OnInit {
  talent: any;
  condidatures:  any[];
  user: any;
  board: any;
  services: any;
  reponseForm:FormGroup;
  constructor(private router:Router, private contactService: ContactService,private condidatureService: CondidatureService, private servicesService: ServicesService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.talent = JSON.parse(localStorage.getItem('talent'));
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.reponseForm = this.fb.group({
      reponse:['']
    })
    this.getcondidatures();
    this.getservices();
  }

  getcondidatures() {
    this.condidatureService.getcondidatureList().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.condidatures = data;
        this.condidatures = this.condidatures.filter(s => {
          return s.user.id == this.user.id;
        })
        console.log(this.condidatures);
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
      
    );
    //this.condidatureService.getcondidatureList()
    
  }

  getservices() {
    this.servicesService.getserviceList().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.services = data;
        this.services = this.services.filter(s => {
          return s.user.id == this.talent.id;
        })
        console.log(this.services);
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
      
    );
    //this.condidatureService.getcondidatureList()
    
  }
  send(user){
    console.log(user);
    let record= {};
    let userr={};
    let usere={}
    userr['id']=this.talent.id;
    usere['id']= this.user.id;
    record['texte']= this.reponseForm.value.reponse;
    record['id_emmeteur']= userr;
    record['id_recepteur']= usere;
    record['date']= new Date();
    console.log(record);
    this.contactService.addmessage(record)    
    .subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['/dashboard/tasks/managejobs'])
      },
      error => console.log(error));
  }


}
