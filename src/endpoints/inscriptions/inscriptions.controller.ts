import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common'
import {ApiBody, ApiTags} from '@nestjs/swagger'
import {InscriptionsService} from './inscriptions.service'
import {NativeAuthGuard} from '@multiversx/sdk-nestjs-auth'

@Controller()
export class InscriptionsController {
  constructor(private readonly inscriptionService: InscriptionsService) {}

  @UseGuards(NativeAuthGuard)
  @Get('/inscriptions/:hash')
  async getInscription(@Query('hash') hash: string) {
    return this.inscriptionService.findOneByHash(hash)
  }

  @UseGuards(NativeAuthGuard)
  @Get('/:address/inscriptions')
  async getInscriptionsByOwner(@Query('address') address: string) {
    return this.inscriptionService.findByOwner(address)
  }

  @UseGuards(NativeAuthGuard)
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
