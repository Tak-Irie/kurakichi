import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
} from 'typeorm';

export type Role = 'ADMIN' | 'DEVELOPER' | 'USER';
@ObjectType()
@Entity('user')
export class StoredUser {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: 'USER' })
  role?: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
