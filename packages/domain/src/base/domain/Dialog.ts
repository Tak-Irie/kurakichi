import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

type DialogProps = { content: string };

export class Dialog extends ValueObject<DialogProps> {
  private constructor(readonly props: DialogProps) {
    super(props);
  }
  public getValue(): string {
    return this.props.content;
  }
  public static create(props: DialogProps): Result<Dialog> {
    const _Dialog = new Dialog({
      ...props,
    });
    return Result.success<Dialog>(_Dialog);
  }

  /**
   * only used for data mapper in infra layer
   */
  public static restoreFromRepo(props: any): Dialog {
    const _Dialog = new Dialog(props);
    return _Dialog;
  }
}
