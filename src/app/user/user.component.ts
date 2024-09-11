import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  classes: Observable<User[]>;

  constructor(private classService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.getuseres();
  }

  getuseres() {
    this.classes = this.classService.getuserList()
    console.log(this.classes);
  }

  deleteuser(id: number) {
    this.classService.deleteuser(id)
      .subscribe(
        data => {
          console.log(data);
          this.getuseres();
        },
        error => console.log(error));
  }

  offreDetails(id: number){
    this.router.navigate(['details', id]);
  }

  Edituser(id: number){
    this.router.navigate(['edit', id]);
  }

}
