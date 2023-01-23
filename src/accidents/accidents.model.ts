import { Client } from '../clients/clients.model';
import { ThirdPartyPerson } from '../third_party_people/third_party_people.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'accidents',
})
export class Accident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, (client) => client.accidents)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'vehicle_plate' })
  vehiclePlate: string;

  @Column({ name: 'vehicle_model' })
  vehicleModel: string;

  @Column({ name: 'vehicle_color' })
  vehicleColor: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp without time zone' })
  deletedAt: Date;

  @ManyToMany(() => ThirdPartyPerson, { cascade: true })
  @JoinTable({
    name: 'accidents_third_party_people',
    joinColumn: { name: 'accident_id' },
    inverseJoinColumn: { name: 'third_party_person_id' },
  })
  thirdPartyPeople: ThirdPartyPerson[];

  build<K extends keyof Omit<Accident, 'build'>>(
    items: Record<K, Accident[K]>,
  ): Accident {
    return Object.assign(this, items);
  }
}
