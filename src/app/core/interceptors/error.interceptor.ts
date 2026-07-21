import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService, private messageService: MessageService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        const summary = this.resolveSummary(error.status);
        const detail = (error.error && error.error.message) ? error.error.message : 'No se pudo completar la operación.';
        this.messageService.add({ severity: 'error', summary, detail });
        return throwError(() => error);
      })
    );
  }

  private resolveSummary(status: number): string {
    switch (status) {
      case 401: return 'Sesión expirada';
      case 403: return 'Acceso denegado';
      case 404: return 'No encontrado';
      case 500: return 'Error del servidor';
      default: return 'Error';
    }
  }
}
