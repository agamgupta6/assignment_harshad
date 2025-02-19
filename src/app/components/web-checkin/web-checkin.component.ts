import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CheckinService } from '@services/checkin/checkin.service';

@Component({
  selector: 'app-web-checkin',
  templateUrl: './web-checkin.component.html',
  styleUrl: './web-checkin.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class WebCheckinComponent {
  private fb = inject(FormBuilder);
  checkinService = inject(CheckinService);
  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
  });

  onSubmit(): void {
    this.checkinService.doCheckin();
  }
}
