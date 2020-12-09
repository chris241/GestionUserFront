import { NgModule } from '@angular/core';
import { NbMenuModule, NbTabsetModule, NbSpinnerModule, NbCardModule, NbButtonModule, NbInputModule, NbDialogModule } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';
import { ApiUserService } from '../../services/api-user.service';
import { UserModaleService } from '../../services/user.modale.service';
import { BoutonModificationComponent } from '../bouton-modification/bouton-modification.component';
import { UtilisateurModalComponent } from '../utilisateur-modal/utilisateur-modal.component';
import { UtilisateursComponent } from './utilisateurs.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2PaginationModule } from 'ng2-pagination';


@NgModule({

    imports: [
        ThemeModule,
        NbMenuModule,
        NbTabsetModule,
        Ng2SmartTableModule,
        NbSpinnerModule,
        NbCardModule,
        FormsModule,
        NbButtonModule,
        NbInputModule,
        TextMaskModule,
        Ng2PaginationModule,
        NbDialogModule.forChild(),
    ],
    declarations: [
        UtilisateursComponent,
        UtilisateurModalComponent,
        BoutonModificationComponent
    ],
    entryComponents: [BoutonModificationComponent, UtilisateurModalComponent],
    providers: [UserModaleService,
        { provide: UserService, useClass: ApiUserService },
    ]
})
export class UtilisateursModule {
}
