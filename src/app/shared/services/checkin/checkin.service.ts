import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CheckinService { 
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);
 
  doCheckin() {
    // call api for checkin
    console.log('checkin api called.');
    this.apollo
      .mutate({
        mutation: gql`
          mutation XYZ {
            doCheckin(bookingCode: "K34567", fname: "Bankar") {
              message
            }
          }
        `,
      })
      .subscribe((result: any) => {
        this.router.navigateByUrl('checkin-status',{state:{message:result.data.doCheckin.message}});
        console.log(result.data);
       
      });
  }
}
