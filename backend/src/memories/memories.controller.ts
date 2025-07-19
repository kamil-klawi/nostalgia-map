import {
  Body,
  Controller,
  Req,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { MemoryDto } from './dto/memory.dto';
import { MemoriesService } from './memories.service';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetMemoriesFilterDto } from './dto/get-memories-filter.dto';

@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createMemoryDto: CreateMemoryDto,
    @Req() req,
  ): Promise<MemoryDto> {
    const userId = req.user.id;
    return await this.memoriesService.createMemory(createMemoryDto, userId);
  }

  @Get('filter')
  async getFilteredMemories(
    @Query() filterDto: GetMemoriesFilterDto,
  ): Promise<MemoryDto[]> {
    return await this.memoriesService.getFilteredMemories(filterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('liked')
  async getLikedMemories(@Req() req): Promise<number[]> {
    const user = req.user;
    return await this.memoriesService.getLikedMemoryIds(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Body() updateMemoryDto: UpdateMemoryDto,
    @Param('id') memoryId: number,
    @Req() req,
  ): Promise<MemoryDto> {
    const userId = req.user.id;
    return await this.memoriesService.updateMemory(
      updateMemoryDto,
      memoryId,
      userId,
    );
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

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async likeMemory(@Param('id') memoryId: number, @Req() req): Promise<void> {
    const user = req.user;
    return await this.memoriesService.likeMemory(memoryId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  async unlikeMemory(@Param('id') memoryId: number, @Req() req): Promise<void> {
    const userId = req.user.id;
    return await this.memoriesService.unlikeMemory(memoryId, userId);
  }
}
