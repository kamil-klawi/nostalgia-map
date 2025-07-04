import {Body, Controller, Delete, Get, Param, Patch, Req, UseGuards} from '@nestjs/common';
import { MemoryDto } from "../memories/dto/memory.dto";
import { MemoriesService } from "../memories/memories.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly memoriesService: MemoriesService,
        private readonly usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':userId/memories')
    async getUserMemories(@Param('userId') userId: number): Promise<MemoryDto[]> {
        return await this.memoriesService.getMemoriesByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':userId')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('userId') userId: number, @Req() req): Promise<UserDto> {
        const requestId = req.user.id;
        return await this.usersService.update(updateUserDto, userId, requestId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: number, @Req() req): Promise<void> {
        const requestId = req.user.id;
        await this.usersService.delete(requestId, userId);
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: number): Promise<UserDto> {
        return await this.usersService.getUser(userId);
    }
}
