import { Body, Controller, Req, Post, Delete, Get, Param, UseGuards, Patch } from '@nestjs/common';
import { CreateMemoryDto } from "./dto/create-memory.dto";
import { MemoryDto } from "./dto/memory.dto";
import { MemoriesService}  from "./memories.service";
import { UpdateMemoryDto } from "./dto/update-memory.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('memories')
export class MemoriesController {
    constructor(private readonly memoriesService: MemoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createMemoryDto: CreateMemoryDto, @Req() req): Promise<MemoryDto> {
        const userId = req.user.id;
        return await this.memoriesService.createMemory(createMemoryDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body() updateMemoryDto: UpdateMemoryDto, @Param('id') memoryId: number, @Req() req): Promise<MemoryDto> {
        const userId = req.user.id;
        return await this.memoriesService.updateMemory(updateMemoryDto, memoryId, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') memoryId: number, @Req() req): Promise<void> {
        const userId = req.user.id;
        await this.memoriesService.deleteMemory(memoryId, userId);
    }

    @Get()
    async getAllMemories(): Promise<MemoryDto[]> {
        return await this.memoriesService.getAllMemories();
    }

    @Get(':id')
    async getMemory(@Param('id') memoryId: number): Promise<MemoryDto> {
        return await this.memoriesService.getMemory(memoryId);
    }
}
