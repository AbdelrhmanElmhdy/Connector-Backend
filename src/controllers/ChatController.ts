import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
// import { OpenAPI } from 'routing-controllers-openapi';

// @Authorized()
@JsonController('/users')
// @OpenAPI({ security: [{ basicAuth: [] }] })
@Controller()
export class ChatController {
  @Get('/chat')
  getAll() {
    return 'This action returns all users';
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
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