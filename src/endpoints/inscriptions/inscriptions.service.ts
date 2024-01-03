import {HttpException, Injectable, Logger} from '@nestjs/common'
import {Repository} from 'typeorm'
import {Inscription} from './entities/inscription.entity'
import {InjectRepository} from '@nestjs/typeorm'
import {LoggerInitializer} from '@multiversx/sdk-nestjs-common'
import {InscriptionDTO} from './dto/inscription.dto'
import {ApiConfigService} from 'src/common/api-config/api.config.service'
import axios from 'axios'
@Injectable()
export class InscriptionsService {
  private logger = new Logger(InscriptionsService.name)
  constructor(
    @InjectRepository(Inscription)
    private readonly inscriptionRepository: Repository<Inscription>,
    private readonly apiCofigService: ApiConfigService
  ) {
    LoggerInitializer.initialize(this.logger)
  }

  async create(inscriptionDto: InscriptionDTO): Promise<Inscription> {
    const inscription = this.inscriptionRepository.create(inscriptionDto)
    return this.inscriptionRepository.save(inscription)
  }

  async findAll(): Promise<Inscription[]> {
    return this.inscriptionRepository.find()
  }

  async findOneByHash(hash: string): Promise<Inscription> {
    return this.inscriptionRepository.findOne({where: {hash}})
  }

  async findByOwner(owner: string): Promise<Inscription[]> {
    return this.inscriptionRepository.find({where: {owner}})
  }

  async findByCreator(creator: string): Promise<Inscription[]> {
    return this.inscriptionRepository.find({where: {creator}})
  }

  async processInscription(txHash: string): Promise<Inscription> {
    this.logger.log(`Processing inscription with txHash: ${txHash}`)
    const response = await axios.get(
      this.apiCofigService.getApiUrl() + '/transactions/' + txHash
    )

    const base64String = response.data.data // Replace this with your actual base64-encoded string

    // Convert base64 to string
    const decodedString = Buffer.from(base64String, 'base64').toString('utf-8')

    const parsedData = decodedString.split('@')

    if (parsedData[0] !== 'inscribe') {
      this.logger.warn('Invalid inscription payload')
      throw new HttpException('Invalid inscription payload', 400)
    }

    const inscriptionExists = await this.findOneByHash(parsedData[2])

    if (inscriptionExists) {
      this.logger.warn('Inscription already exists')
      throw new HttpException('Inscription already exists', 400)
    }

    if (response.data.receiver == response.data.sender) {
      const inscriptionDto: InscriptionDTO = {
        payload: parsedData[1],
        txHash: txHash,
        hash: parsedData[2],
        signature: parsedData[3],
        creator: response.data.sender,
        owner: response.data.sender,
        timestamp: response.data.timestamp,
      }

      const inscription = await this.create(inscriptionDto)

      this.logger.log(
        'Inscription processed successfully with hash: ' + inscription.hash
      )

      return inscription
    }
  }
}
