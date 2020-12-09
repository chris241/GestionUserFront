import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbSpinnerModule, NbCardModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';



@NgModule({

  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    UtilisateursModule
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
  ]
})
export class PagesModule {
}
