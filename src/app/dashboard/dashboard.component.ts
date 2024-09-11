import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../shared/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isConneted: string;
  connected: string;
  user: any;

  constructor(private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userinfo'));
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
