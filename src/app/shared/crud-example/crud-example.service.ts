import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUnicorns } from '../model/unicorns';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService {
  private _url = environment.url + environment.patch.unicorns;

  constructor(private _http: HttpClient) {}

  getAll(): Observable<IUnicorns[]> {
    return this._http.get<IUnicorns[]>(this._url).pipe(
      map((item: any) => {
        return item.map((element: any) => {
          return { ...element, id: element?._id };
        });
      })
    );
  }

  getById(id: number): Observable<IUnicorns> {
    return this._http.get<IUnicorns>(this._url + id).pipe(
      map((item: any) => {
        return { ...item, id: item?._id };
      })
    );
  }

  create(body: IUnicorns): Observable<IUnicorns> {
    return this._http.post<IUnicorns>(this._url, body);
  }

  update(body: IUnicorns): Observable<IUnicorns> {
    return this._http.put<IUnicorns>(this._url + body?.id, body);
  }

  delete(id: number): Observable<IUnicorns> {
    return this._http.delete<IUnicorns>(this._url + id);
  }
}
