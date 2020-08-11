import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './componentes/listado/listado.component';
import { SeriesComponent } from './paginas/series/series.component';
import { SeguimientoComponent } from './paginas/seguimiento/seguimiento.component';
import { HomeComponent } from './paginas/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    SeriesComponent,
    SeguimientoComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
