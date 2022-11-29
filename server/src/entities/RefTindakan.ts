import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Tindakan } from './Tindakan'

@ObjectType()
@Entity()
export class RefTindakan extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  nama: string

  @Field(() => Int)
  @Column()
  harga: number

  @Field(() => String)
  @Column()
  createdBy: string

  @Field(() => String)
  @Column()
  updatedBy: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => [Tindakan])
  @OneToMany(() => Tindakan, (tindakan) => tindakan.refTindakan)
  tindakan: Tindakan[]
}