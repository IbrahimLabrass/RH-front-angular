import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffresService } from '../shared/services/offres.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  board: any;
  offres: any;
  keywords: any;

  constructor(private offreService: OffresService, private router: Router) { }

  ngOnInit(): void {
    this.keywords = JSON.parse(localStorage.getItem('keywords'));
    console.log(this.keywords);
    this.getOffrees();
  }

  getOffrees() {
    this.offreService.getOffreList().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.offres = data;
        this.offres = this.offres.filter(x=>{
          return x.titre.includes(this.keywords.keywords) || x.skills.includes(this.keywords.keywords);
        })
        console.log(this.offres);
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
      
    );
  }

  detail(work)
  {
    localStorage.setItem('work',JSON.stringify(work));
    this.router.navigate(['/work-detail']);
  }
}
