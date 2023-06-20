import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishComponent } from './pages/dish/dish.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { ManageDishesComponent } from './pages/admin/manage-dishes/manage-dishes.component';
import { DishDetailsComponent } from './pages/admin/dish-details/dish-details.component';
import { UsersComponent } from './pages/admin/users/users.component';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dishes',
    component: DishesComponent
  },
  {
    path: 'dish/:dishId',
    component: DishComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dishes',
        pathMatch: 'full'
      },
      {
        path: 'dishes',
        component: ManageDishesComponent
      },
      {
        path: 'dishes/add',
        component: DishDetailsComponent
      },
      {
        path: 'dishes/:dishId',
        component: DishDetailsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
