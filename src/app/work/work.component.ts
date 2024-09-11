import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OffresService } from '../shared/services/offres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  providers: [DatePipe]
})
export class WorkComponent implements OnInit {

  board: string;
  errorMessage: string;
  offres: any;
  location:string;
  slider:any;
  skills: any=[];
  skill: any;
  unique: unknown[];

  constructor(private offreService: OffresService, private router: Router) { }

  ngOnInit() {
    this.getOffres();
  }
  getOffres(){
    this.offreService.getOffreList().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.offres = data;
        let i=0;
        this.skills[i]="";
        this.offres.forEach(s=>{
          this.skills[i]=this.skills[i]+s.skills+";";
          //i++;
          ///console.log(s.skills);
        });
        console.log(this.skills);
        this.skill = this.skills[0].split(";");
        console.log(this.skill);
         this.unique = [...new Set(this.skill)];
        console.log(this.unique);

        
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
  }

  deleteOffre(id)
  {
    this.offreService.deleteOffre(id)
    .subscribe(
      data => {
        console.log(data);
        this.getOffres();
      },
      error => console.log(error));
  }

  detail(work)
  {
    localStorage.setItem('work',JSON.stringify(work));
    this.router.navigate(['/work-detail']);
  }

  onLocationChange(location){
      
      this.offres= this.offres.filter(s=>{
        return s.user.adresse == location.target.value;
      })
    
    
    console.log(this.offres,location.target.value);
  }
  onTitleChange(title){
    this.offres= this.offres.filter(s=>{
      return s.titre.match(title.target.value);
    });
    console.log(this.offres);
  }
  onPriceChange(price)
  {
    console.log(price.target.value);
  }

  onSkillsChange(u){
    this.offres= this.offres.filter(s=>{
      return s.skills.match(u);
    });
    console.log(this.offres);
  }

}
