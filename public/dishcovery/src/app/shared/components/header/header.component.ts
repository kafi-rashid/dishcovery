import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private _authService: AuthService) { }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isAuth();
  }

}
