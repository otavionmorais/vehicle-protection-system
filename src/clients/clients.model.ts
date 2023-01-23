import { Exclude } from 'class-transformer';
import { Accident } from '../accidents/accidents.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  email?: string;

  @Column()
  phone?: string;

  @Column({ name: 'birth_date' })
  birthDate?: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp without time zone' })
  deletedAt?: Date;

  @OneToMany(() => Accident, (accident) => accident.client)
  accidents: Accident[];

  build<K extends keyof Omit<Client, 'build'>>(
    items: Partial<Record<K, Client[K]>>,
  ): Client {
    return Object.assign(this, items);
  }
}
