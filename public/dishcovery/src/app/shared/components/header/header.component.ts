import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  search!: string;
  user!: User;

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
      if (status === true) {
        this.getUser();
      }
      this.isLoggedIn = status;
    });
  }

  searchDish() {
    if (this.search && this.search.trim().length > 0) {
      this._router.navigate(['dishes'], { queryParams: { search: this.search } });      
    }
  }

  getUser() {
    this._authService.getUser().subscribe({
      next: (user: User) => {
        this.user = user; 
      },
      error: (error) => {
        console.log(error);        
      }
    })
  }

}
