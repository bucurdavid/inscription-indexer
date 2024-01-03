import {Body, Controller, Get, Post, Query} from '@nestjs/common'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {InscriptionsService} from './inscriptions.service'

@Controller()
export class InscriptionsController {
  constructor(private readonly inscriptionService: InscriptionsService) {}

  @Get('/inscriptions/:hash')
  async getInscription(@Query('hash') hash: string) {
    return this.inscriptionService.findOneByHash(hash)
  }

  @Get('/:address/inscriptions')
  async getInscriptionsByOwner(@Query('address') address: string) {
    return this.inscriptionService.findByOwner(address)
  }

  @Post('/process')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        txHash: {
          type: 'string',
        },
      },
    },
  })
  async processInscription(@Body('txHash') txHash: string) {
    return this.inscriptionService.processInscription(txHash)
  }
}
