import {Column, Entity, PrimaryColumn} from 'typeorm'

@Entity()
export class Inscription {
  @PrimaryColumn({unique: true})
  hash: string
  @Column()
  owner: string
  @Column()
  txHash: string
  @Column({length: 10000})
  payload: string
  @Column()
  creator: string
  @Column()
  timestamp: number
  @Column()
  signature: string
}
