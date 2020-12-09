import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TestService {

  constructor(private apiService: ApiService) { }

  getClaim(): Observable<any> {
      return this.apiService.get("/api/values?id=user")
  }
}