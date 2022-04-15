import { Result } from '../core';
import { ValueObject } from './ValueObject';

import { format } from 'date-fns';

export type TimeProps = {
  time: string;
};

export class Time extends ValueObject<TimeProps> {
  private constructor(props: TimeProps) {
    super(props);
  }

  public getTime(): string {
    return this.props.time;
  }

  // public getJpDate(): string {
  //   const dateObj = new Date(this.getTime());
  //   return dateObj.toLocaleDateString('ja-JP', {
  //     timeZone: 'Asia/Tokyo',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //   });
  // }

  public static create(): Result<Time> {
    const time = format(Date.now(), 'yyyy-MM-dd_HH:mm:ss:SS_XX');
    return Result.success<Time>(new Time({ time }));
  }

  public static restoreFromRepo(time: string): Time {
    return new Time({ time });
  }
}
