import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url : string = "http://localhost:3000/api/vehicles"
  constructor(private http: HttpClient,private authService: AuthService) { }

  getAll(){
    return this.http.get(this.url)
  }

  getById(id: string){
    return this.http.get(`${this.url}/${id}`)
  }
 
  addVehicle(obj:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.post(this.url, obj, { headers });
  }
  update( obj: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.patch(`${this.url}/${obj._id}`, obj , { headers });
  }

  delete(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
  edit(id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.get(`${this.url}/${id}`, { headers });
  }
}
