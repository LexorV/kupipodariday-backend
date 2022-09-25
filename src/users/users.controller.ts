import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../autch/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get('find')
  async findUser(@Body() userData: any) {
    return await this.usersService
      .findByUsername(userData.query)
      .then((user) => {
        const { password, ...res } = user;
        return res;
      });
  }
  @UseGuards(JwtGuard)
  @Get('me')
  async userData(@Req() req) {
    const { password, ...res } = await this.usersService.findOne(req.user.id);
    return res;
  }
  @UseGuards(JwtGuard)
  @Patch('me')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  userWish(@Req() req) {
    return this.usersService.findUserWishes(req.user.id);
  }
  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async curentUserWish(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    return this.usersService.findUserWishes(user.id);
  }

  /*
  @UseGuards(JwtGuard)
  @Get('me/wishes')
    return this.usersService.findOne(+id);
  }*/
  @Get(':username')
  curentUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeOne(+id);
  }
}
