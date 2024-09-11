import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OffresService } from '../shared/services/offres.service';
import { UserService } from '../shared/services/user.service';
import { EventService } from '../shared/services/event.service';
import { StageService } from '../shared/services/stage.sevice';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  board: string;
  errorMessage: string;
  freelancers: any;
  offres: any;
  events: any; // Add events property
  stages: any; // Add stages property
  user: any;
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private offreService: OffresService, private userService: UserService, private eventService: EventService, private stagesService: StageService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    this.searchForm = this.fb.group({
      keywords: ['']
    });
    this.getOffres();
    this.getUsers();
    this.getEvents(); // Call getEvents
    this.getStages(); // Call getStages
  }

  search() {
    console.log(this.searchForm.value);
    localStorage.setItem('keywords', JSON.stringify(this.searchForm.value));
    this.router.navigate(['/search']);
  }

  getOffres() {
    this.offreService.getOffreList().subscribe(
      data => {
        this.offres = data.filter(x => x.user.id != this.user.id);
        console.log(this.offres);
      },
      error => console.log(error)
    );
  }

  getUsers() {
    this.userService.getuserList().subscribe(
      data => {
        this.freelancers = data.filter(s => s.roles[0].name == 'ROLE_FREELANCER');
        console.log(this.freelancers);
      },
      error => this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`
    );
  }

  getEvents() {
    this.eventService.geteventList().subscribe(
      data => {
        this.events = data;
        console.log(this.events);
      },
      error => console.log(error)
    );
  }

  getStages() {
    this.stagesService.getstageList().subscribe(
      data => {
        this.stages = data;
        console.log(this.stages);
      },
      error => console.log(error)
    );
  }

  detail(users) {
    console.log(users);
    localStorage.setItem('talent', JSON.stringify(users));
    this.router.navigate(['/talent-detail']);
  }
}
