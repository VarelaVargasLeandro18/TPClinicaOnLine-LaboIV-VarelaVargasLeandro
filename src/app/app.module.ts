//#region ANGULAR FIRE
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
//#endregion

//#region ANGULAR MATERIAL
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
//#endregion

//#region CAPTCHA
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
//#endregion

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioEnListaComponent } from './components/usuario-en-lista/usuario-en-lista.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { UsuariosFABComponent } from './components/usuarios-fab/usuarios-fab.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { StatsComponent } from './components/stats/stats.component';
import { HighlightDirective } from './directives/highlight.directive';
import { BoldtextDirective } from './directives/boldtext.directive';
import { GrowTextDirective } from './directives/growtext.directive';
import { DniPipe } from './pipes/dni.pipe';
import { ContraseniaPipe } from './pipes/contrasenia.pipe';
import { HorariosPipe } from './pipes/horarios.pipe';
import { BarChartHighChartsComponent } from './components/bar-chart-high-charts/bar-chart-high-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';

const material = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule,
  MatSelectModule,
  MatTooltipModule
];

const captcha = [
  RecaptchaModule,
  RecaptchaFormsModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    RegistroComponent,
    UsuariosComponent,
    UsuarioEnListaComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    UsuariosFABComponent,
    BarChartComponent,
    StatsComponent,
    HighlightDirective,
    BoldtextDirective,
    GrowTextDirective,
    DniPipe,
    ContraseniaPipe,
    HorariosPipe,
    BarChartHighChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ChartsModule,
    HighchartsChartModule,
    ...material,
    ...captcha
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
