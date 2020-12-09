import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/services/user.service';
import { NbToastrService } from '@nebular/theme';
import { CreateUserReq } from '../../@core/Entity/create-user-req';
import { HttpResponse } from '@angular/common/http';
import { User } from '../../@core/Entity/user';
import emailMask from 'text-mask-addons/dist/emailMask';
import { BoutonModificationComponent } from '../bouton-modification/bouton-modification.component';
import { UserModaleService } from '../../services/user.modale.service';
import { GetTableDataParam } from '../../@core/Entity/get-table-data-param';
import { DataTable } from '../../@core/Entity/data-table';
import { UserTable } from '../../@core/Entity/user-table';
import { ApiTableDataSource } from '../../@core/Entity/api-table-data-source';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  dataSource: Array<User> = new Array<User>();
  source: ApiTableDataSource = new ApiTableDataSource();
  userTable: Array<UserTable> = new Array<UserTable>();
  createUserReq: CreateUserReq = new CreateUserReq();
  valeur: string;
  pipe = new DatePipe("en-US");
  public emailMask = emailMask;
  public mask = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/]
  constructor(public userService: UserService, private toast: NbToastrService, private modale: UserModaleService) { }

  ngOnInit() {
    this.getAllUser();
  }
  ajouter() {
    this.userService.addUser(true, this.createUserReq).subscribe((data: HttpResponse<string>) => {
      this.toast.success(data.body);
      this.getAllUser();
      this.createUserReq.contact = "";
      this.createUserReq.nom = "";
      this.createUserReq.email = "";
    }, err => {
      this.toast.danger("Erreur lors de l'enregistrement");
    });
  }
  onRecupeChanged() {
    this.getTableDataParam.search.Key = this.valeur;
    this.getAllUser();
  }
  getAllUser() {
    let userTable = new UserTable();
    this.userTable = new Array<UserTable>();
    this.userService.getAllUsers(true, this.getTableDataParam).subscribe((data: HttpResponse<DataTable<Array<User>>>) => {
      data.body.data.forEach(elements => {
        userTable = {
          id: elements.id,
          nom: elements.nom,
          contact: elements.contact,
          dateCreate: elements.dateCreate,
          email: elements.email
        } as UserTable
        this.userTable.push(userTable);
      });
      this.source.load(this.userTable);
      this.source.setPaging(0, data.body.total, true);
      this.source.setTotal(data.body.total);
    }, (error: Error) => {
      this.toast.danger("erreur de récupération");
    });
  }
  getPaginateCount() {
    return new Array(this.source.count());
  }
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
      position: 'right'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    hideSubHeader: true,
    forServer: {
      columns: [
        {
          name: "Nom",
          searchable: true
        },

        {
          name: "Email",
          searchable: true
        },
        {
          name: "Contact",
          searchable: true
        }
      ]
    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
        editable: false,
        sort: true,
        sortDirection: 'asc'
      },
      email: {
        title: 'Email',
        type: 'string',
        editable: false,
        sort: false
      },
      contact: {
        title: "Contact",
        type: "string",
        editable: false,
        sort: false,
      },
      dateCreate: {
        title: "Date de creation",
        type: "string",
        editable: false,
        sort: false,
      },
      id: {
        title: "Modifications",
        type: 'custom',
        renderComponent: BoutonModificationComponent,
        onComponentInitFunction: (instance) => {
          this.onActionButtonClicked(instance.data);
        },
        filter: false,
        addable: false,
        editable: false,
      }
    }

  }
  getTableDataParam: GetTableDataParam = {
    page: 1,
    pageLength: 5,
    fields: this.settings.forServer.columns.map(x => x.name),
    search: { Key: "", Value: this.settings.forServer.columns.filter(x => x.searchable).map(x => x.name) },
    filters: []
  } as GetTableDataParam;
  updateUser(id: string) {
    this.modale.update(id).then(isOk => {
      if (isOk) {
        this.getAllUser();
      }
    })
  }
  onPageChanged(value) {
    this.getTableDataParam.page = value;
    this.getAllUser();
  }
  edit() {

  }
  delete(event) {
    this.userService.deleteUser(true, event.data.id).subscribe(data => {
      event.confirm.resolve();
    }, err => {
      event.confirm.reject();
    });
  }
  onActionButtonClicked(instance) {
    instance.subscribe(value => {
      this.updateUser(value);
    });
  }
}