import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DbUserFormat } from '../model/userDB.model';

const URI =  'https://calender-todolist.herokuapp.com/api/user/';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}

  async GetUser(userId: string) {
    // console.log('before setupSocketConnection');
    return this.http.get(`${URI}currentUser/${userId}`);

  }

  RegisterUser(user: DbUserFormat) {
    this.http.post(`${URI}register`, user)
    .subscribe(res => {
      console.log('RegisterUser res-> ', res);
    });
  }

  LoginUser(loguser: any) {
    console.log('user UserService -> ', URI);
    return this.http.post<{userid: string}>(`${URI}loguser`, loguser);
  }

  AddUserToChat(chatname: string, userToadd: string) {

  }
  // AddCharToUserList(chatname: string) {
  //   this.chats.push({
  //     name: chatname
  //   });
  // }

  // GetChatList() {
  //   return this.chats;
  // }
}
