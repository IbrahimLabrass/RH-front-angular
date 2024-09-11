import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [DatePipe]
})
export class EventComponent implements OnInit {

  events: any;
  uniqueSkills: any[];
  location: any;

  constructor(private eventsService: EventService, private router: Router) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.geteventList().subscribe(
      data => {
        this.events = data;
        this.extractUniqueSkills();
      },
      error => {
        console.log(error);
      }
    );
  }

  extractUniqueSkills() {
    let skills = this.events.flatMap(event => event.skills.split(";"));
    this.uniqueSkills = [...new Set(skills)];
  }

  deleteEvent(id) {
    this.eventsService.deleteevent(id).subscribe(
      data => {
        console.log(data);
        this.getEvents();
      },
      error => console.log(error)
    );
  }

  viewDetails(event) {
    localStorage.setItem('event', JSON.stringify(event));
    this.router.navigate(['/event-detail']);
  }

  filterByLocation(location) {
    this.events = this.events.filter(e => e.user.adresse === location.target.value);
  }

  filterByTitle(title) {
    this.events = this.events.filter(e => e.titre.match(title.target.value));
  }

  filterBySkills(skill) {
    this.events = this.events.filter(e => e.skills.includes(skill));
  }
}
