import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('waitlist')
export class WaitlistEntry {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
