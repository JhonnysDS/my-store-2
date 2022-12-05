import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


//Creamos este onExit para manejar este guardian desde el componente de register
export interface onExit{
  onExit: ()=> Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: onExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const rta = confirm('Are you sure do you want to leave this site?')
     return component.onExit ? component.onExit() : true;
  }
  
}
