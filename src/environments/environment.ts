// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDAKaSTzSSbx9sToZ643Vx8WKWC8QjoNjY",
    authDomain: "ng-fitness-tracker-e1d1e.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-e1d1e.firebaseio.com",
    projectId: "ng-fitness-tracker-e1d1e",
    storageBucket: "",
    messagingSenderId: "577152914892"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
