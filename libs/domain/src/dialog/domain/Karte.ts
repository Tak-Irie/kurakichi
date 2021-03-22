import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface KarteProps {
  id: UniqueEntityId;
}

export class Karte extends Entity<KarteProps> {
  constructor(readonly props: KarteProps) {
    super(props);
  }
  getId(): string {
    return this.props.id.getId();
  }
  public static create(props: KarteProps): Result<Karte> {
    const _entity = new Karte({
      ...props,
    });
    // Karte.addDomainEvent(new _EntityCreated(Karte));
    return Result.success<Karte>(_entity);
  }
}
