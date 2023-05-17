import {
  AddAmm as AddAmmEvent,
  AmmClosePosition as AmmClosePositionEvent,
  AmmOpenPosition as AmmOpenPositionEvent,
  Freeze as FreezeEvent,
  NewSnappshot as NewSnappshotEvent,
  PriceChange as PriceChangeEvent,
  RemoveAmm as RemoveAmmEvent,
  UnFreeze as UnFreezeEvent
} from "../generated/AmmViewer/AmmViewer"
import {
  AddAmm,
  AmmClosePosition,
  AmmOpenPosition,
  Freeze,
  NewSnappshot,
  PriceChange,
  RemoveAmm,
  UnFreeze
} from "../generated/schema"

export function handleAddAmm(event: AddAmmEvent): void {
  let entity = new AddAmm(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammAddr = event.params.ammAddr
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.payload = event.params.payload

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAmmClosePosition(event: AmmClosePositionEvent): void {
  let entity = new AmmClosePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammAddr = event.params.ammAddr
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAmmOpenPosition(event: AmmOpenPositionEvent): void {
  let entity = new AmmOpenPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammAddr = event.params.ammAddr
  entity.amount = event.params.amount
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFreeze(event: FreezeEvent): void {
  let entity = new Freeze(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewSnappshot(event: NewSnappshotEvent): void {
  let entity = new NewSnappshot(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm
  entity.newIndex = event.params.newIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceChange(event: PriceChangeEvent): void {
  let entity = new PriceChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm
  entity.currentIndex = event.params.currentIndex
  entity.indexPrice = event.params.indexPrice
  entity.baseAsset = event.params.baseAsset
  entity.quoteAsset = event.params.quoteAsset
  entity.ffr = event.params.ffr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveAmm(event: RemoveAmmEvent): void {
  let entity = new RemoveAmm(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammAddr = event.params.ammAddr

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnFreeze(event: UnFreezeEvent): void {
  let entity = new UnFreeze(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
