import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, take} from 'rxjs';

@Pipe({
  name: 'sprite',
})
export class SpritePipe implements PipeTransform {

  constructor(private http: HttpClient) {
  }

  async transform<T>(value: string, props: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const observable = this.http.get(value).pipe(take(1));
      lastValueFrom(observable).then((object) => {
        const sprite = object['sprites' as keyof typeof object];
        const img = sprite[props as keyof typeof object]
        return resolve(img as unknown as string);
      });
    });
  }

}
