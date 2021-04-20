import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpclient:HttpClient) { }

  getBooks():Observable<any>{
    return this.httpclient.get('http://localhost:8000/demo/books/');
  
  }
  
}
