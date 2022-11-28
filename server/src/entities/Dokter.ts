import { Field, Int, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { KunjunganPoli } from './KunjunganPoli'
import { PoliBagian } from './PoliBagian'
import { Reservasi } from './Reservasi'

@ObjectType()
@Entity()
export class Dokter extends BaseEntity {
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

  @Field(() => Int)
  @Column()
  poliBagianId: number

  @Field(() => PoliBagian)
  @ManyToOne(() => PoliBagian, (poliBagian) => poliBagian.dokter, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  poliBagian: PoliBagian

  @Field(() => [KunjunganPoli])
  @OneToMany(() => KunjunganPoli, (kunjunganPoli) => kunjunganPoli.dokter, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  kunjunganPoli: KunjunganPoli[]

  @Field(() => [Reservasi])
  @OneToMany(() => Reservasi, (reservasi) => reservasi.dokter, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  reservasi: Reservasi[]
}

// Id,nama,id_poli_bagian,no_telp, created_by,created_at, edited_by,edited_at