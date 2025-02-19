import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CheckinService { 
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);
 
  doCheckin(familyName:string, bookingCode:string) {
    this.apollo
      .mutate({
        mutation: gql`
          mutation CHECKIN($bookingCode:String!, $familyName: String! ) {
            doCheckin(bookingCode: $bookingCode, fname: $familyName) {
              message
            }
          }
        `,
        variables:{familyName,bookingCode}
      })
      .subscribe((result: any) => {
        this.router.navigateByUrl('checkin-status',{state:{message:result.data.doCheckin.message,error:false }});
              
      });
  }
}
