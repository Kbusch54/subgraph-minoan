import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ExecuteTransaction,
  ProposalMade
} from "../generated/Contract/Contract"

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
