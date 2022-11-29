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
import { Obat } from './Obat'

@ObjectType()
@Entity()
export class RefObat extends BaseEntity {
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

  @Field(() => [Obat])
  @OneToMany(() => Obat, (obat) => obat.refObat)
  obat: Obat[]
}

// Id,nama, harga, created_by,created_at, edited_by,edited_at