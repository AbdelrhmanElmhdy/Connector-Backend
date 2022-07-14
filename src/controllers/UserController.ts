import { Response } from 'express';
import {
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete,
	Res,
	Controller,
	QueryParam,
} from 'routing-controllers';
import { stripUserFromPrivateInformation } from '../utilities/UserUtilities';
import { retrieveUsersWithUsernameCloseTo } from '../storage/DatabaseUtils';
// import { OpenAPI } from 'routing-controllers-openapi';

// @Authorized()
@Controller()
export class UserController {
	@Get('/users/')
	async getUsers(@QueryParam('username') username: string, @Res() response: Response) {
		const users = (await retrieveUsersWithUsernameCloseTo(username)).map(user =>
			stripUserFromPrivateInformation(user)
		);
		return response.status(201).json(users);
	}

	@Post('/users')
	post(@Body() user: any) {
		return 'Saving user...';
	}

	@Put('/users/:id')
	put(@Param('id') id: number, @Body() user: any) {
		return 'Updating a user...';
	}

	@Delete('/users/:id')
	remove(@Param('id') id: number) {
		return 'Removing user...';
	}
}
