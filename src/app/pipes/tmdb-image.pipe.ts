import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
  private baseUrl: string = 'https://image.tmdb.org/t/p';

  transform(ruta: string, ancho: number | string = 'original'): string {
    if (!ruta) {
      return 'assets/sin_imagen.jpg';
    } else {
      return `${this.baseUrl}/${ancho}${ruta}`;
    }
  }
}
