import { IsEmail, IsJWT, IsUrl } from 'class-validator';
import DatabaseTypes from '../storage/DatabaseTypes';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export default class User {
	@PrimaryColumn()
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Index({ fulltext: true })
	@Column()
	username: string;

	@IsEmail()
	@Column()
	email: string;

	@Column(DatabaseTypes.uuid, { array: true })
	chatRoomIds: String[];

	@IsUrl()
	@Column({ nullable: true })
	imageUrl: string;

	@IsUrl()
	@Column({ nullable: true })
	thumbnailImageUrl: string;

	@Column()
	encryptedPassword: string

	@IsJWT()
	@Column()
	accessToken: string

	constructor(
		id: string,
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		chatRoomIds: string[],
		imageUrl: string,
		thumbnailImageUrl: string,
		encryptedPassword: string = "",
		accessToken: string = ""
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.email = email;
		this.chatRoomIds = chatRoomIds;
		this.imageUrl = imageUrl;
		this.thumbnailImageUrl = thumbnailImageUrl;
		this.encryptedPassword = encryptedPassword
		this.accessToken = accessToken
	}
}
