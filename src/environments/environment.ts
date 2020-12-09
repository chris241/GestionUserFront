/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  auth_strategy_name: 'jwt',
  api_host: 'http://localhost:44396',
  generate_token_uri: '/api/user/token',
  client_id: '7785af43-5407-45a7-a2d2-28f5e4351de6',
  add_user_uri: '/api/users/add',
  update_user_uri: '/api/users/update',
  get_all_user_uri: '/api/users/all',
  get_user_uri: '/api/users/user?id=',
  delete_user_uri: '/api/users/delete',
};
