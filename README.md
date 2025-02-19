# angular-graphql

# Install and Run
Run npm install in both folders (server and checkin ). Open 2 terminals in root folder and run below commands to start front and back:
## Run



```bash
npm run front
```

```bash
npm run back
```

Access app on  http://localhost:4200/

## Testing
Use below data for testing:

```bash
const bookings = [
  {
    bookingCode: "K12345",
    fName: "Gupta",
    checkinStatus: true,
    checkinWindow: "CLOSED",
  },
  {
    bookingCode: "K23456",
    fName: "Singh",
    checkinStatus: false,
    checkinWindow: "PRE",
  },
  {
    bookingCode: "K34567",
    fName: "Bankar",
    checkinStatus: false,
    checkinWindow: "OPEN",
  },
  {
    bookingCode: "K45678",
    fName: "JOHN",
    checkinStatus: false,
    checkinWindow: "CLOSED",
  },
];
```
