import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateUserReq } from '../../@core/Entity/create-user-req';
import { UserService } from '../../@core/services/user.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserModaleService } from '../../services/user.modale.service';
import { HttpResponse } from '@angular/common/http';
import { User } from '../../@core/Entity/user';
import emailMask from 'text-mask-addons/dist/emailMask';

@Component({
  selector: 'utilisateur-modal',
  templateUrl: './utilisateur-modal.component.html',
  styleUrls: ['./utilisateur-modal.component.scss']
})
export class UtilisateurModalComponent implements OnInit {
  public emailMask = emailMask;
  public mask = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/]
  result: Subject<boolean> = new Subject();
  createUserReq: CreateUserReq = new CreateUserReq();
  user: User = new User();
  @Input() id: string;
  constructor(public userService: UserService, public windowRef: NbDialogRef<UserModaleService>, public toast: NbToastrService) { }

  ngOnInit() {
    this.getUser();
  }
  modifier() {
    this.userService.updateUser(true, this.createUserReq).subscribe((data: HttpResponse<string>) => {
      this.toast.success("utilisateur modifié.");
      this.result.next(true);
      this.windowRef.close();
    },
      (err) => {
      },
    );
  }
  annuler() {
    this.result.next(false);
    this.windowRef.close();
  }
  getUser() {
    this.userService.getUser(true, this.id).subscribe((data: HttpResponse<User>) => {
      this.user = data.body;
      this.createUserReq.id = this.user.id;
      this.createUserReq.email = this.user.email;
      this.createUserReq.nom = this.user.nom;
      this.createUserReq.contact = this.user.contact;
    }, err => {
      console.log("erreur");
    });
  }
}
