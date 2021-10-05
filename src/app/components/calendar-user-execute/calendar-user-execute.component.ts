import { Component, OnInit } from '@angular/core';
import {DayWithRecords, Record, RecordWithType, Type, User} from "../../types";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {CalendarService} from "../../services/calendar.service";
import {distinctUntilChanged, map, shareReplay, startWith, switchMap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";
import {Day, getMonthDays, getMonthName, getTimePercentPerDay} from "../../date";

@Component({
  selector: 'calendar-user-execute',
  templateUrl: './calendar-user-execute.component.html',
  styleUrls: ['./calendar-user-execute.component.scss']
})
export class CalendarUserExecuteComponent implements OnInit {

  readonly currentDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  readonly days$: Observable<Day[]> = this.currentDate$.pipe(
      map((date) => getMonthDays(date)),
      shareReplay(1)
    );

  constructor(
    private calendarService: CalendarService,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit(): void {
  }

  readonly users$: Observable<User[]> = this.calendarService.getUsers().pipe(
    shareReplay(1)
  )

  readonly types$: Observable<Type[]> = this.calendarService.getTypes().pipe(
    shareReplay(1)
  )

  readonly monthName$: Observable<string> = this.currentDate$.pipe(
    map((date) => getMonthName(date)),
    distinctUntilChanged()
  )

  readonly year$: Observable<number> = this.currentDate$.pipe(
    map((date) => date.getFullYear()),
    distinctUntilChanged()
  )

  readonly filterForm = this.formBuilder.group({
    type: [[]],
    user: [[]]
  })

  changeMonth(prev: boolean = false): void {
    const currentDate = this.currentDate$.value;
    const step = prev ? -1 : 1;
    currentDate.setMonth(currentDate.getMonth() + step);
    this.currentDate$.next(currentDate);
  }

  readonly usersWithRecords$: Observable<User[]> = this.users$.pipe(
    switchMap((users) => this.records$.pipe(
      map((records) => users.filter((user) => records
        .find((record) => record.user_id === user.id)))
    ))
  )

  readonly records$ = combineLatest([
    this.currentDate$,
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.value as { user: number[], type: number[]}))
  ]).pipe(
    switchMap(([date, {user, type}]) => this.calendarService.getRecords(date, user, type)),
    shareReplay(1)
  )

  readonly daysWithRecords$: Observable<DayWithRecords[]> = this.days$.pipe(
    switchMap((days) => this.records$.pipe(
      switchMap((records) => this.types$.pipe(
        map((types) => this.calendarService.mapRecordTypesAsDict(types)),
        map((typesDict) => records.map((record) => this.calendarService.mapRecordWithType(record, typesDict))),
      )),
      map((records: RecordWithType[]) => this.calendarService.mapDaysWithRecords(days, records))
    ))
  )

  getRecordStyle({ start_date: start, end_date: end, type: { color } }: RecordWithType): {[key: string]: string} {
    const startDayDate = new Date(start);
    startDayDate.setHours(0,0,0,0);
    return {
      width: getTimePercentPerDay(end.getTime() - start.getTime()) + '%',
      left: getTimePercentPerDay(start.getTime() - startDayDate.getTime()) + '%',
      backgroundColor: color,
    }
  }
}
