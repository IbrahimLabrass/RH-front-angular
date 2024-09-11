import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CondidatureService } from 'src/app/shared/services/condidature.service';
import { OffresService } from 'src/app/shared/services/offres.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-managetasks',
  templateUrl: './managetasks.component.html',
  styleUrls: ['./managetasks.component.css'],
  providers: [DatePipe]
})
export class ManagetasksComponent implements OnInit {

  
  board: string;
  errorMessage: string;
  offres: any;
  username: string;
  user: any;
  bids: any;

  constructor(private offreService: OffresService, private tokenStorage: TokenStorageService, private router: Router,
    private condidatureService: CondidatureService) {
    
      setInterval(() => {
        this.user = JSON.parse(localStorage.getItem('userinfo'));
        }, 5000);
   }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.getOffres();
  }
  getOffres(){
    /*
    this.condidatureService.getcondidatureList().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.bids = data;        
        this.bids = this.bids.filter(s=>{
          return s.user.id == this.user.id;
        });
        
        console.log(this.bids);
        
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
    */
    this.offreService.getOffreList().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.offres = data;      
        this.offres = this.offres.filter(s=>{
          return s.user.id == this.user.id;
        });  
        console.log(this.offres);
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
}
