import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({providedIn: 'root'})
export class TaskService {
  date: string;
  constructor(private http: HttpClient) {}
  SetSelectedDate(date: string) {
    console.log('set date : ', date);
    this.date = date;
    return true;
  }

  GetSelectedDate() {
    return this.date;
  }
  NewTask(newtask: Task) {
    this.http.post('http://localhost:3000/tasklist', newtask)
    .subscribe();
    return true;
    // look how to se response state
  }

  GetCurrentDayTasks(date: string) {
    // console.log('GetCurrentDayTasks : ', date);
    return this.http.get(`http://localhost:3000/tasklist?date=${date}&_sort=id&_order=desc`);
  }

  DeleteTask(id: number) {
    this.http.delete(`http://localhost:3000/tasklist/${id}`).subscribe();
  }
}
