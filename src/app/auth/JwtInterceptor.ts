import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { UserService } from '../services/user.service';
export class JwtInterceptor implements HttpInterceptor {
  constructor(public auth: UserService,private router:Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

            this.router.navigate(['/login']);
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}