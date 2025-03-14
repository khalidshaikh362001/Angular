import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any[]>(this.apiUrl);
  }

  createItem(item: any) {
    return this.http.post(this.apiUrl, item);
  }

  updateItem(id: number, item: any) {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}