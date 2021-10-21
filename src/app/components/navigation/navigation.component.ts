import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  usuario? : Usuario;

  constructor(
    private router : Router,
    private usuarioService : UsuarioService
  ) { }

  ngOnInit(): void {

    this.usuarioService.sesionIniciada
      .subscribe( (usuario) => {
        this.usuario = usuario;
        console.log(usuario);
        this.router.navigate(['']);
      } );

      this.usuarioService.sesionTerminada
        .subscribe( (termino) => {
          if ( termino ) this.usuario = undefined; 
        } )

  }

  onLogOut() {
    this.usuarioService.salirDeSesion();
    this.router.navigate( ['/log-in'] );
  }

}
