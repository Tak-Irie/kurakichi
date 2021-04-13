import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface ArticleProps {
  id: UniqueEntityId;
}
// TODO:placer
export class Article extends Entity<ArticleProps> {
  constructor(readonly props: ArticleProps) {
    super(props);
  }
  public getId(): string {
    return this.props.id.getId();
  }
  public static create(props: ArticleProps): Result<Article> {
    const _Article = new Article({
      ...props,
    });
    // Article.addDomainEvent(new _EntityCreated(Article));
    return Result.success<Article>(_Article);
  }
}
