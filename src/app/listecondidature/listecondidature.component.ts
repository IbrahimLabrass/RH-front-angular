import { Component, OnInit } from '@angular/core';
import { CondidatureService } from '../shared/services/condidature.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Condidature } from '../shared/classes/condidature';

@Component({
  selector: 'app-listecondidature',
  templateUrl: './listecondidature.component.html',
  styleUrls: ['./listecondidature.component.css']
})
export class ListecondidatureComponent implements OnInit {

  classes: Observable<Condidature[]>;

  constructor(private classService: CondidatureService,
    private router: Router) {}

  ngOnInit() {
    this.getcondidaturees();
  }

  getcondidaturees() {
    this.classes = this.classService.getcondidatureList()
    console.log(this.classes);
  }

  deletecondidature(id: number) {
    this.classService.deletecondidature(id)
      .subscribe(
        data => {
          console.log(data);
          this.getcondidaturees();
        },
        error => console.log(error));
  }

  offreDetails(id: number){
    this.router.navigate(['details', id]);
  }

  Editcondidature(id: number){
    this.router.navigate(['edit', id]);
  }

}