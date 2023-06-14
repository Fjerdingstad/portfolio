import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addresses } from '../models/geo-api.model';

@Injectable({
  providedIn: 'root',
})
export class GeoApiService {
  // Api url
  geoUrl = 'https://geo.api.gouv.fr/communes?codePostal=';

  constructor(private http: HttpClient) {}

  getCity(codesPostaux: string): Observable<Addresses[]> {
    return this.http.get<Addresses[]>(this.geoUrl + codesPostaux);
  }

  getCity2(codesPostaux: string): Observable<Addresses[]> {
    return this.http.get<Addresses[]>(this.geoUrl + codesPostaux);
  }
}
