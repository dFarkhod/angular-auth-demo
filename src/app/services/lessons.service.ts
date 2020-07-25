import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LessonsService {

  constructor(private http: AuthHttp) {
  }

  getLessons() { 
    return this.http.get('/api/lessons')
      .map(response => response.json());
  }
}
