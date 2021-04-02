import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  passwordHash: string;
  @Column()
  role: string;
  @Column()
  createdBy: string;
  @Column()
  createdDate: Date;
  @Column()
  modifiedBy: string;
  @Column()
  modifiedDate: Date;
}
