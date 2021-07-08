import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Formateur } from '../models/formateur';
import { Participant } from '../models/participant';
import { Responsable } from '../models/responsable';
import { User } from '../models/user';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  cachedRequests: Array<HttpRequest<any>> = [];
  headers: Headers = new Headers();
  private usersUrl='http://localhost:8000/auth/users/';
 
   // http options used for making API calls
   private httpOptions: any;
 
   // the actual JWT token
   public token: string|null;
  
   // the token expiration date
   public token_expires?: Date|null;
  
   // the username of the logged in user
   public username?: string|null;
  
   // error messages received from the login attempt
   public errors: any = [];
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

   constructor( private http: HttpClient
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    }
    public login(user:any) {
      return this.http.post<any>(`http://localhost:8000/auth/api-token-auth/`,JSON.stringify(user),this.httpOptions);

      /*this.http.post(`http://localhost:8000/auth/api-token-auth/`, JSON.stringify(user), this.httpOptions).subscribe(
        data => {
          console.log(data)
          localStorage.setItem('auth-token',data['token']);
          console.log(localStorage);
        return this.updateData(data['token']);
        },
        err => {
          this.errors = err['error'];
          return this.errors
        }
      );*/
    }
    getToken(){
      return localStorage.getItem('auth-token');
    }
 /* getJobs(){
    return this.webService.get('jobs');
  }*/
  // Refreshes the JWT token, to extend the time the user is logged in
  
  public refreshToken() {
    this.http.post('http://localhost:8000/auth/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        console.log(data );
         this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    //console.log(this.token);
    localStorage.removeItem('auth-token');
   /* localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('exp');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');*/
    
    
    
    
  }
 
  public updateData(token) {
    this.token = token;
    this.errors = [];
    if(this.token!=null){
 
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    console.log(token_decoded);
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
   // localStorage.setItem('user_id',token_decoded.)
    return token_decoded;
    }
  }
  registerUser(user: User){
 
  
    return this.http.post<any>(`http://localhost:8000/auth/register/`,JSON.stringify(user),this.httpOptions);
  }
  updateUser(id:any,user: any,selectedFile:any ): Observable<HttpEvent<any>> {
    const uploadData: FormData = new FormData();
    if(selectedFile){
    uploadData.append('avatar', selectedFile, selectedFile.name);
    }
    uploadData.append('username',user.username);
    uploadData.append('first_name',user.first_name);
    uploadData.append('last_name',user.last_name);
    uploadData.append('email',user.email);

    const req = new HttpRequest('PUT', `http://localhost:8000/auth/update_profile/${id}/`, uploadData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
    //return this.http.put<any>(`http://localhost:8000/auth/update_profile/${id}/`,JSON.stringify(user),this.httpOptions);
  }
  updateUserp(id:any,user:any){
    return this.http.put<any>(`http://localhost:8000/auth/users/${id}/`,user,this.httpOptions);
  }
  registerResponsable(responsable:Responsable){
    return this.http.post<any>(`http://localhost:8000/auth/register_resp/`,JSON.stringify(responsable),this.httpOptions);

  }
  registerFormateur(formateur:Formateur){
    return this.http.post<any>(`http://localhost:8000/auth/register_formateur/`, JSON.stringify(formateur),this.httpOptions);

  }
  registerParticipant(participant:Participant){
    return this.http.post<any>(`http://localhost:8000/auth/register_participant/`, JSON.stringify(participant),this.httpOptions);

  }
  authenticationService(user:User) {
    console.log(user.username);
    return this.http.post<any>(`http://localhost:8000/auth/login/`,user);
    
  
  }
 
  getUsers():Observable<any>{
    return this.http.get('http://localhost:8000/auth/users/');
  
  }
  getUserByID(id:any):Observable<any>{
    //console.log(this.userService.token)

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       });
       console.log(localStorage);
        this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth-token'));
        const options = {
      headers
    };
    return this.http.get(`${this.usersUrl}${id}/`,options );
  
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username:string, password:string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    console.log(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));
  }
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }
public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
  /*logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }*/

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
