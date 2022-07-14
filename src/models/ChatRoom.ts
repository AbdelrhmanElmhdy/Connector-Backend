import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from './Message';

@Entity()
export default class ChatRoom {
	@PrimaryColumn()
	id: string;

	@Column("text", { array: true })
	participantsIDs: string[];

	@OneToMany(type => Message, message => message.chatRoom)
	messages: Message[];

	@Column({ nullable: true })
	groupChatImageUrl: string;
}
