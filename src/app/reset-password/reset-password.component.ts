import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { AuthLoginInfo } from '../shared/services/login-info';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { MustMatch } from '../_helpers/must-match.validator';
import { UserService } from './../shared/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  loginForm: FormGroup;
  restForm: FormGroup;
  etat = false;

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private fb: FormBuilder, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id'))
    {
      this.etat=true;
    }
    else
    {
      this.etat=false;
    }
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.loginForm = this.fb.group({
      username: ['']
    })

    
  }

  login()
  {
    let email= this.loginForm.value;
    console.log(email.username);

    this.authService.forgetpassword(email.username).subscribe(
      data => {
        
        console.log(data);
        //this.reloadPage();
        this.router.navigate(['/forget-password']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.router.navigate(['/forget-password']);
        this.isLoginFailed = true;
      }
    );
  }

}
