import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity('test')
export class DbTest extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
