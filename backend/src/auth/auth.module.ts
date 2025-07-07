import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { VerificationCode } from "./entity/verification-code.entity";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      ConfigModule,
      MailModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string>('SECRET_EXPIRES') },
        })
      }),
      TypeOrmModule.forFeature([VerificationCode]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
