import {
  AddTokenToPool as AddTokenToPoolEvent,
  FrozenStake as FrozenStakeEvent,
  Stake as StakeEvent,
  UnFrozenStake as UnFrozenStakeEvent,
  Unstake as UnstakeEvent
} from "../generated/Staking/Staking"
import {
  AddTokenToPool,
  FrozenStake,
  Stake,
  UnFrozenStake,
  Unstake
} from "../generated/schema"

export function handleAddTokenToPool(event: AddTokenToPoolEvent): void {
  let entity = new AddTokenToPool(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammPool = event.params.ammPool
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFrozenStake(event: FrozenStakeEvent): void {
  let entity = new FrozenStake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammPool = event.params.ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStake(event: StakeEvent): void {
  let entity = new Stake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.usdcAmount = event.params.usdcAmount
  entity.tokenId = event.params.tokenId
  entity.ammPool = event.params.ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnFrozenStake(event: UnFrozenStakeEvent): void {
  let entity = new UnFrozenStake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammPool = event.params.ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnstake(event: UnstakeEvent): void {
  let entity = new Unstake(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.usdcAmount = event.params.usdcAmount
  entity.tokenId = event.params.tokenId
  entity.ammPool = event.params.ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
