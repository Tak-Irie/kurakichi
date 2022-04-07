import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';

interface ArticleProps {
  id: UniqueEntityId;
  image: string;
  text: string;
}

type ArticlePrimitive = {
  id: string;
  image: string;
  text: string;
};
export class Article extends Entity<ArticleProps> {
  private constructor(readonly props: ArticleProps) {
    super(props);
  }
  public getId(): string {
    return this.props.id.getId();
  }
  public static create(props: ArticleProps): Result<Article> {
    const article = new Article({
      id: props.id,
      image: props.image,
      text: props.text,
    });
    // Article.addDomainEvent(new _EntityCreated(Article));
    return Result.success<Article>(article);
  }
  public static restoreFromRepo(storedArticle: ArticlePrimitive): Article {
    const { id, image, text } = storedArticle;
    return new Article({
      id: UniqueEntityId.restoreFromRepo(id),
      image,
      text,
    });
  }
}
