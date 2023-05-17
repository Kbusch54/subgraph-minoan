import {
  AriadneCreated as AriadneCreatedEvent,
  AriadneMaxVotingPowerChanged as AriadneMaxVotingPowerChangedEvent,
  AriadneMinVotingPowerChanged as AriadneMinVotingPowerChangedEvent,
  AriadneVotesNeededPercentageChanged as AriadneVotesNeededPercentageChangedEvent,
  AriadneVotingTimeChanged as AriadneVotingTimeChangedEvent,
  ExecutedTransaction as ExecutedTransactionEvent,
  ProposalMade as ProposalMadeEvent
} from "../generated/CreateAriadnes/CreateAriadnes"
import {
  AriadneCreated,
  AriadneMaxVotingPowerChanged,
  AriadneMinVotingPowerChanged,
  AriadneVotesNeededPercentageChanged,
  AriadneVotingTimeChanged,
  ExecutedTransaction,
  ProposalMade
} from "../generated/schema"

export function handleAriadneCreated(event: AriadneCreatedEvent): void {
  let entity = new AriadneCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contractId = event.params.contractId
  entity.name = event.params.name
  entity.contractAddress = event.params.contractAddress
  entity.ammAddress = event.params.ammAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAriadneMaxVotingPowerChanged(
  event: AriadneMaxVotingPowerChangedEvent
): void {
  let entity = new AriadneMaxVotingPowerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ariadneDAO = event.params.ariadneDAO
  entity.maxVotingPower = event.params.maxVotingPower

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAriadneMinVotingPowerChanged(
  event: AriadneMinVotingPowerChangedEvent
): void {
  let entity = new AriadneMinVotingPowerChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ariadneDAO = event.params.ariadneDAO
  entity.minVotingPower = event.params.minVotingPower

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAriadneVotesNeededPercentageChanged(
  event: AriadneVotesNeededPercentageChangedEvent
): void {
  let entity = new AriadneVotesNeededPercentageChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ariadneDAO = event.params.ariadneDAO
  entity.votesNeededPercentage = event.params.votesNeededPercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAriadneVotingTimeChanged(
  event: AriadneVotingTimeChangedEvent
): void {
  let entity = new AriadneVotingTimeChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ariadneDAO = event.params.ariadneDAO
  entity.votingTime = event.params.votingTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecutedTransaction(
  event: ExecutedTransactionEvent
): void {
  let entity = new ExecutedTransaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ariadneDAO = event.params.ariadneDAO
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
  entity.ariadneDAO = event.params.ariadneDAO
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
