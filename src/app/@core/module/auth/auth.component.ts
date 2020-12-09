import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent  extends NbLoginComponent implements OnInit {
  
  ngOnInit() {
  }

  login(){
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, {email:'validator1', password: 'validator1', client_id: 'fefezfezfez'}).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any{
    return super.getConfigValue(key);
  }

}
