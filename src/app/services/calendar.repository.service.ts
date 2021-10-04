import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecordsResponse, Types, UsersResponse} from "../types";

@Injectable()
export class CalendarRepositoryService {
  private readonly url: string = environment.calendar_api_url;

  constructor(
    private http: HttpClient
  ) { }

  fetchUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.url + '/users');
  }

  fetchTypes(): Observable<Types> {
    return this.http.get<Types>(this.url + '/types');
  }

  fetchRecords(date: string, userIds: number[], typeIds: number[]): Observable<RecordsResponse> {
    const params = new HttpParams({ fromObject: {
        date,
        'user_id[]': userIds,
        'type_id[]': typeIds
      }})
    return this.http.get<RecordsResponse>(this.url, {params})
  }
}
