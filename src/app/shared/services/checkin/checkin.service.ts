import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor() { }
  doCheckin(){
    // call api for checkin
    console.log('checkin api called.');
  }
}
