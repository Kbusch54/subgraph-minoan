import {
  ExecuteTransaction as ExecuteTransactionEvent,
  ProposalMade as ProposalMadeEvent
} from "../generated/TheseusDAO/TheseusDAO"
import { ExecuteTransaction, ProposalMade } from "../generated/schema"

export function handleExecuteTransaction(event: ExecuteTransactionEvent): void {
  let entity = new ExecuteTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.executor = event.params.executor
  entity.nonce = event.params.nonce
  entity.result = event.params.result

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalMade(event: ProposalMadeEvent): void {
  let entity = new ProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.proposer = event.params.proposer
  entity.to = event.params.to
  entity.data = event.params.data
  entity.nonce = event.params.nonce
  entity.transactionHash = event.params.transactionHash
  entity.timeStamp = event.params.timeStamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
