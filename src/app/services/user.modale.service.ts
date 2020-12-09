
import { UtilisateurModalComponent } from '../pages/utilisateur-modal/utilisateur-modal.component';
import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
@Injectable()
export class UserModaleService {
    constructor(private dialogService: NbDialogService) { }
    update(id: string): Promise<boolean> {
        const modalRef = this.dialogService.open(
            UtilisateurModalComponent,
            {
                context: { id: id },
                closeOnBackdropClick: false,
            });
        return new Promise<boolean>((resolve, reject) => modalRef.componentRef.instance.result.subscribe(
            result => resolve(result)
        ));
    }
}