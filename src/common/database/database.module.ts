import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ApiConfigModule} from '../api-config/api.config.module'
import {ApiConfigService} from '../api-config/api.config.service'
import {Inscription} from 'src/endpoints/inscriptions/entities/inscription.entity'
import {Type} from 'js-yaml'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST, // Access environment variables
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Inscription], // Add the Tag entity here
        keepConnectionAlive: true,
        synchronize: true,
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([Inscription]),
  ],
  exports: [
    // Add the Tag entity here as well
    TypeOrmModule.forFeature([Inscription]),
  ],
})
export class DatabaseModule {}
