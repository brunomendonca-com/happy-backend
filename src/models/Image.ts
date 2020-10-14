import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import FosterHome from "./FosterHome";

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => FosterHome, fosterhome => fosterhome.images)
  @JoinColumn({ name: 'fosterhome_id' })
  fosterhome: FosterHome;
}