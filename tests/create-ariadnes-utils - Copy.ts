import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  AriadneCreated,
  AriadneMaxVotingPowerChanged,
  AriadneMinVotingPowerChanged,
  AriadneVotesNeededPercentageChanged,
  AriadneVotingTimeChanged,
  ExecutedTransaction,
  ProposalMade
} from "../generated/CreateAriadnes/CreateAriadnes"

export function createAriadneCreatedEvent(
  contractId: BigInt,
  name: string,
  contractAddress: Address,
  ammAddress: Address,
  tokenId: BigInt
): AriadneCreated {
  let ariadneCreatedEvent = changetype<AriadneCreated>(newMockEvent())

  ariadneCreatedEvent.parameters = new Array()

  ariadneCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractId",
      ethereum.Value.fromUnsignedBigInt(contractId)
    )
  )
  ariadneCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  ariadneCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contractAddress",
      ethereum.Value.fromAddress(contractAddress)
    )
  )
  ariadneCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ammAddress",
      ethereum.Value.fromAddress(ammAddress)
    )
  )
  ariadneCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return ariadneCreatedEvent
}

export function createAriadneMaxVotingPowerChangedEvent(
  ariadneDAO: Address,
  maxVotingPower: BigInt
): AriadneMaxVotingPowerChanged {
  let ariadneMaxVotingPowerChangedEvent = changetype<
    AriadneMaxVotingPowerChanged
  >(newMockEvent())

  ariadneMaxVotingPowerChangedEvent.parameters = new Array()

  ariadneMaxVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
  ariadneMaxVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "maxVotingPower",
      ethereum.Value.fromUnsignedBigInt(maxVotingPower)
    )
  )

  return ariadneMaxVotingPowerChangedEvent
}

export function createAriadneMinVotingPowerChangedEvent(
  ariadneDAO: Address,
  minVotingPower: BigInt
): AriadneMinVotingPowerChanged {
  let ariadneMinVotingPowerChangedEvent = changetype<
    AriadneMinVotingPowerChanged
  >(newMockEvent())

  ariadneMinVotingPowerChangedEvent.parameters = new Array()

  ariadneMinVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
  ariadneMinVotingPowerChangedEvent.parameters.push(
    new ethereum.EventParam(
      "minVotingPower",
      ethereum.Value.fromUnsignedBigInt(minVotingPower)
    )
  )

  return ariadneMinVotingPowerChangedEvent
}

export function createAriadneVotesNeededPercentageChangedEvent(
  ariadneDAO: Address,
  votesNeededPercentage: BigInt
): AriadneVotesNeededPercentageChanged {
  let ariadneVotesNeededPercentageChangedEvent = changetype<
    AriadneVotesNeededPercentageChanged
  >(newMockEvent())

  ariadneVotesNeededPercentageChangedEvent.parameters = new Array()

  ariadneVotesNeededPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
  ariadneVotesNeededPercentageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "votesNeededPercentage",
      ethereum.Value.fromUnsignedBigInt(votesNeededPercentage)
    )
  )

  return ariadneVotesNeededPercentageChangedEvent
}

export function createAriadneVotingTimeChangedEvent(
  ariadneDAO: Address,
  votingTime: BigInt
): AriadneVotingTimeChanged {
  let ariadneVotingTimeChangedEvent = changetype<AriadneVotingTimeChanged>(
    newMockEvent()
  )

  ariadneVotingTimeChangedEvent.parameters = new Array()

  ariadneVotingTimeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
  ariadneVotingTimeChangedEvent.parameters.push(
    new ethereum.EventParam(
      "votingTime",
      ethereum.Value.fromUnsignedBigInt(votingTime)
    )
  )

  return ariadneVotingTimeChangedEvent
}

export function createExecutedTransactionEvent(
  ariadneDAO: Address,
  executor: Address,
  nonce: BigInt,
  result: Bytes
): ExecutedTransaction {
  let executedTransactionEvent = changetype<ExecutedTransaction>(newMockEvent())

  executedTransactionEvent.parameters = new Array()

  executedTransactionEvent.parameters.push(
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
  executedTransactionEvent.parameters.push(
    new ethereum.EventParam("executor", ethereum.Value.fromAddress(executor))
  )
  executedTransactionEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  executedTransactionEvent.parameters.push(
    new ethereum.EventParam("result", ethereum.Value.fromBytes(result))
  )

  return executedTransactionEvent
}

export function createProposalMadeEvent(
  ariadneDAO: Address,
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
    new ethereum.EventParam(
      "ariadneDAO",
      ethereum.Value.fromAddress(ariadneDAO)
    )
  )
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
