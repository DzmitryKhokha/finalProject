// import { Given, When, Then } from '@cucumber/cucumber';
// import { APIClient } from '../../api/clients/APIClient';
// import { request } from 'node:http';

// Given('doctor is logged in', async function () {
//   const apiClient = new APIClient();
//   apiClient.login({
//     request : request,
//     email : process.env.USER_EMAIL,
//     password : process.env.USER_PASSWORD
//   })
// });

// When('user hits GET {string}', async function (endpoint: string) {
//   console.log('Endpoint is:', endpoint);
// });

// Then('verify status code is {int}', async function (statusCode: number) {
//   console.log('Status code is:', statusCode);
// });

import { Given, When, Then } from '@cucumber/cucumber';
import { APIClient } from '../../api/clients/APIClient';
import { request } from '@playwright/test';
import dotenv from 'dotenv';
import { expect, APIRequestContext, APIResponse } from '@playwright/test';
dotenv.config();

Given('doctor is logged in', async function () {
  const rawBaseUrl = process.env.BASE_URL;
  if (!rawBaseUrl) {
    throw new Error('BASE_URL is not defined in environment variables');
  }

  const baseURL = rawBaseUrl.trim().endsWith('/') ? rawBaseUrl.trim() : `${rawBaseUrl.trim()}/`;
  const apiRequest = await request.newContext({
    baseURL
  });

  const apiClient = new APIClient();

  const token = await apiClient.login({
    request: apiRequest,
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!
  });
  this.token = token;
  (this as any).apiRequest = apiRequest;
});

When('user hits GET {string}', async function (endpoint: string) {
  const apiRequest: APIRequestContext = (this as any).apiRequest || await request.newContext({
    baseURL: process.env.BASE_URL
  });

  const path = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const response: APIResponse = await apiRequest.get(path, {
    headers: (() => {
      const h: Record<string, string> = { Accept: 'application/json' };
      if ((this as any).token) {
        h.Authorization = `Bearer ${(this as any).token}`;
      }
      return h;
    })()
  });

  this.response = response;

  console.log('Status:', response.status());
  try {
    console.log('Request URL:', response.url());
  } catch (e) {
    console.log('Could not read response URL:', e);
  }
  try {
    const text = await response.text();
    console.log('Response body:', text);
  } catch (e) {
    console.log('Could not read response body:', e);
  }
});

Then('verify status code is {int}', async function (statusCode: number) {
  expect(this.response.status()).toBe(statusCode);
});