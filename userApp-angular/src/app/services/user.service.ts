import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  URL = `https://jsonplaceholder.typicode.com/users/`;


  //GET All Users
  getUsers(){
    return this.http.get<User[]>(this.URL);
  }

  //GET ONE Single User
  getUser(ID: String){
    return this.http.get(this.URL+ID);
  }

  //POST A User
  postUser(nuser: User){
    return this.http.post(this.URL, nuser);
  }

  //DELET A User
  deleteUser(ID: String){
    return this.http.delete(this.URL+ID);
  }

  //UPDATE A User
  patchUser(ID: String, ndata: User){
    return this.http.patch(this.URL+ID, ndata);
  }
}
