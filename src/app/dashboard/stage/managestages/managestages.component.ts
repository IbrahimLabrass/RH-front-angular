import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StageService } from 'src/app/shared/services/stage.sevice';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-managestages',
  templateUrl: './managestages.component.html',
  styleUrls: ['./managestages.component.css']
})
export class ManageStageComponent implements OnInit {

  board: string;
  errorMessage: string;
  stages: any;
  username: string;
  user: any;

  constructor(
    private stageService: StageService, 
    private tokenStorage: TokenStorageService, 
    private router: Router
  ) {
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
    }, 5000);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.getStages();
  }

  getStages() {
    this.stageService.getstageList().subscribe(
      data => {
        this.board = data;
        this.stages = data;      
        this.stages = this.stages.filter(s => {
          return s.user.id == this.user.id;
        });  
        console.log(this.stages);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteStage(id: number) {
    this.stageService.deletestage(id).subscribe(
      data => {
        console.log(data);
        this.getStages(); // Refresh the list after deletion
      },
      error => console.log(error)
    );
  }

  detail(stage: any) {
    localStorage.setItem('stage', JSON.stringify(stage));
    this.router.navigate(['/stage-detail']);
  }
}
