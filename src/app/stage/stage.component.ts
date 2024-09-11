import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from '../shared/services/stage.sevice';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
  providers: [DatePipe]
})
export class StageComponent implements OnInit {

  stages: any;
  uniqueSkills: any[];

  constructor(private stagesService: StageService, private router: Router) { }

  ngOnInit() {
    this.getStages();
  }

  getStages() {
    this.stagesService.getstageList().subscribe(
      data => {
        this.stages = data;
        this.extractUniqueSkills();
      },
      error => {
        console.log(error);
      }
    );
  }

  extractUniqueSkills() {
    let skills = this.stages.flatMap(stage => stage.skills.split(";"));
    this.uniqueSkills = [...new Set(skills)];
  }

  deleteStage(id) {
    this.stagesService.deletestage(id).subscribe(
      data => {
        console.log(data);
        this.getStages();
      },
      error => console.log(error)
    );
  }

  viewDetails(stage) {
    localStorage.setItem('stage', JSON.stringify(stage));
    this.router.navigate(['/stage-detail']);
  }

  filterByLocation(location) {
    this.stages = this.stages.filter(s => s.user.adresse === location.target.value);
  }

  filterByTitle(title) {
    this.stages = this.stages.filter(s => s.titre.match(title.target.value));
  }

  filterBySkills(skill) {
    this.stages = this.stages.filter(s => s.skills.includes(skill));
  }
}
