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
import { Kunjungan } from './Kunjungan'
import { Pasien } from './Pasien'
import { PoliBagian } from './PoliBagian'
import { Reservasi } from './Reservasi'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  username!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Field()
  @Column({ default: 'guest' })
  role!: 'guest' | 'admin' | 'admin-poli' | 'cashier'

  @Column()
  password!: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date

  @Field(() => Pasien, { nullable: true })
  @OneToOne(() => Pasien, (pasien) => pasien.user, { nullable: true })
  pasien: Pasien

  @Field(() => PoliBagian, { nullable: true })
  @OneToOne(() => PoliBagian, (poliBagian) => poliBagian.user, { nullable: true })
  poliBagian: PoliBagian

  @Field(() => [Reservasi])
  @OneToMany(() => Reservasi, reservasi => reservasi.user)
  reservasi: Reservasi[]

  @Field(() => [Kunjungan])
  @OneToMany(() => Kunjungan, kunjungan => kunjungan.user)
  kunjungan: Kunjungan[]
}
