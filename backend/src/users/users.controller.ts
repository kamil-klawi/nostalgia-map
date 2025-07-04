import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MemoryDto } from "../memories/dto/memory.dto";
import { MemoriesService } from "../memories/memories.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly memoriesService: MemoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':userId/memories')
    async getUserMemories(@Param('userId') userId: number): Promise<MemoryDto[]> {
        return await this.memoriesService.getMemoriesByUser(userId);
    }
}
