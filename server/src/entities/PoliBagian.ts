import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Dokter } from './Dokter'
import { KunjunganPoli } from './KunjunganPoli'
import { Reservasi } from './Reservasi'
import { User } from './User'

@ObjectType()
@Entity()
export class PoliBagian extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  nama: string

  @Field()
  @Column()
  hargaPendaftaran: number

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

  @Field(() => [Dokter])
  @OneToMany(() => Dokter, (dokter) => dokter.poliBagian)
  dokter: Dokter[]

  @Field(() => [KunjunganPoli], { nullable: true })
  @OneToMany(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.poliBagian)
  kunjunganPoli: KunjunganPoli[]

  @Field(() => [Reservasi], { nullable: true })
  @OneToMany(() => Reservasi, (reservasi) => reservasi.poliBagian)
  reservasi: Reservasi[]

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.poliBagian, { nullable: true })
  user: User
}

// Id,nama, harga_pendaftaran,id_user, created_by,created_at, edited_by,edited_at
