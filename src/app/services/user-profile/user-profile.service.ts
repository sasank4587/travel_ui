import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from 'src/app/model/authentication-request.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/model/UserProfile.model';

const API_URL = "http://localhost:8081/user/";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(public http : HttpClient) { }
  
  getProfileDetails(userName : string ) : Observable<UserProfile>{
//    let headers = new HttpHeaders({'loggedInUser': sessionStorage.getItem('user')});
    return this.http.get<UserProfile>(API_URL+userName+"/profile");
  }

}