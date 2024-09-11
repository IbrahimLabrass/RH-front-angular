import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { UserService } from '../shared/services/user.service';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  restForm:FormGroup;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private fb: FormBuilder, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restForm = this.fb.group({
      token: [''],
      password: [''],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
  })
  }

  login()
  {
    let email= this.restForm.value;
    console.log(email.token);

    this.authService.resetpassword(this.restForm.value.token,this.restForm.value.password).subscribe(
      data => {
        
        console.log(data);
        this.router.navigate(['/login']);
        //this.reloadPage();
      },
      error => {
        console.log(error);
        this.router.navigate(['/login']);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
