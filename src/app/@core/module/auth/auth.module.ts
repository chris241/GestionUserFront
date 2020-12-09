import { RouterModule } from '@angular/router';


import { NbAuthModule, NbLoginComponent } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing';
import { AuthComponent } from './auth.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../../interceptors/auth_interceptor';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,

    NbAuthModule,
  ],
  declarations: [
      //NbLoginComponent
      AuthComponent
    // ... here goes our new components
  ],
  //providers:[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class AuthModule {
}