import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
      const allowedRoles = next.data.allowedRoles;
     // console.log(allowedRoles)
      const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    
    if (!isAuthorized) {
      this.router.navigate(['/access-denied']);
      }
    
    return isAuthorized;
//  return true;
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
  console.log(allowedRoles);
  if (!isAuthorized) {
      this.router.navigate(['accessdenied']);
    }
  
  return isAuthorized
  }
}
