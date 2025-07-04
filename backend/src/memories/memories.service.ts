import {ForbiddenException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { CreateMemoryDto } from "./dto/create-memory.dto";
import { Memory } from "./entity/memory.entity";
import { UsersService } from "../users/users.service";
import { Category } from "./entity/category.entity";
import { UpdateMemoryDto } from "./dto/update-memory.dto";
import { MemoryDto } from "./dto/memory.dto";

@Injectable()
export class MemoriesService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Memory) private readonly memoryRepository: Repository<Memory>,
        private readonly usersService: UsersService,
    ) {}
    private readonly logger = new Logger(MemoriesService.name, { timestamp: true });

    async createMemory(createMemoryDto: CreateMemoryDto, userId: number): Promise<MemoryDto> {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const memoryData: DeepPartial<Memory> = {...createMemoryDto, user};
        if (createMemoryDto.categoryId) {
            const category: Category | null = await this.categoryRepository.findOne({ where: {id: createMemoryDto.categoryId} });

            if (category) {
                memoryData.category = category;
            }
        }

        const memory = this.memoryRepository.create(memoryData);
        await this.memoryRepository.save(memory);

        this.logger.log('Creating new memory', createMemoryDto);
        return plainToInstance(MemoryDto, memory, {
            excludeExtraneousValues: true,
        });
    }

    async updateMemory(updateMemoryDto: UpdateMemoryDto, memoryId: number, userId: number): Promise<MemoryDto> {
        const memory: Memory | null = await this.memoryRepository.findOne({ where: {id: memoryId}, relations: ['user', 'category'] });
        if (!memory) {
            throw new NotFoundException("Memory not found");
        }

        if (memory.user.id !== userId) {
            throw new ForbiddenException("You don't have permission to update this memory");
        }

        if (updateMemoryDto.categoryId) {
            const category: Category | null = await this.categoryRepository.findOne({ where: {id: updateMemoryDto.categoryId} });

            if (category) {
                memory.category = category;
            }
        }

        const { categoryId, ...fieldsToUpdate } = updateMemoryDto;
        Object.assign(memory, fieldsToUpdate);
        await this.memoryRepository.save(memory);

        this.logger.log('Updating memory', updateMemoryDto);
        return plainToInstance(MemoryDto, memory, {
            excludeExtraneousValues: true,
        });
    }

    async deleteMemory(memoryId: number, userId: number): Promise<void> {
        const memory: Memory | null = await this.memoryRepository.findOne({ where: {id: memoryId}, relations: ['user'] });

        if (!memory) {
            throw new NotFoundException("Memory not found");
        }

        if (memory.user.id !== userId) {
            throw new ForbiddenException("You don't have permission to update this memory");
        }

        this.logger.log(`Deleting memory of id: ${memoryId}`);
        await this.memoryRepository.delete(memoryId);
    }

    async getAllMemories(): Promise<MemoryDto[]> {
        const memories: Memory[] = await this.memoryRepository.find({ relations: ['user', 'category'] });
        return plainToInstance(MemoryDto, memories, {
            excludeExtraneousValues: true,
        });
    }

    async getMemory(memoryId: number): Promise<MemoryDto> {
        const memory: Memory | null = await this.memoryRepository.findOne({ where: {id: memoryId}, relations: ['user', 'category'] });
        if (!memory) {
            throw new NotFoundException("Memory not found");
        }

        this.logger.log(`Getting memory of id: ${memoryId}`);
        return plainToInstance(MemoryDto, memory, {
            excludeExtraneousValues: true,
        });
    }

    async getMemoriesByUser(userId: number): Promise<MemoryDto[]> {
        const memories: Memory[] = await this.memoryRepository.find({ where: {user:{id: userId}}, relations: ['user', 'category'] });

        return memories.map(memory => plainToInstance(MemoryDto, memory, {
            excludeExtraneousValues: true,
        }));
    }
}
