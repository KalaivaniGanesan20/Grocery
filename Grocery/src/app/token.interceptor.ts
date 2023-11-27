import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthserviceService,private logger: NGXLogger) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=this.auth.getToken();
    if(token)
    {
      request=request.clone(
        {
          setHeaders:{Authorization:'bearer '+token}
        }
      )
    }
    return next.handle(request);
  }
}
