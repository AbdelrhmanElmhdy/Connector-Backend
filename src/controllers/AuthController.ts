import { Body, Res, Post, JsonController } from 'routing-controllers';
import User from '../models/User';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcrypt';
import {
	isEmailInUse,
	isUsernameInUse,
	retrieveUserByUsername,
	saveUser,
} from '../storage/DatabaseUtils';
import { isEmail } from 'class-validator';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { stripUserFromPrivateInformation } from '../utilities/UserUtilities';

@JsonController()
export class AuthController {
	@Post('/signup')
	async signup(@Body() request: SignupRequestModel, @Res() response: Response) {
		try {
			// Get user input
			const { firstName, lastName, username, email, password } = request;

			// Validate user input
			if (!(email && password && firstName && lastName))
				return response.status(400).send('All input is required');
			if (!isEmail(email)) return response.status(400).send('Invalid email');

			// check if username or email already exist
			const [isEmailAlreadyInUse, isUsernameAlreadyInUse] = await Promise.all([
				isEmailInUse(email),
				isUsernameInUse(username),
			]);

			if (isEmailAlreadyInUse) {
				return response.status(409).send('Email already in use.');
			}
			if (isUsernameAlreadyInUse) {
				return response
					.status(409)
					.send('Username is taken. Please try a different username.');
			}

			const { user, accessToken } = await this.createNewUser(
				firstName,
				lastName,
				username,
				email,
				password
			);

			return response.status(201).json({
				accessToken,
				user: stripUserFromPrivateInformation(user),
			});
		} catch (err) {
			console.log(err);
			return response.status(500).send(err);
		}
	}

	private async createNewUser(
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) {
		//Encrypt user password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = new User(
			UUID(),
			firstName,
			lastName,
			username,
			email,
			[],
			null,
			null,
			encryptedPassword
		);

		// Create access token
		const accessToken = this.createAccessToken(user);

		user.accessToken = accessToken;

		saveUser(user);
		return { accessToken, user };
	}

	private createAccessToken(user: User) {
		return jwt.sign(
			{ user_id: user.id, email: user.email, username: user.username },
			'secret',
			{
				expiresIn: '2y',
			}
		);
	}

	@Post('/login')
	async login(@Body() requestBody: LoginRequestModel, @Res() response: any) {
		const { username, password } = requestBody;

		const user = await retrieveUserByUsername(username);

		if (!user) {
			return response.status(400).send('Invalid Username');
		}

		const passwordIsCorrect = await bcrypt.compare(password, user.encryptedPassword);

		if (!passwordIsCorrect) {
			return response.status(400).send('Invalid Password');
		}

		// Create and store a new access token.
		const accessToken = this.createAccessToken(user);
		user.accessToken = accessToken;
		saveUser(user);

		return response
			.status(201)
			.json({
				accessToken,
				user: stripUserFromPrivateInformation(user),
			});
	}
}
