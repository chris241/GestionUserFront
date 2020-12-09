import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Observable} from 'rxjs';

@Injectable()
export class AuthService extends NbAuthService {
  refreshToken(strategyName: string, data?: any): Observable<NbAuthResult>{
      console.log("refreshing token .......");
      return super.refreshToken(strategyName, data);
  }
}