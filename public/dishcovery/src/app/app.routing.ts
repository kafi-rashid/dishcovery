import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishComponent } from './pages/dish/dish.component';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'dishes',
    pathMatch: 'full',
    component: DishesComponent
  },
  {
    path: 'dish/:dishId',
    pathMatch: 'full',
    component: DishComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: 'HomeComponent'
  }
]
