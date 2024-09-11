import { Component, OnInit } from '@angular/core';
import { TravailleService } from '../shared/services/travaille.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Travaille } from '../shared/classes/travaille';

@Component({
  selector: 'app-listeprojet',
  templateUrl: './listeprojet.component.html',
  styleUrls: ['./listeprojet.component.css']
})
export class ListeprojetComponent implements OnInit {

  classes: Observable<Travaille[]>;

  constructor(private classService: TravailleService,
    private router: Router) {}

  ngOnInit() {
    this.gettravaillees();
  }

  gettravaillees() {
    this.classes = this.classService.gettravailleList()
    console.log(this.classes);
  }

  deletetravaille(id: number) {
    this.classService.deletetravaille(id)
      .subscribe(
        data => {
          console.log(data);
          this.gettravaillees();
        },
        error => console.log(error));
  }

  offreDetails(id: number){
    this.router.navigate(['details', id]);
  }

  Edittravaille(id: number){
    this.router.navigate(['edit', id]);
  }

}