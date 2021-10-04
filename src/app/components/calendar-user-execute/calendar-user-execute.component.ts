import { Component, OnInit } from '@angular/core';
import * as moment from "moment/moment";
import {DateService} from "../../services/date.service";
import {Day, Record, Type, User} from "../../types";
import {combineLatest, Observable} from "rxjs";
import {CalendarService} from "../../services/calendar.service";
import {map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'calendar-user-execute',
  templateUrl: './calendar-user-execute.component.html',
  styleUrls: ['./calendar-user-execute.component.scss']
})
export class CalendarUserExecuteComponent implements OnInit {

  calendar: Day[] = [];

  constructor(
    public dateService: DateService,
    private calendarService: CalendarService,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit(): void {
    this.dateService.date.subscribe(this.generate.bind(this))
  }

  readonly users$: Observable<User[]> = this.calendarService.getUsers().pipe(
    shareReplay(1)
  )

  readonly types$: Observable<Type[]> = this.calendarService.getTypes().pipe(
    shareReplay(1)
  )

  readonly filterForm = this.formBuilder.group({
    type: [[]],
    user: [[]]
  })

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month');
    const date = startDay.clone().subtract(1, 'day');

    this.calendar = Array(now.daysInMonth())
      .fill(0)
      .map(() => {
        const value = date.add(1, 'day').clone();
        const weekend: boolean = (value.weekday() === 5 || value.weekday() === 6);
        const current: boolean = now.format('DD-MM-YYYY') === value.format('DD-MM-YYYY')

        return {
          value: value,
          weekend: weekend,
          current: current,
        }
      })
  }

  readonly usersWithRecords$ = combineLatest([
    this.dateService.date,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value as { user: number[], type: number[]}))
  ]).pipe(
    switchMap(([date, {user, type}]) => this.calendarService.getRecords(date, user, type)),
    switchMap((records: Record[]) => combineLatest([this.users$, this.types$]).pipe(
      map(([users, types]) => this.calendarService.mapUsersWithRecords(users, records, types))
    ))
  )
}
