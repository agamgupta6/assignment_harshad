import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CheckinService { 
  private readonly apollo = inject(Apollo);
 
  doCheckin(familyName:string, bookingCode:string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation CHECKIN($bookingCode:String!, $familyName: String! ) {
            doCheckin(bookingCode: $bookingCode, fname: $familyName) {
              message
            }
          }
        `,
        variables:{familyName,bookingCode}
      });
      
  }
}
