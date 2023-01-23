import { Accident } from '../accidents/accidents.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'third_party_people',
})
export class ThirdPartyPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'birth_date' })
  birthDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp without time zone' })
  deletedAt: Date;

  @ManyToMany(() => Accident)
  accidents: Accident[];

  build<K extends keyof Omit<ThirdPartyPerson, 'build'>>(
    items: Record<K, ThirdPartyPerson[K]>,
  ): ThirdPartyPerson {
    return Object.assign(this, items);
  }
}
