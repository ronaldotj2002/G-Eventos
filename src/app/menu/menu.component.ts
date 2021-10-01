import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('USER_INFO');
    this.usuario = JSON.parse(this.usuario)
  }

  logout() {
    localStorage.removeItem('USER_INFO');
    this.router.navigate(['login']);
  }

}
