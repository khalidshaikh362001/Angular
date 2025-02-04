import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000/api/data';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(this.apiUrl);
  }
}
