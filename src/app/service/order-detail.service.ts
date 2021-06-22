import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderDetail} from '../model/order-detail';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http:HttpClient) { }

  findByDate(Date:any):Observable<OrderDetail[]>{
    return this.http.post<OrderDetail[]>(`${API_URL}/Order/findByDate`,Date)
  }

  findAll(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(`${API_URL}/Order`);
  }

  History(id:number):Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(`${API_URL}/Order/${id}`)
  }

  save(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${API_URL}/Order`, orderDetail);
  }

  findBetween(date: any):Observable<OrderDetail[]> {
    // @ts-ignore
    return this.http.post<OrderDetail[]>(`${API_URL}/Order/findBetween/${date}`);
  }
}
