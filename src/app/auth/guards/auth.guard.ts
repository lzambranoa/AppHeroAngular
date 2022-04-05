import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['./auth/login'])
            }
          })
        )
    //   if(this.authService.auth.id){
    //     return true
    //   }
    //   console.warn('bloqueado por el authGuard - CanActivate')
    // return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
      
    //   if(this.authService.auth.id){
    //     return true
    //   }
    //   console.warn('bloqueado por el authGuard - CanLoad')
    // return false;
  }
}
