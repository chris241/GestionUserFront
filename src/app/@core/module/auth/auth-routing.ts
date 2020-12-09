import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NbLoginComponent } from '@nebular/auth';

export const routes: Routes = [
    {
        path: '',
        component: NbLoginComponent
        //component: AuthComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}