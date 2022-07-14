import { Column, Entity, OneToOne, ManyToOne, PrimaryColumn } from 'typeorm';
import ChatRoom from './ChatRoom';
import Contact from './Contact';
import Location from './Location';

@Entity()
export class Message {
	// Meta Data
	@PrimaryColumn()
	id: string;

	@Column()
	senderId: string;

	@Column()
	roomId: string;

	@ManyToOne(type => ChatRoom, chatRoom => chatRoom.messages)
	chatRoom: ChatRoom;

	@Column('double precision', { nullable: true })
	sentDateUnixTimeStamp: number;

	@Column('double precision', { nullable: true })
	receiptDateUnixTimeStamp: number;

	@Column({ nullable: true })
	repliedAtMessageId: string;

	@Column()
	type: number;

	// Message Data
	@Column('text', { nullable: true })
	text: string;

	@Column({ nullable: true })
	mediaOrFileURL: string;

	@OneToOne(type => Location, location => location.message, { nullable: true })
	location: Location;

	@OneToOne(type => Contact, contact => contact.message, { nullable: true })
	contact: Contact;

	@Column({ nullable: true })
	interactionType: number;
}
