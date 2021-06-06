// type Error

export interface StackSourceInfo {
  url: string;
  func: string;
  args?: string[];
  line: number;
  column: number;
  id?: string;
}

export interface TrackBaseInfo {
  mode: string;
  name: string;
  message: string;
  error?: string;
  vueMeta?: string;
  href: string;
  version: string;
  pid: string;
  secret: string;
  eventdate?: string;
  sid?: string;
  stack?: string | any[]
}

export interface TrackSourceInfo extends TrackBaseInfo {
  stack?: string | StackSourceInfo[]
}

export interface TrackListRes {
  name: string;
  message: string;
  error?: string;
  vueMeta?: string;
  href: string;
  version: string;
  pid: string;
  secret: string;
  eventdate?: string;
  sid?: string;
}