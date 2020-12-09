import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbAuthModule,
  NbDummyAuthStrategy,
  NbPasswordAuthStrategy,
  NbAuthJWTToken,
  NbOAuth2AuthStrategy,
  NbAuthOAuth2Token,
  NbOAuth2GrantType,
  NbPasswordStrategyReset,
  NbOAuth2ClientAuthMethod,
  NbAuthJWTInterceptor
} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';
import { UserData } from './data/users';
import { UserService } from './mock/users.service';
import { MockDataModule } from './mock/mock-data.module';
import { AuthModule } from './module/auth/auth.module';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth_interceptor';
import { TestService } from './services/test.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { PasswordAuthStrategy } from './services/password-auth-strategy';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
];

const HTTP_INTERCEPTOR = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //{ provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
  AuthService
]

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ApiService, TestService,
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...HTTP_INTERCEPTOR,
  ...NbAuthModule.forRoot({

    strategies: [
      NbOAuth2AuthStrategy.setup({
        baseEndpoint: environment.api_host,
        name: environment.auth_strategy_name,
        clientId: 'test',
        token: {
          class: NbAuthOAuth2Token,
          grantType: NbOAuth2GrantType.PASSWORD,
          endpoint: environment.generate_token_uri,
        },
        refresh: {
          grantType: NbOAuth2GrantType.REFRESH_TOKEN,
          endpoint: environment.generate_token_uri,
        }
      }),
      /* PasswordAuthStrategy.setup({
        name: 'username',
        baseEndpoint: environment.api_host,
        login: {
          endpoint: environment.generate_token_uri,
        },
        token: {
          class: NbAuthOAuth2Token,
          key: 'access_token'
        },
        refreshToken:
        {
          endpoint: environment.generate_token_uri,
          resetPasswordTokenKey: 'refresh_token'
        } as NbPasswordStrategyReset
      }), */
    ],
    forms: {
      login: {
        strategy: 'jwt',
      },
      validation: {
        password: {
          required: true,
          minLength: 4,
          maxLength: 50,
        },
        username: {
          required: true,
        }
      }
    },

  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    AuthModule
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
