import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { SeriesComponent } from './paginas/series/series.component';
import { SeguimientoComponent } from './paginas/seguimiento/seguimiento.component';
import { HomeComponent } from './paginas/home/home.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { TmdbImagePipe } from './pipes/tmdb-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    SeriesComponent,
    SeguimientoComponent,
    HomeComponent,
    NavegacionComponent,
    TmdbImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
