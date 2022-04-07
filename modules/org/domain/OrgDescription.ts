import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

type OrgDescriptionProps = { content: string };

export class OrgDescription extends ValueObject<OrgDescriptionProps> {
  private constructor(readonly props: OrgDescriptionProps) {
    super(props);
  }
  public getContent(): string {
    return this.props.content;
  }

  public static create(props: OrgDescriptionProps): Result<OrgDescription> {
    // TODO:add validation
    // let isValid:boolean
    // if(props.content != "UNKNOWN"){
    // isValid = someValidation(props.content)
    // }
    // if(isValid === false) return Result.fail<OrgDescription>("不適当な文言が含まれています")

    const _OrgDescription = new OrgDescription({
      content: props.content,
    });
    return Result.success<OrgDescription>(_OrgDescription);
  }

  public static restoreFromRepo(props: string): OrgDescription {
    const orgDescription = new OrgDescription({ content: props });
    return orgDescription;
  }
}
