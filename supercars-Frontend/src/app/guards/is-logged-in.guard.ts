import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  debugger;
  if(cookieService.check('user')){
    return true
  }
  else{
    router.navigateByUrl('home');
    return false
  }
  
};
