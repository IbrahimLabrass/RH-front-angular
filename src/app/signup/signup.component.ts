import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { UserService } from './../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  role: any;

  constructor(private router: Router, private fb : FormBuilder,private userservice: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      "nom":['',[Validators.required]],
      "prenom":['',[Validators.required]],
      "email":['',[Validators.required, Validators.email]],
      "username":['',[Validators.required]],
      "cin":['',[Validators.required]],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "confirmPassword": ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
  })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    let record = {};
    record = this.registerForm.value;
    record['role'] = this.role;
    console.log(record);
    this.userservice.createuser(record)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error => console.log(error));
}

clickRole(role){
  this.role = role.target.value;
 

}

}
