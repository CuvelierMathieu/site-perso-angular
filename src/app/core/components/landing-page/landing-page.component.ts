import { Component, OnInit } from '@angular/core';
import { linkedInUrl } from '../header/header.component';
import { Observable, interval, map } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  linkedInUrl: string = linkedInUrl;
  currentAge$!: Observable<string>;
  ageDifference!: TimeDifference;

  private _dateOfBirth: Date = new Date(1988, 2, 22, 13, 0);

  ngOnInit(): void {
    this.ageDifference = new TimeDifference(this._dateOfBirth, new Date());
    
    this.currentAge$ = interval(1000).pipe(map(() => {
      this.ageDifference.addOneSecond();
      return this.ageDifference.toString();
    }))
  }
}

class TimeDifference {
  private _oldest!: Date;
  private _newest!: Date;
  private _years!: number;
  private _months!: number;
  private _days!: number;
  private _hours!: number;
  private _minutes!: number;
  private _seconds!: number;

  constructor(firstDate: Date, secondDate: Date) {
    if (secondDate.getTime() > firstDate.getTime()) {
      this._oldest = firstDate;
      this._newest = secondDate;
    }
    else {
      this._oldest = secondDate;
      this._newest = firstDate;
    }

    console.log(`oldest is ${this._oldest}`);
    console.log(`newest is ${this._newest}`);

    this.calculateDifference();
  }

  addOneSecond(): void {
    this._seconds++;

    if (this._seconds >= 60) { this._minutes++; this._seconds -= 60; }
    if (this._minutes >= 60) { this._hours++; this._minutes -= 60; }
    if (this._hours >= 24) { this._days++; this._hours -= 24; }
    if (this._days >= 30) { this._months++; this._days -= 30; }
    if (this._months >= 12) { this._years++; this._months -= 12; }
  }

  toString(): string {
    return `${this._years} ans, ${this._months} mois, ${this._days} jours, ${this._hours} heures, ${this._minutes} minutes et ${this._seconds} secondes`;
  }

  private calculateDifference(): void {
    console.log('différence A - B :');
    console.log(this._newest);
    console.log(this._oldest);
    
    this._years = this._newest.getFullYear() - this._oldest.getFullYear();
    this._months = this._newest.getMonth() - this._oldest.getMonth();
    this._days = this._newest.getDate() - this._oldest.getDate();
    this._hours = this._newest.getHours() - this._oldest.getHours();
    this._minutes = this._newest.getMinutes() - this._oldest.getMinutes();
    this._seconds = this._newest.getSeconds() - this._oldest.getSeconds();

    console.log(`initial age : ${this.toString()}`)

    while (this._seconds < 0 || this._minutes < 0 || this._hours < 0 || this._days < 0 || this._months < 0) {
      if (this._seconds < 0) {
        this._seconds += 60;
        this._minutes--;
        console.log(`correction secondes ; nouvelle valeur = ${this.toString()}`);
      }

      if (this._minutes < 0) {
        this._minutes += 60;
        this._hours--;
        console.log(`correction minutes ; nouvelle valeur = ${this.toString()}`);
      }

      if (this._hours < 0) {
        this._hours += 24;
        this._days--;
        console.log(`correction heures ; nouvelle valeur = ${this.toString()}`);
      }

      if (this._days < 0) {
        this._days += Math.floor(365 / 12);
        this._months--;
        console.log(`correction jours ; nouvelle valeur = ${this.toString()}`);
      }

      if (this._months < 0) {
        this._months += 12;
        this._years--;
        console.log(`correction mois ; nouvelle valeur = ${this.toString()}`);
      }
    }
  }
}
