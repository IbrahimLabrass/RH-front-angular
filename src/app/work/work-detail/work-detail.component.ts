import { Component, OnInit } from '@angular/core';
import { CondidatureService } from './../../shared/services/condidature.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UploadFileService } from '../../shared/services/upload-file.service';


@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {
  work: any;
  date_pub: Date;
  dead_line: Date;
  date: any;
  bids : any[];
  board: any;
  BidForm: FormGroup;
  user: any;
  skills: any;
  checkbids: boolean;
  nbbids= false;
  fileInfos: any;
  url: any;
  extension: any;
  constructor(private fb: FormBuilder,
    private condidatureService: CondidatureService,
    private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.work = JSON.parse(localStorage.getItem('work'));
    console.log(this.work);
    
    
    
    /*
    this.fileInfos = this.fileInfos.filter(s=>{
      return s.name == this.work.document;
    })
    */
   
    
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.skills = this.work.skills.split(";");
    
    console.log(this.skills,);
    
    console.log(this.user);
    this.BidForm = this.fb.group({
      prix: [],
      description: [],
      temps:[],
      offre: [{'id':this.work.id}],
      user:[{'id':this.user.id}],
      etat:["En attent"],
    })
    this.date_pub= new Date(this.work.date_publication);
    this.dead_line= new Date(this.work.dead_line);
    this.date = Math.floor((Date.UTC(this.date_pub.getFullYear(), this.date_pub.getMonth(), this.date_pub.getDate()) - Date.UTC(this.dead_line.getFullYear(), this.dead_line.getMonth(), this.dead_line.getDate()) ) /(1000 * 60 * 60 * 24));
   // setInterval(()=>{
      this.getbids();
    //},1000);
    
  }


  getbids(){
    this.condidatureService.getcondidatureList().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.bids = data;
        let id = this.user.id;
        
        this.bids = this.bids.filter(s=>{
          return s.offre.id == this.work.id;
        });
        this.bids.forEach(x=>{
          if(x.etat == 'accepter')
          this.nbbids = true;
        })
        console.log(this.bids);
        
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
  }

  publier(){
    console.log(JSON.stringify(this.BidForm.value));
    this.condidatureService.createcondidature(this.BidForm.value)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }


  accepter(bid){
    let record ={};
    record['etat'] ="accepter";
    record['prix'] =bid.prix;
    record['description'] =bid.description;
    record['temps'] =bid.temps;
    this.condidatureService.updatecondidature(bid.id,record)
    .subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

}
