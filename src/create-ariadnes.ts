import { BigInt, bigDecimal, bigInt } from "@graphprotocol/graph-ts"
import {
  AriadneCreated as AriadneCreatedEvent,
  AriadneMaxVotingPowerChanged as AriadneMaxVotingPowerChangedEvent,
  AriadneMinVotingPowerChanged as AriadneMinVotingPowerChangedEvent,
  AriadneVotesNeededPercentageChanged as AriadneVotesNeededPercentageChangedEvent,
  AriadneVotingTimeChanged as AriadneVotingTimeChangedEvent,
  CreateAriadnes,
  ExecutedTransaction as ExecutedTransactionEvent,
  ProposalMade as ProposalMadeEvent
} from "../generated/CreateAriadnes/CreateAriadnes"
import {
  AriadneDAO,PriceData,
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,StakeByPool,Stakes,TheseusDAO,TokenBalance,Trade,TradeBalance,User,VAmm
 } from "../generated/schema"

export function handleAriadneCreated(event: AriadneCreatedEvent): void {
  let entity = new AriadneDAO(event.params.contractAddress)
  entity.ammPool = event.params.ammAddress
  entity.currentId = BigInt.zero()
  entity.ammPool = event.params.ammAddress


  //calling conteract for variables
  let contract = CreateAriadnes.bind(event.address)
  entity.maxVotingPower = contract.maxVotingPower()
  entity.votesNeededPercentage = contract.votesNeededPercentage()
  entity.minVotingPower = contract.minVotingPower()
  entity.votingTime = contract.votingTime()
  entity.tokenId = contract.numberOfAriadnes()
  entity.save()
}

export function handleAriadneMaxVotingPowerChanged(
  event: AriadneMaxVotingPowerChangedEvent
): void {
  let id = event.params.ariadneDAO
  let entity = AriadneDAO.load(id)
  if (entity == null) {
    entity = new AriadneDAO(id)
  }
  entity.maxVotingPower = event.params.maxVotingPower

  entity.save()
}

export function handleAriadneMinVotingPowerChanged(
  event: AriadneMinVotingPowerChangedEvent
): void {
 
  let id = event.params.ariadneDAO
  let entity = AriadneDAO.load(id)
  if (entity == null) {
    entity = new AriadneDAO(id)
  }
  entity.minVotingPower = event.params.minVotingPower

  
  entity.save()
}

export function handleAriadneVotesNeededPercentageChanged(
  event: AriadneVotesNeededPercentageChangedEvent
): void {
  let id = event.params.ariadneDAO
  let entity = AriadneDAO.load(id)
  if (entity == null) {
    entity = new AriadneDAO(id)
  }
  entity.votesNeededPercentage = event.params.votesNeededPercentage

  entity.save()
}

export function handleAriadneVotingTimeChanged(
  event: AriadneVotingTimeChangedEvent
): void {
  let id = event.params.ariadneDAO
  let entity = AriadneDAO.load(id)
  if (entity == null) {
    entity = new AriadneDAO(id)
  }
  entity.votingTime = event.params.votingTime

  entity.save()
}

export function handleExecutedTransaction(
  event: ExecutedTransactionEvent
): void {
  let id = event.params.ariadneDAO
  let entity = AriadneDAO.load(id)
  if (entity == null) {
    entity = new AriadneDAO(id)
  }


  entity.save()
}

export function handleProposalMade(event: ProposalMadeEvent): void {
  let id = event.params.ariadneDAO
  let ariadne = AriadneDAO.load(id)
  if (ariadne == null) {
    ariadne = new AriadneDAO(id)
  }
  let proposeId = event.params.nonce
  let proposal = new Proposal(event.params.ariadneDAO.toString().concat('-').concat(proposeId.toString()))
  proposal.dAO = event.params.ariadneDAO
  proposal.nonce = event.params.nonce
  proposal.proposer = event.params.proposer
  proposal.to = event.params.to
  proposal.transactionHash = event.params.transactionHash
  proposal.isPassed = false
  proposal.proposedAt = event.block.timestamp
  proposal.data = event.params.data

  ariadne.currentId = event.params.nonce.plus(BigInt.fromI32(1))
  proposal.save()
  ariadne.save()
}
