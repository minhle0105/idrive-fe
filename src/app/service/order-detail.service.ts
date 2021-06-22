import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderDetail} from '../model/order-detail';
import {User} from '../model/user';
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http:HttpClient) { }

  findAll(ownerId: number):Observable<OrderDetail[]> {
    // @ts-ignore
    return this.http.get<OrderDetail[]>(`${API_URL}/Order`, ownerId);
  }

  History(id:number):Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(`${API_URL}/Order/${id}`)
  }

  save(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(`${API_URL}/Order`, orderDetail);
  }

  findBetween(date: any, ownerId: number):Observable<OrderDetail[]> {
    // @ts-ignore
    return this.http.post<OrderDetail[]>(`${API_URL}/Order/findBetween/${date}/${ownerId}`);
  }
}
