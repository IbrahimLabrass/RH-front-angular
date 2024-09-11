import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { ServicesService } from '../../../shared/services/services.service';

@Component({
  selector: 'app-managejobs',
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})
export class ManagejobsComponent implements OnInit {

  board: string;
  errorMessage: string;
  services: any;
  username: string;

  constructor(private serviceService: ServicesService, private tokenStorage: TokenStorageService, private router: Router) {
    this.username = this.tokenStorage.getUsername();
    console.log(this.username);
   }

  ngOnInit() {
    this.getServices();
  }
  getServices(){
    this.serviceService.getserviceList().subscribe(
      data => {
        this.board = data;
        console.log(data);
        this.services = data;
        this.services = this.services.filter(s => {
          return s.user.username == this.username;
        })
        console.log(this.services);
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
      
    );

    
  }

  deleteService(id)
  {
    this.serviceService.deleteservice(id)
    .subscribe(
      data => {
        console.log(data);
        this.getServices();
      },
      error => console.log(error));
  }

  detail(work)
  {
    localStorage.setItem('work',JSON.stringify(work));
    this.router.navigate(['/work-detail']);
  }


}
