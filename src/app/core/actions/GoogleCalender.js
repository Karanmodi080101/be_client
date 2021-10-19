// import React from 'react';
// export const GoogleCalender = (props) => {
//   console.log('googleCalender', props);
//   var gapi = window.gapi;
//   /*
//     Update with your own Client Id and Api key
//   */
//   var CLIENT_ID =
//     '829368560485-lipam7v7fklnt69il47vtl74su1vg5fo.apps.googleusercontent.com';
//   var API_KEY = 'AIzaSyD7tqL8K2h_246Xf8Oqb6-rDfipSjvwULk';
//   var DISCOVERY_DOCS = [
//     'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
//   ];
//   var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

//   //const handleClick = () => {
//   gapi.load('client:auth2', () => {
//     console.log('loaded client');

//     gapi.client.init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES
//     });

//     gapi.client.load('calendar', 'v3', () => console.log('bam!'));

//     gapi.auth2
//       .getAuthInstance()
//       .signIn()
//       .then(() => {
//         var event = {
//           summary: props?.task?.title, //'Awesome Event!',
//           //location: '800 Howard St., San Francisco, CA 94103',
//           description: props?.task?.description, //'Really great refreshments',
//           start: {
//             dateTime: props?.task?.startDate, //'2021-10-19T09:00:00-07:00',
//             timeZone: 'Asia/Calcutta'
//           },
//           end: {
//             dateTime: props?.task?.endDate, //'2021-10-21T17:00:00-07:00',
//             timeZone: 'Asia/Calcutta'
//           },
//           //recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
//           // attendees: [
//           //   { email: 'lpage@example.com' },
//           //   { email: 'sbrin@example.com' }
//           // ],
//           reminders: {
//             useDefault: false,
//             overrides: [
//               { method: 'email', minutes: 24 * 60 },
//               { method: 'popup', minutes: 10 }
//             ]
//           }
//         };

//         var request = gapi.client.calendar.events.insert({
//           calendarId: 'primary',
//           resource: event
//         });

//         request.execute((event) => {
//           console.log(event);
//           window.open(event.htmlLink);
//         });

//         /*
//             Uncomment the following block to get events
//         */

//         // get events
//         // gapi.client.calendar.events
//         //   .list({
//         //     calendarId: 'primary',
//         //     timeMin: new Date().toISOString(),
//         //     showDeleted: false,
//         //     singleEvents: true,
//         //     maxResults: 10,
//         //     orderBy: 'startTime'
//         //   })
//         //   .then((response) => {
//         //     const events = response.result.items;
//         //     console.log('EVENTS: ', events);
//         //   });
//       });
//   });
//   //};
//   // return (
//   //   <div>
//   //     <p>Click to add event to Google Calendar</p>
//   //     <p style={{ fontSize: 18 }}>
//   //       Uncomment the get events code to get events
//   //     </p>
//   //     <button style={{ width: 100, height: 50 }} onClick={handleClick}>
//   //       Add Event
//   //     </button>
//   //   </div>
//   // );
// };
