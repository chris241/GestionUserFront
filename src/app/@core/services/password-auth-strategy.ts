import { NbPasswordAuthStrategy, NbAuthResult } from '@nebular/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

export class PasswordAuthStrategy extends NbPasswordAuthStrategy {
    constructor(http: HttpClient, route: ActivatedRoute){
        super(http, route);
    }
    authenticate(data?: any): Observable<NbAuthResult>{
        console.log(data);
        return super.authenticate(data);
    }
}