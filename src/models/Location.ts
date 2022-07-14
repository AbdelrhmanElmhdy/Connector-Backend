import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"
import { Message } from "./Message"

@Entity()
export default class Location {

  @Column()
  latitude: number

  @PrimaryColumn()
  longitude: number

  @OneToOne((type) => Message, (message) => message.location)
  message: Message

}