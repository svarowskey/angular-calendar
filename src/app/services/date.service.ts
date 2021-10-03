import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() { }

  date: BehaviorSubject<any> = new BehaviorSubject(moment());
}
