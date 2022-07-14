import User from '../models/User';
import { AppDataSource } from '../app';
import { Message } from '../models/Message';

// Helper Functions
export const saveUser = async (user: User) => {
	const userRepository = AppDataSource.getRepository(User);
	userRepository.save(user);
};

export const retrieveUserBy = async (condition: any): Promise<User> => {
	const userRepository = AppDataSource.getRepository(User);
	return await userRepository.findOneBy(condition);
};

export const retrieveUserById = async (id: string): Promise<User> =>
	retrieveUserBy({ id });

export const retrieveUserByEmail = async (email: string): Promise<User> =>
	retrieveUserBy({ email });

export const retrieveUserByUsername = async (username: string): Promise<User> =>
	retrieveUserBy({ username });

export const retrieveUsersWithUsernameCloseTo = async (
	username: string
): Promise<User[]> => {
	const userRepository = AppDataSource.getRepository(User);
	let users = userRepository
		.createQueryBuilder()
		.select()
		.where('username ILIKE :searchQuery', { searchQuery: `%${username}%` })
		.take(10)
		.getMany();
	return users;
};

export const isEmailInUse = async (email: string): Promise<Boolean> => {
	let user = await retrieveUserByEmail(email);
	return user ? true : false;
};

export const isUsernameInUse = async (username: string): Promise<Boolean> => {
	let user = await retrieveUserByUsername(username);
	return user ? true : false;
};

export const saveMessage = async (message: Message) => {
	const messageRepository = AppDataSource.getRepository(Message);
	messageRepository.save(message);
};

export const retrieveRoomMessages = async (roomId: string): Promise<Message[]> => {
	const messageRepository = AppDataSource.getRepository(Message);
	let messages = await messageRepository.findBy({ roomId });
	return messages;
};
