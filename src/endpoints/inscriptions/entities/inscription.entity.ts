import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class Inscription {
  @PrimaryColumn({unique: true})
  hash: string
  @Column()
  owner: string
  @Column()
  txHash: string
  @Column()
  payload: string
  @Column()
  creator: string
  @Column()
  timestamp: number
  @Column()
  signature: string
}
