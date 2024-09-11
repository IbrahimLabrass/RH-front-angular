import { Component, OnInit } from '@angular/core';
import { OffresService } from '../shared/services/offres.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Offres } from '../shared/classes/offres';

@Component({
  selector: 'app-gestionoffre',
  templateUrl: './gestionoffre.component.html',
  styleUrls: ['./gestionoffre.component.css']
})
export class GestionoffreComponent implements OnInit {

  classes: Observable<Offres[]>;

  constructor(private classService: OffresService,
    private router: Router) {}

  ngOnInit() {
    this.getOffrees();
  }

  getOffrees() {
    this.classes = this.classService.getOffreList()
    console.log(this.classes);
  }

  deleteOffre(id: number) {
    this.classService.deleteOffre(id)
      .subscribe(
        data => {
          console.log(data);
          this.getOffrees();
        },
        error => console.log(error));
  }

  offreDetails(id: number){
    this.router.navigate(['details', id]);
  }

  EditOffre(id: number){
    this.router.navigate(['edit', id]);
  }

}
