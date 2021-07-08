import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  headers: Headers = new Headers();

  constructor(private httpclient:HttpClient,private userService:UserService) { }
  AjouterDocument(document:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.post('http://localhost:8000/api/documents/',document,options);
  
  }
  getDocuments():Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get('http://localhost:8000/api/documents/',options);
  
  }
  getDocumentsByCoursId(cours:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/documents/?cours=${cours}`,options);
  
  }
  /*public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/upload/`, formData);
  }*/


  upload(file: File,cours:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('piece_jointe', file);
     formData.append('cours',cours);

    const req = new HttpRequest('POST', `http://localhost:8000/api/documentUpload/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }
  update(file: File,id:any,cours:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
     formData.append('id',id);
    formData.append('piece_jointe', file);
     formData.append('cours',cours);

    const req = new HttpRequest('PUT', `http://localhost:8000/api/documents/${id}/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpclient.request(req);
  }

  getFilesByCours(id:any): Observable<any> {
    return this.httpclient.get(`http://localhost:8000/api/documents/?cours=${id}`);
  }
  downloadFile(file): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
     /// 'Accept': 'application/pdf'
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers,
 
    };
     
    return this.httpclient.get(`http://localhost:8000/api/document_download/${file.id}/`,{responseType:"blob",headers:headers}  )
      
}
supprimer(id:any):Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     });
     console.log(localStorage);
      this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
      const options = {
    headers
  };
  return this.httpclient.delete(`http://localhost:8000/api/documents/${id}/`,options);

}
  /*downloadFile(id:any): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
		return this.httpclient.get(`http://localhost:8000/api/document_download/${id}/`, {responseType: 'blob'});
  }*/
 /* download(file: any| undefined): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
       });
       
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.httpclient.get(`http://localhost:8000/api/document_download/${file.id}/`, {
      options,
      responseType: 'blob'
    })
    .pipe(
      map((res: any) => {
        return new Blob([res.body], {
          type: 'application/pdf'
        })
      })
    );
  }*/
}