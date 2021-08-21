// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LINKEDIN_API_KEY: '77oj8s50xw1yt7',
  LINKEDIN_SECRET: 'W8tanXzQrWJpjH6y',
  LINKEDIN_REDIRECT_URL: 'http://localhost:4200/register/linkedin-verif',
  LINKEDIN_SCOPE: "r_liteprofile%20r_emailaddress",
  PORT: ':4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
