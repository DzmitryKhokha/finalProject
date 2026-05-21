// import { expect } from "@playwright/test";
// import { request } from '@playwright/test';
// import { APIRequestContext } from "@playwright/test";

// export class APIClient {
//     //constructor(private request: APIRequestContext) {}
//     async login ({ request, email, password }) {
//     const url = process.env.BASE_URL! + 'api-auth/login';

//     const response = await request.post(url, {
//         headers : {
//             Accept: 'application/json'
//         },

//         data : {
//             "email": email,
//             "password": password
//         }
//     });

//     expect(response.status()).toBe(201);

//     const responseBody = await response.json();
//     console.log('Token' + responseBody.token);
//     return responseBody.token;

//     // const requestBody = {
//     //     "first_name": "Ditry",
//     //     "last_name": "Do",
//     //     "dob": "2015-04-19",
//     //     "gender": "Male",
//     //     "phone": "323-323-4567",
//     //     "email": "dima@gmail.com",
//     // }

//     // const response = await request.post(url, {
//     //     headers : {
//     //         Authorization : process.env.API_TOKEN!,
//     //         Accept : 'application.json',
//     //     },

//     //     data : requestBody
//     // })

//     // expect(response.status()).toBe(201);

//     // const responseBody = await response.json();
//     // console.log(responseBody);
//     // }
// }}

import { expect, APIRequestContext } from '@playwright/test';

export class APIClient {
  async login({
    request,
    email,
    password
  }: {
    request: APIRequestContext;
    email: string;
    password: string;
  }) {
    const response = await request.post('api-auth/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email,
        password
      }
    });

    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Token: ' + responseBody.token);

    return responseBody.token;
  }
}