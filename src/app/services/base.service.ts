import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) { 
    this.httpClient = httpClient;
  }

  handle_response = async (response : any) => {
    if (response.status === 204) {
        return [response.status, '']
    }

    if (response.status >= 200 && response.status < 300) {
        return [response.status, await response.json()];
    }

    return [response.status, await response.text()];
  }

  get = async (url : string) => {
    const response = await fetch(url);
    return await this.handle_response(response);
  }

  post = async (url : string, data : any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await this.handle_response(response);
  }

  put = async (url: string, data: any) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await this.handle_response(response);
  }

  delete = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return await this.handle_response(response);
  }
}
