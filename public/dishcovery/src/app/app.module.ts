import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutes } from './app.routing';
import { AuthenticationInterceptor } from './util/authentication.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CardComponent } from './shared/components/card/card.component';
import { DishesComponent } from './pages/dishes/dishes.component';
import { DishComponent } from './pages/dish/dish.component';
import { DishCardComponent } from './shared/components/dish-card/dish-card.component';
import { ManageDishesComponent } from './pages/admin/manage-dishes/manage-dishes.component';
import { DishDetailsComponent } from './pages/admin/dish-details/dish-details.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    DishesComponent,
    DishComponent,
    DishCardComponent,
    ManageDishesComponent,
    DishDetailsComponent,
    AdminComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      scrollPositionRestoration: 'enabled'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
