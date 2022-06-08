import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Roles } from './../common/decorators';
import { Role } from './../enums';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @Roles(Role.User, Role.Admin)
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get('/:id')
  @Roles(Role.User, Role.Admin)
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  @Patch('/:id')
  @Roles(Role.User, Role.Admin)
  async updateOne(@Param('id') id: string, @Body() data: any) {
    return await this.usersService.updateOne(id, data);
  }

  @Delete('/:id')
  @Roles(Role.Admin)
  async deleteOne(@Param('id') id: string) {
    return await this.usersService.deleteOne(id);
  }
}
