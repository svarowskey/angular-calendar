import { Day} from "./date";

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

export interface Record {
  id: number;
  user_id: number;
  type_id: number;
  description: string;
  start: string;
  end: string;
  start_date: Date;
  end_date: Date;
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
  records: RecordWithType[];
}

export interface RecordWithType extends Omit<Record, 'type_id'> {
  type: RecordType;
}

export interface DayWithRecords extends Day {
  records: { [userId: number]: RecordWithType[]};
}

export interface NewRecord extends Omit<RecordResponse, 'id'>{}

export type UsersResponse = Response<UserResponse>
export type Types = Response<Type>
export type RecordsResponse = Response<RecordResponse>
