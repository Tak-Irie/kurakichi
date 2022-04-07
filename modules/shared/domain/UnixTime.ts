import { Result } from "../../shared copy/Result";
import { ValueObject } from "../../shared copy/domain/ValueObject";

export type UnixTimeProps = {
  time: number;
};

export class UnixTime extends ValueObject<UnixTimeProps> {
  private constructor(props: UnixTimeProps) {
    super(props);
  }

  public getTime(): number {
    return this.props.time;
  }

  public getJpDate(): string {
    const dateObj = new Date(this.getTime());
    return dateObj.toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "numeric",
      minute: "numeric",
    });
  }

  public static create(): Result<UnixTime> {
    const unixDate = Date.now();
    return Result.success<UnixTime>(new UnixTime({ time: unixDate }));
  }

  public static restoreFromRepo(time: number): UnixTime {
    return new UnixTime({ time });
  }
}
