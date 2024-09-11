import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  isConneted: string;
  connected: string;
  user: any;

  constructor(private router: Router, private token: TokenStorageService) { 
    
    setInterval(() => {
      this.user = JSON.parse(localStorage.getItem('userinfo'));
      }, 5000);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userinfo'));
    console.log(this.user);
    this.isConneted = "no";
    this.connected = window.sessionStorage.getItem('connected');
    if(this.connected == 'yes')
    this.isConneted = "yes";
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }


}
