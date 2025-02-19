import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin-status',
  imports: [MatCardModule,MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './checkin-status.component.html',
  styleUrl: './checkin-status.component.scss'
})
export class CheckinStatusComponent implements OnInit {
  
  private readonly router= inject(Router);
  message= '';
  isError= false;
  ngOnInit(): void {
    this.message = this.router.lastSuccessfulNavigation?.extras?.state?.['message'];
    this.isError = this.router.lastSuccessfulNavigation?.extras?.state?.['error'];
  }
  goBack(){
    this.router.navigateByUrl('web-checkin');
  }

}
