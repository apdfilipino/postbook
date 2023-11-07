import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './components/users.list/users.list.component';
import { UsersDetailsComponent } from './components/users.details/users.details.component';
import { UsersRegisterComponent } from './components/users.register/users.register.component';
import { UsersLoginComponent } from './components/users.login/users.login.component';

import { USERS } from './components/constants/users.routes';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const userRoutes: Routes = [
  { path: USERS.REGISTER_ROUTE, component: UsersRegisterComponent },
  { path: USERS.DETAILS_ROUTE, component: UsersDetailsComponent },
  { path: USERS.LOGIN_ROUTE, component: UsersLoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: USERS.DETAILS_ROUTE }
];

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailsComponent,
    UsersRegisterComponent,
    UsersLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(userRoutes),
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports: [
    UsersListComponent,
    UsersDetailsComponent,
    UsersRegisterComponent,
    UsersLoginComponent,
    RouterModule
  ],
  providers: []
})
export class UsersModule { }
