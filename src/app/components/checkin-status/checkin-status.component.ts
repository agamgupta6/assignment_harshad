import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkin-status',
  imports: [],
  templateUrl: './checkin-status.component.html',
  styleUrl: './checkin-status.component.scss'
})
export class CheckinStatusComponent implements OnInit {
  
  private readonly ar= inject(Router);
  message= '';
  ngOnInit(): void {
    this.message = this.ar.lastSuccessfulNavigation?.extras?.state?.['message'];
  }


  

}
