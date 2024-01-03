import {Module} from '@nestjs/common'
import {DatabaseModule} from 'src/common/database/database.module'
import {InscriptionsService} from './inscriptions.service'
import {ApiConfigModule} from 'src/common/api-config/api.config.module'

@Module({
  imports: [DatabaseModule, ApiConfigModule],
  providers: [InscriptionsService],
  exports: [InscriptionsService],
})
export class InscriptionsModule {}
