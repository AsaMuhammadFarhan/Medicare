import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { KunjunganPoli } from './KunjunganPoli'

@ObjectType()
@Entity()
export class Perawat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  nama: string

  @Field()
  @Column()
  nomorTelepon: string

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

  @Field(() => [KunjunganPoli])
  @OneToMany(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.perawat, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  kunjunganPoli: KunjunganPoli[]
}

// Id,nama, no_telp, created_by,created_at, edited_by,edited_at