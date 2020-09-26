import { Component, OnInit, Output, Input, OnChanges, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  monthsList = [{m: 'January', nd: 31}, {m: 'February', nd: 29}, {m: 'March', nd: 31}, {m: 'April', nd: 30} ,
{m: 'May', nd: 31}, {m: 'June', nd: 30}, {m: 'July', nd: 31}, {m: 'August', nd: 31},
{m: 'September', nd: 30}, {m: 'October', nd: 31}, {m: 'November', nd: 30}, {m: 'December', nd: 31}];
  daysList = [{n: 'Mo'}, {n: 'tu'}, {n: 'We'}, {n: 'Th'}, {n: 'Fr'}, {n: 'Sa'}, { n: 'Su'}];
  days: number[] = [];
  MLsize = 11;
  temp = false;
  cyear: number;
  cmonth: number;
  cday: number;
  @Output() clickeddate = new EventEmitter<boolean>();
  constructor(private taskservice: TaskService) { }

  ngOnInit() {
    const date = new Date();
    this.cday = date.getDate();
    this.cmonth = date.getMonth();
    this.cyear = date.getFullYear();
    for (let i = 0; i < this.monthsList[this.cmonth - 1].nd ; i++) {
      this.days.push(i + 1);
    }
    this.SetMonthInClaendar(this.cyear, this.cmonth, 0);
    // to make changes on load in element style the DOM tree need to be ready
    // we need an event to tell when the DOM tree is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.SelectedDay(this.cmonth , this.cday);
    });
  }

  ToUnderline(date: string) {
    const regex = / /gi;
    return date.replace(regex, '_');
  }

  showDay() {
    return this.daysList;
  }

  NDinMonth(fd: number, ld: number, c: number) {
    const findex = this.days.indexOf(1);
    let lindex: number;
    let num: number;
    if ( (this.cmonth - 1 + c) > 0) {
      lindex = this.days.indexOf(this.monthsList[this.cmonth - 1 + c].nd);
      num = this.monthsList[this.cmonth - 1 + c].nd;
    } else {
      lindex = this.days.indexOf(this.monthsList[this.MLsize].nd);
      num = this.monthsList[this.MLsize].nd;
    }

    if (fd < findex) {
      for (let i = 0; i < (findex - fd - 1) ; i++) {
        this.days.shift();
      }
    } else {
      for (let i = 0; i < (fd - findex - 1) ; i++) {
        this.days.unshift(undefined);
      }
    }
    if ( ld < num) {
      for (let i = 0; i < (num - ld); i++) {
        this.days.pop();
      }
    } else if (ld > num) {
      for ( let i = 0; i < (ld - num); i++) {
        this.days.push(this.monthsList[this.cmonth - 1].nd + i + 1);
      }
    }
  }

  Perv() {
    const temp = (this.cmonth - 1) % 12;
    if (temp !== -1) {
      this.cmonth = temp;
    } else {
      this.cmonth = 11;
      this.cyear = this.cyear - 1;
    }
    this.SetMonthInClaendar(this.cyear, this.cmonth, 1);
  }

  Next() {
    this.cmonth = (this.cmonth + 1) % 12;
    if (this.cmonth === 0) {
      this.cyear = this.cyear + 1;
    }
    this.SetMonthInClaendar(this.cyear, this.cmonth, 1);
  }

  SelectedDay(month: number, day: number) {
    const date = new Date(this.cyear, month, day);
    const underlinedate = this.ToUnderline(date.toDateString());
    this.taskservice.SetSelectedDate(underlinedate);
    this.temp = !this.temp;
    this.clickeddate.emit(this.temp);
    document.getElementById(this.cday.toString()).style.fontSize = '15px';
    document.getElementById(this.cday.toString()).style.color = 'white';
    this.cday = day;
    document.getElementById(day.toString()).style.fontSize = '20px';
    document.getElementById(day.toString()).style.color = 'black';
  }

  SetMonthInClaendar(year: number, month: number, c: number) {
    const firstDay = new Date(year, month + c, 1);
    this.NDinMonth(firstDay.getDay(), this.monthsList[month].nd, 0);
  }

}
