import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../shared/services/services.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-findtalent',
  templateUrl: './findtalent.component.html',
  styleUrls: ['./findtalent.component.css'],
  providers: [DatePipe]
})
export class FindtalentComponent implements OnInit {

  board: string;
  errorMessage: string;
  freelancers: any[];
  user: any;
  location:string;
  slider:any;
  skills: any=[];
  skill: any;
  unique: any[];

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit() {
    this.getServices();
    this.user = JSON.parse(sessionStorage.getItem('userinfo'));
  }
  getServices(){
    this.usersService.getuserList().subscribe(
      data => {
        this.board = data;
        //console.log(data);
        this.freelancers = data;
        console.log(this.freelancers);
        
        this.freelancers = this.freelancers.filter(s=>{
          return s.roles[0].name == 'ROLE_FREELANCER';
        });
        let i=0;
        this.skills[i]="";
        this.freelancers.forEach(s=>{
          this.skills[i]=this.skills[i]+s.skills+";";
          //i++;
          console.log(s);
        });
        console.log(this.skills);
        this.skill = this.skills[0].split(";");
        console.log(this.skill);
         this.unique = [...new Set(this.skill)];
        console.log(this.unique);
        console.log(this.freelancers);
           
      },
      error => {
        //this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        console.log(error);
      }
    );
  }

  onLocationChange(location){
      
    this.freelancers= this.freelancers.filter(s=>{
      return s.user.adresse == location.target.value;
    })
  
  
  console.log(this.freelancers,location.target.value);
}
onTitleChange(title){
  this.freelancers= this.freelancers.filter(s=>{
    return s.titre.match(title.target.value);
  });
  console.log(this.freelancers);
}
onPriceChange(price)
{
  console.log(price.target.value);
}

onSkillsChange(u){
  this.freelancers= this.freelancers.filter(s=>{
    return s.skills.match(u);
  });
  console.log(this.freelancers);
}

  detail(users)
  {
    console.log(users);
    localStorage.setItem('talent',JSON.stringify(users));
    this.router.navigate(['/talent-detail']);
  }

}
