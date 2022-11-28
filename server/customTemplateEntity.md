import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Template extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
 
  @Field(() => String)
  @Column()
  createdBy: string;

  @Field(() => String)
  @Column()
  updatedBy: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@Field(() => [PoliBagian])
@ManyToMany(() => PoliBagian, (poliBagian) => poliBagian.dokter)
poliBagian: PoliBagian[];