import { Observable } from 'rxjs/internal/Observable';
import { HttpResponse } from '@angular/common/http';
import { CreateUserReq } from '../Entity/create-user-req';
import { User } from '../Entity/user';
import { GetTableDataParam } from '../Entity/get-table-data-param';
import { DataTable } from '../Entity/data-table';

export abstract class UserService {
    abstract addUser(showErrorNotif: boolean, createUserReq: CreateUserReq): Observable<HttpResponse<string> | Observable<never>>;
    abstract getUser(showErrorNotif: boolean, id: string): Observable<HttpResponse<User> | Observable<never>>;
    abstract getAllUsers(showErrorNotif: boolean, getParam: GetTableDataParam): Observable<HttpResponse<DataTable<Array<User>> | Observable<never>>>;
    abstract updateUser(showErrorNotif: boolean, createUserReq: CreateUserReq): Observable<HttpResponse<string> | Observable<never>>;
    abstract deleteUser(showErrorNotif: boolean, id: string): Observable<HttpResponse<string> | Observable<never>>;
}