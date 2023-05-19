import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ExecuteTransaction,
  InsuranceFundMinChanged,
  MaxVotingPowerChanged,
  MinVotingPowerChanged,
  ProposalMade,
  VotesNeededPercentageChanged,
  VotingTimeChanged
} from "../generated/TheseusDAO/TheseusDAO"

export function createExecuteTransactionEvent(
  executor: Address,
  nonce: BigInt,
  result: Bytes
): ExecuteTransaction {
  let executeTransactionEvent = changetype<ExecuteTransaction>(newMockEvent())

  executeTransactionEvent.parameters = new Array()

  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBytes(result))
  )

  return executeTransactionEvent
}

export function createInsuranceFundMinChangedEvent(
  newInsuranceFundMin: BigInt
): InsuranceFundMinChanged {
  let insuranceFundMinChangedEvent = changetype<InsuranceFundMinChanged>(
    newMockEvent()
  )

  insuranceFundMinChangedEvent.parameters = new Array()

  insuranceFundMinChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newInsuranceFundMin",
      ethereum.Value.fromUnsignedBigInt(newInsuranceFundMin)
    )
  )

  return insuranceFundMinChangedEvent
}

export function createMaxVotingPowerChangedEvent(
  newMaxVotingPower: BigInt
): MaxVotingPowerChanged {
  let maxVotingPowerChangedEvent = changetype<MaxVotingPowerChanged>(
    newMockEvent()
  )

  maxVotingPowerChangedEvent.parameters = new Array()

  maxVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newMaxVotingPower",
      ethereum.Value.fromUnsignedBigInt(newMaxVotingPower)
    )
  )

  return maxVotingPowerChangedEvent
}

export function createMinVotingPowerChangedEvent(
  newMinVotingPower: BigInt
): MinVotingPowerChanged {
  let minVotingPowerChangedEvent = changetype<MinVotingPowerChanged>(
    newMockEvent()
  )

  minVotingPowerChangedEvent.parameters = new Array()

  minVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newMinVotingPower",
      ethereum.Value.fromUnsignedBigInt(newMinVotingPower)
    )
  )

  return minVotingPowerChangedEvent
}

export function createProposalMadeEvent(
  proposer: Address,
  to: Address,
  data: Bytes,
  nonce: BigInt,
  transactionHash: Bytes,
  timeStamp: BigInt
): ProposalMade {
  let proposalMadeEvent = changetype<ProposalMade>(newMockEvent())

  proposalMadeEvent.parameters = new Array()

  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam(
      "transactionHash",
      ethereum.Value.fromFixedBytes(transactionHash)
    )
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam(
      "timeStamp",
      ethereum.Value.fromUnsignedBigInt(timeStamp)
    )
  )

  return proposalMadeEvent
}

export function createVotesNeededPercentageChangedEvent(
  newVotesNeededPercentage: BigInt
): VotesNeededPercentageChanged {
  let votesNeededPercentageChangedEvent = changetype<
    VotesNeededPercentageChanged
  >(newMockEvent())

  votesNeededPercentageChangedEvent.parameters = new Array()

  votesNeededPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newVotesNeededPercentage",
      ethereum.Value.fromUnsignedBigInt(newVotesNeededPercentage)
    )
  )

  return votesNeededPercentageChangedEvent
}

export function createVotingTimeChangedEvent(
  newVotingTime: BigInt
): VotingTimeChanged {
  let votingTimeChangedEvent = changetype<VotingTimeChanged>(newMockEvent())

  votingTimeChangedEvent.parameters = new Array()

  votingTimeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newVotingTime",
      ethereum.Value.fromUnsignedBigInt(newVotingTime)
    )
  )

  return votingTimeChangedEvent
}
