import { Component, inject, signal } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { CheckinService } from '@services/checkin/checkin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-checkin',
  templateUrl: './web-checkin.component.html',
  styleUrl: './web-checkin.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class WebCheckinComponent {
  private fb = inject(FormBuilder);
  private readonly router = inject(Router);
  loading= signal(false);
  checkinService = inject(CheckinService);
  checkinForm = this.fb.group({
    familyName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$"),Validators.maxLength(15)]],
    bookingCode: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]*$"),Validators.minLength(6),Validators.maxLength(6)]]
  });

  onSubmit(): void {
    this.loading.set(true);
    if(this.familyName && this.bookingCode){
      this.checkinService.doCheckin(this.familyName,this.bookingCode)
      .subscribe((result: any) => {
        this.router.navigateByUrl('checkin-status',{state:{message:result.data.doCheckin.message,error:false }});
        this.loading.set(false);   
      });
    }
  }

  get familyName(){
    return this.checkinForm.get('familyName')?.value;
  }
  get bookingCode(){
    return this.checkinForm.get('bookingCode')?.value;
  }

}
