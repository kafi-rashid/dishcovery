import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  search!: string;

  constructor(private _authService: AuthService, private _router: Router) {}

  logout() {
    localStorage.clear();
    this._authService.setAuthState(false);
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.isLogIn();
  }

  isLogIn() {
    this._authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  searchDish() {
    if (this.search && this.search.trim().length > 0) {
      console.log(this.search);
      this._router.navigate(['dishes'], { queryParams: { search: this.search } });      
    }
  }

}
