import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  constructor(private httpclient:HttpClient) { }

  getProgrammes():Observable<any>{
    return this.httpclient.get('http://localhost:8000/api/programmes/');
  
  }
}
