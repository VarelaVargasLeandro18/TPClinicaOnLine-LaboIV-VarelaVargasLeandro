import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuarioService/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectByRoleGuard implements CanActivate {

  constructor( private usuarioService : UsuarioService, private router : Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirects = route.data.redirects;
    const usuario = this.usuarioService.iniciado;
    
    if ( !usuario || !redirects )
      return false;

    for ( const redirect of redirects ) {

      if ( redirect.razon === usuario.razon )
        return this.router.createUrlTree( [redirect.route] );

    }
    
    return false;
  }
  
}
