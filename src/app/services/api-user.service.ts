
import { ApiService } from '../@core/services/api.service';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import { CreateUserReq } from '../@core/Entity/create-user-req';
import { UserService } from '../@core/services/user.service';
import { User } from '../@core/Entity/user';
import { DataTable } from '../@core/Entity/data-table';
import { GetTableDataParam } from '../@core/Entity/get-table-data-param';

@Injectable()
export class ApiUserService extends UserService {
    deleteUser(showErrorNotif: boolean, id: string): Observable<HttpResponse<string> | Observable<never>> {
        return this.apiService.delete(environment.delete_user_uri + "?id=" + id)
            .pipe(
                map((x: HttpResponse<string>) => {
                    return this.handleResponse<string>(showErrorNotif, x);
                })
            );
    }
    getAllUsers(showErrorNotif: boolean, get: GetTableDataParam): Observable<HttpResponse<DataTable<Array<User>> | Observable<never>>> {
        return this.apiService.post(environment.get_all_user_uri, get)
            .pipe(
                map((x: HttpResponse<DataTable<Array<User>>>) => {
                    return this.handleResponse<DataTable<Array<User>>>(showErrorNotif, x);
                })
            );
    }
    getUser(showErrorNotif: boolean, id: string): Observable<HttpResponse<User> | Observable<never>> {
        return this.apiService.get(environment.get_user_uri + id)
            .pipe(
                map((x: HttpResponse<User>) => {
                    return this.handleResponse<User>(showErrorNotif, x);
                })
            );
    }
    updateUser(showErrorNotif: boolean, createUserReq: CreateUserReq): Observable<Observable<never> | HttpResponse<string>> {
        return this.apiService.put(environment.update_user_uri, createUserReq)
            .pipe(
                map((x: HttpResponse<string>) => {
                    return this.handleResponse<string>(showErrorNotif, x);
                })
            );
    }

    constructor(private apiService: ApiService, private toastrService: NbToastrService) {
        super();
    }
    addUser(showErrorNotif: boolean, createUserReq: CreateUserReq): Observable<Observable<never> | HttpResponse<string>> {
        return this.apiService.post(environment.add_user_uri, createUserReq)
            .pipe(
                map((x: HttpResponse<string>) => {
                    return this.handleResponse<string>(showErrorNotif, x);
                })
            );
    }

    catchError(showErrorNotif: boolean, error: any): Observable<never> {


        if (error instanceof (Error)) {
            throw new Error(error.message);
        } else {
            if (showErrorNotif) {
                this.toastrService.danger(error, "Erreur");
            }
            throw new Error(error);
        }
    }

    handleResponse<T>(showErrorNotif: boolean, response: any): HttpResponse<T> {
        if (showErrorNotif && response.status == 202) {
            this.toastrService.danger(response.body, "Erreur");
            throw new Error(response.body.toString());
        }
        return response;
    }
}