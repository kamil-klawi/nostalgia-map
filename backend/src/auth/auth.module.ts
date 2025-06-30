import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService} from "@nestjs/config";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      ConfigModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.get<string>('SECRET_EXPIRES') },
        })
      })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
