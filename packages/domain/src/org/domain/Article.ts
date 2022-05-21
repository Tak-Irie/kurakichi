import { Result } from "../../shared/core";
import { Entity } from "../../shared/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

interface ArticleProps {
  id: UniqueEntityId;
  image: string;
  content: string;
}

type ArticlePrimitive = {
  id: string;
  image: string;
  content: string;
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
      content: props.content,
    });
    // Article.addDomainEvent(new _EntityCreated(Article));
    return Result.success<Article>(article);
  }
  public static restoreFromRepo(storedArticle: ArticlePrimitive): Article {
    const { id, image, content } = storedArticle;
    return new Article({
      id: UniqueEntityId.restoreFromRepo({ id }),
      image,
      content,
    });
  }
}
