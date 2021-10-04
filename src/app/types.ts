import * as moment from "moment/moment";

export interface Response<Type> {
  success: number;
  data: Type[];
}

export interface UserResponse {
  id: number;
  name: string;
  url: string;
  position: string;
  avatar_mini: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
  color: string;
}

export interface Day {
  value: moment.Moment;
  weekend: boolean;
  current: boolean;
}

export interface Record {
  id: number;
  user_id: number;
  type_id: number;
  description: string;
  start: string;
  end: string;
  start_date: string;
  end_date: string;
}

export interface RecordResponse {
  id: number;
  user_id: number;
  type_id: number;
  description: string;
  start: string;
  end: string;
}

export interface RecordType {
  id: number;
  name: string;
  color: string;
}

export interface UserWithRecords extends User {
  records: RecordWithType[]
}

export type RecordWithType = {
  type: RecordType
} & Omit<Record, 'type_id' | 'user_id'>

export type UsersResponse = Response<UserResponse>
export type Types = Response<Type>
export type RecordsResponse = Response<RecordResponse>
