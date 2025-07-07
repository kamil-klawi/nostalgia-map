import {ConflictException, ForbiddenException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";
import { User } from "./entity/user.entity";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
    private readonly logger = new Logger(UsersService.name, { timestamp: true });

    async create(createUserDto: CreateUserDto): Promise<UserDto> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existingUser) {
            throw new ConflictException("User already exists");
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        await this.usersRepository.save(user);
        return plainToInstance(UserDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async update(updateUserDto: UpdateUserDto, userId: number, requestId: number): Promise<UserDto> {
        const user: User | null = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (+requestId !== +userId) {
            throw new ForbiddenException("You don't have permission");
        }

        Object.assign(user, updateUserDto);
        await this.usersRepository.save(user);

        this.logger.log(`Updating user of id: ${userId}`);
        return plainToInstance(UserDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async delete(requestId: number, userId: number): Promise<void> {
        if (+requestId !== +userId) {
            throw new ForbiddenException("You don't have permission");
        }

        this.logger.log(`Deleting user of id: ${userId}`);
        await this.usersRepository.delete(userId);
    }

    async getUser(userId: number): Promise<UserDto> {
        const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['memories', 'memories.user', 'memories.category', 'memories.reactions'] });
        if (!user) {
            throw new NotFoundException("User not found");
        }

        this.logger.log(`Getting user of id: ${userId}`);
        return plainToInstance(UserDto, user, {
            excludeExtraneousValues: true,
        });
    }

    async save(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
}
