import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddTokenToPool,
  FrozenStake,
  Stake,
  UnFrozenStake,
  Unstake
} from "../generated/Staking/Staking"

export function createAddTokenToPoolEvent(
  ammPool: Address,
  tokenId: BigInt
): AddTokenToPool {
  let addTokenToPoolEvent = changetype<AddTokenToPool>(newMockEvent())

  addTokenToPoolEvent.parameters = new Array()

  addTokenToPoolEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )
  addTokenToPoolEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return addTokenToPoolEvent
}

export function createFrozenStakeEvent(ammPool: Address): FrozenStake {
  let frozenStakeEvent = changetype<FrozenStake>(newMockEvent())

  frozenStakeEvent.parameters = new Array()

  frozenStakeEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )

  return frozenStakeEvent
}

export function createStakeEvent(
  user: Address,
  usdcAmount: BigInt,
  tokenId: BigInt,
  ammPool: Address,
  tokensMinted: BigInt
): Stake {
  let stakeEvent = changetype<Stake>(newMockEvent())

  stakeEvent.parameters = new Array()

  stakeEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "usdcAmount",
      ethereum.Value.fromUnsignedBigInt(usdcAmount)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "tokensMinted",
      ethereum.Value.fromUnsignedBigInt(tokensMinted)
    )
  )

  return stakeEvent
}

export function createUnFrozenStakeEvent(ammPool: Address): UnFrozenStake {
  let unFrozenStakeEvent = changetype<UnFrozenStake>(newMockEvent())

  unFrozenStakeEvent.parameters = new Array()

  unFrozenStakeEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )

  return unFrozenStakeEvent
}

export function createUnstakeEvent(
  user: Address,
  usdcAmount: BigInt,
  tokenId: BigInt,
  ammPool: Address,
  tokensBurned: BigInt
): Unstake {
  let unstakeEvent = changetype<Unstake>(newMockEvent())

  unstakeEvent.parameters = new Array()

  unstakeEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam(
      "usdcAmount",
      ethereum.Value.fromUnsignedBigInt(usdcAmount)
    )
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam(
      "tokensBurned",
      ethereum.Value.fromUnsignedBigInt(tokensBurned)
    )
  )

  return unstakeEvent
}
