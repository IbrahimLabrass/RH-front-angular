import { Component, OnInit } from '@angular/core';
import { PortfeuilleService } from '../shared/services/portfeuille.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Portfeuille } from '../shared/classes/portfeuille';

@Component({
  selector: 'app-portfeuille',
  templateUrl: './portfeuille.component.html',
  styleUrls: ['./portfeuille.component.css']
})
export class PortfeuilleComponent implements OnInit {

  classes: Observable<Portfeuille[]>;

  constructor(private classService: PortfeuilleService,
    private router: Router) {}

  ngOnInit() {
    this.getportfeuillees();
  }

  getportfeuillees() {
    this.classes = this.classService.getportfeuilleList();
    console.log(this.classes);
  }

  deleteportfeuille(id: number) {
    this.classService.deleteportfeuille(id)
      .subscribe(
        data => {
          console.log(data);
          this.getportfeuillees();
        },
        error => console.log(error));
  }

  classDetails(id: number){
    this.router.navigate(['details', id]);
  }

  Editportfeuille(id: number){
    this.router.navigate(['edit', id]);
  }


}
