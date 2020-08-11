import { SeriesComponent } from './paginas/series/series.component';
import { SeguimientoComponent } from './paginas/seguimiento/seguimiento.component';
import { HomeComponent } from './paginas/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'series', component: SeriesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
