import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"
import { Message } from "./Message"

@Entity()
export default class Contact {

  @Column()
  name: string

  @PrimaryColumn()
  phoneNumber: string

  @Column()
  email: string

  @OneToOne((type) => Message, (message) => message.contact)
  message: Message
}