import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class CheckinService {
  constructor(private readonly apollo: Apollo) {}
  doCheckin() {
    // call api for checkin
    console.log('checkin api called.');
    this.apollo
      .mutate({
        mutation: gql`
          mutation XYZ {
            doCheckin(bookingCode: "K12345", fname: "GUPTA") {
              message
            }
          }
        `,
      })
      .subscribe((result: any) => {
        // this.rates = result.data?.rates;
        // this.loading = result.loading;
        // this.error = result.error;
        console.log(result.data);
      });
  }
}
