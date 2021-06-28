import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    // const webipieDomain = window.location.hostname === 'webipie.me';
    /***
     * to be changed with the above comment
     ***/
    const webipieDomain = false;
    if (route.data && route.data.preload && webipieDomain) {
      return fn();
    }
    return of(null);
  }
}
