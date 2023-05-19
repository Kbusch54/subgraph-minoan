import { BigInt, bigInt } from "@graphprotocol/graph-ts"
import {
  ExecuteTransaction as ExecuteTransactionEvent,
  InsuranceFundMinChanged as InsuranceFundMinChangedEvent,
  MaxVotingPowerChanged as MaxVotingPowerChangedEvent,
  MinVotingPowerChanged as MinVotingPowerChangedEvent,
  ProposalMade as ProposalMadeEvent,
  VotesNeededPercentageChanged as VotesNeededPercentageChangedEvent,
  VotingTimeChanged as VotingTimeChangedEvent, TheseusDAO as TheseusDAOContract
} from "../generated/TheseusDAO/TheseusDAO"
import {
  AriadneDAO,PriceData,
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,StakeByPool,Stakes,TheseusDAO,TokenBalance,Trade,TradeBalance,User,VAmm
 } from "../generated/schema"

export function handleExecuteTransaction(event: ExecuteTransactionEvent): void {
  let proposalId = event.address.toString().concat('-').concat(event.params.nonce.toString())
  let proposal = Proposal.load(proposalId)
  if (proposal == null) {
    proposal = new Proposal(proposalId)
  }
  proposal.result = event.params.result
  proposal.executor = event.params.executor
  proposal.isPassed = true
  proposal.save()
}

export function handleInsuranceFundMinChanged(
  event: InsuranceFundMinChangedEvent
): void {
  let theseus = TheseusDAO.load(event.address)
  if (theseus == null) {
    theseus = new TheseusDAO(event.address)
  }
  theseus.insuranceFundMin = event.params.newInsuranceFundMin
  theseus.save()
}

export function handleMaxVotingPowerChanged(
  event: MaxVotingPowerChangedEvent
): void {
  let theseus = TheseusDAO.load(event.address)
  if (theseus == null) {
    theseus = new TheseusDAO(event.address)
  }
  theseus.maxVotingPower = event.params.newMaxVotingPower
  theseus.save()
}

export function handleMinVotingPowerChanged(
  event: MinVotingPowerChangedEvent
): void {
  let theseus = TheseusDAO.load(event.address)
  if (theseus == null) {
    theseus = new TheseusDAO(event.address)
  }
  theseus.minVotingPower = event.params.newMinVotingPower
  theseus.save()
}

export function handleProposalMade(event: ProposalMadeEvent): void {
  let id = event.address
  let theseus = TheseusDAO.load(id)
  if (theseus == null) {
    theseus = new TheseusDAO(id)
    theseus.currentId = BigInt.fromI32(0)
    let conract = TheseusDAOContract.bind(event.address)
    theseus.maxVotingPower = conract.maxVotingPower()
    theseus.votesNeededPercentage = conract.votesNeededPercentage()
    theseus.minVotingPower = conract.minVotingPower()
    theseus.votingTime = conract.votingTime()
    theseus.tokenId = BigInt.fromI32(0)
    theseus.insuranceFundMin = conract.insuranceFundMin()
    theseus.insuranceFund = BigInt.fromI32(0)
  }
  let proposeId = event.params.nonce
  let proposal = new Proposal(event.address.toString().concat('-').concat(proposeId.toString()))
  proposal.theseusDAO = event.address
  proposal.nonce = event.params.nonce
  proposal.proposer = event.params.proposer
  proposal.to = event.params.to
  proposal.transactionHash = event.params.transactionHash
  proposal.isPassed = false
  proposal.proposedAt = event.block.timestamp
  proposal.data = event.params.data
  proposal.value = BigInt.fromI32(0)

  theseus.currentId = event.params.nonce.plus(BigInt.fromI32(1))
  proposal.save()
  theseus.save()
}

export function handleVotesNeededPercentageChanged(
  event: VotesNeededPercentageChangedEvent
): void {
  let theseus = TheseusDAO.load(event.address)
  if (theseus == null) {
    theseus = new TheseusDAO(event.address)
  }
  theseus.votesNeededPercentage = event.params.newVotesNeededPercentage
  theseus.save()
}

export function handleVotingTimeChanged(event: VotingTimeChangedEvent): void {
  let theseus = TheseusDAO.load(event.address)
  if (theseus == null) {
    theseus = new TheseusDAO(event.address)
  }
  theseus.votingTime = event.params.newVotingTime
  theseus.save()
}
