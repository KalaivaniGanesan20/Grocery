import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NGXLogger } from "ngx-logger";
import { catchError, throwError } from "rxjs";
import Swal from "sweetalert2";
@Injectable()
export class ExceptionInterceptor implements HttpInterceptor
{
  constructor(private logger:NGXLogger){}
  intercept(request: HttpRequest<any>, next: HttpHandler)
  {
      return next.handle(request).pipe(catchError((error : HttpErrorResponse)=>{
        const errorMessage=this.setError(error)
        this.logger.error(errorMessage,error)
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          timer: 3000,
          timerProgressBar: true
        })
        Toast.fire(errorMessage,error.statusText, 'warning')
        return throwError(errorMessage);
      }))
  }
  setError(error:HttpErrorResponse):string{

    var errormessage='Unknown error occured';
    if(error.error instanceof ErrorEvent)
      {
        errormessage=error.error.message;
      }
    else{
      if(error.status===0)
      {
         errormessage=error.statusText;
      }
      else if(error.status===404)
      {
        errormessage="Not Found "+" "+error.message;
      }

      else{
        errormessage=error.error;
      }
     }
     return errormessage;

    }
}
