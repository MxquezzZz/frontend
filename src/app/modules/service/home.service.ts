import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private URL:string = "http://localhost:8080/api/citas"
  
  constructor(private http: HttpClient) { }

  public list ():Observable<any>{
    return this. http.get<any[]>(`${this.URL}/all`);
  }

  public delete (id:any):Observable<any>{
    return this. http.delete(`${this.URL}/${id}`);
  }

  public dave (data:any):Observable<any>{
    return this. http.post(`${this.URL}/create`,data);
  }

  public update (data:any,id:any):Observable<any>{
    return this. http.put(`${this.URL}/${id}`,data);
  }

}
