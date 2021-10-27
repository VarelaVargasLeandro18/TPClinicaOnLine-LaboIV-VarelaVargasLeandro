import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioDAOService } from 'src/app/services/usuarioDAO/usuario-dao.service';
import { UsuarioService } from 'src/app/services/usuarioService/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public mostrarUsuarios : boolean = false;
  public usuariosCargados : boolean = false;

  public admin : any;
  public especialistas : any[] = [];
  public pacientes : any[] = [];

  title: string = "Inicie Sesion";

  button_title: string = "Iniciar Sesion";

  errorInicioDeSesion : string = "";

  loginCuentaForm!: FormGroup;

  constructor(
    private usuario_backend_service: UsuarioDAOService,
    private usuarioService : UsuarioService
  ) { }

  async ngOnInit() {

    this.loginCuentaForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        '',
        [Validators.required, Validators.maxLength(15), Validators.minLength(5)]
      )
    });

    this.usuarioService.errorInicioDeSesion
      .subscribe( (mensaje) => {
        this.errorInicioDeSesion = mensaje;
      } );

    
    this.admin = (await this.usuario_backend_service.getAdmins())[0];
    this.especialistas = (await this.usuario_backend_service.getEspecialistas()).slice(0, 2);
    this.pacientes = (await this.usuario_backend_service.getPacientes()).slice(0, 3);
    this.usuariosCargados = true;
  }

  onSubmit() {

    if (!this.loginCuentaForm.valid) return;

    const email = this.loginCuentaForm.value.email;
    const contrasenia = this.loginCuentaForm.value.password;

    const usuario = new Usuario();

    usuario.email = email;
    usuario.contrasenia = contrasenia;

    if ( !this.usuario_backend_service.login(usuario) ) this.errorInicioDeSesion = "NO SE HA APROBADO SU PERFIL!";
  }

  /* iniciarSesionAutomaticamente() {
    this.loginCuentaForm.patchValue({
      email: "admin@admin.com",
      password: "123456"
    });
  } */

  onSeleccionarParaInicioRapido ( usuario : any ) {
    this.loginCuentaForm.patchValue({
      email: usuario.email,
      password: usuario.contrasenia
    });
    this.onSubmit();
  }

}
