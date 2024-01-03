import {Module} from '@nestjs/common'
import {DynamicModuleUtils} from 'src/utils/dynamic.module.utils'
import {HealthModule} from './health-check/health-check.module'
import {InscriptionsModule} from './inscriptions/inscriptions.module'

@Module({
  imports: [
    DynamicModuleUtils.getCachingModule(),
    HealthModule,
    InscriptionsModule,
  ],
  exports: [HealthModule, InscriptionsModule],
})
export class EndpointsServicesModule {}
