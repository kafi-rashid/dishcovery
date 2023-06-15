import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = this._authService.loggedIn();
  search!: string;

  constructor(private _authService: AuthService,
    private _router: Router) {}

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this._authService.getAuthState().subscribe(state => {
      this.isLoggedIn = state;
    });
  }

  searchDish() {
    if (this.search && this.search.trim().length > 0) {
      console.log(this.search);
      this._router.navigate(['dishes'], { queryParams: { search: this.search } });      
    }
  }

}
