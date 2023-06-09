import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  AddAmm as AddAmmEvent,
  AmmClosePosition as AmmClosePositionEvent,
  AmmOpenPosition as AmmOpenPositionEvent,
  Freeze as FreezeEvent,
  NewSnappshot as NewSnappshotEvent,
  PriceChange as PriceChangeEvent,
  RemoveAmm as RemoveAmmEvent,
  UnFreeze as UnFreezeEvent,
} from "../generated/AmmViewer/AmmViewer"
import {
 AriadneDAO,PriceData,
 Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,Stake,TheseusDAO,Trade,TradeBalance,User,VAmm
} from "../generated/schema"

export function handleAddAmm(event: AddAmmEvent): void {
  let id = event.params.ammAddr
  let entity = new VAmm(id)
  entity.name = event.params.name
  entity.symbol = event.params.symbol
  entity.payload = event.params.payload.toString()
  entity.currentIndex = BigInt.fromI32(0)
  entity.isFrozen = true
  entity.totalPositionSize = BigInt.fromI32(0)
  entity.loanPool = event.params.ammAddr
  entity.save()
}

export function handleAmmClosePosition(event: AmmClosePositionEvent): void {
  let id = event.params.ammAddr
  let entity = VAmm.load(id)
  if (entity == null) {
    entity = new VAmm(id)
  }
  let snapId = event.params.ammAddr.concatI32(entity.currentIndex.toI32())
  let snapEntity = Snapshot.load(snapId)
  if (snapEntity == null) {
    snapEntity = new Snapshot(snapId)
    snapEntity.totalPositionSize = entity.totalPositionSize
    snapEntity.vamm = event.params.ammAddr
    snapEntity.index = entity.currentIndex
  }
  snapEntity.totalPositionSize.minus(event.params.amount)
  entity.totalPositionSize.minus(event.params.amount)
  snapEntity.save()

  entity.save()
}

export function handleAmmOpenPosition(event: AmmOpenPositionEvent): void {
  
  let id = event.params.ammAddr
  let entity = VAmm.load(id)
  if (entity == null) {
    entity = new VAmm(id)
  }
  let snapId = event.params.ammAddr.concatI32(entity.currentIndex.toI32())
  let snapEntity = Snapshot.load(snapId)
  if (snapEntity == null) {
    snapEntity = new Snapshot(snapId)
  }
  snapEntity.totalPositionSize.plus(event.params.amount)
  entity.totalPositionSize.plus(event.params.amount)
  snapEntity.save()

  entity.save()
}

export function handleFreeze(event: FreezeEvent): void {
  let id = event.params.amm
  let entity = VAmm.load(id)
  if (entity == null) {
    entity = new VAmm(id)
  }
  entity.isFrozen = true

  entity.save()
  let priceDataID = event.params.amm.concatI32(event.block.timestamp.toI32())
  let priceDataEntity = PriceData.load(priceDataID)
  if(priceDataEntity == null){
    priceDataEntity = new PriceData(priceDataID)
    priceDataEntity.isFrozen = true
    priceDataEntity.indexPrice = BigInt.fromI32(0)
    priceDataEntity.vAmm = event.params.amm
    priceDataEntity.timeStamp = event.block.timestamp
    priceDataEntity.marketPrice = BigDecimal.zero()
    priceDataEntity.save()
  }else{
    priceDataEntity.isFrozen = true
    priceDataEntity.save()
  }
}

export function handleNewSnappshot(event: NewSnappshotEvent): void {
  let snapId = event.params.amm.concatI32(event.params.newIndex.toI32())
  let snapEntity = Snapshot.load(snapId)
  if (snapEntity == null) {
    snapEntity = new Snapshot(snapId)
  }
  let oldIndex = event.params.newIndex.toI32() - 1
  let oldSnapId = event.params.amm.concatI32(oldIndex)
  let oldSnapEntity = Snapshot.load(oldSnapId)
  let ffrTobe = BigInt.fromI32(0)
  if (oldSnapEntity == null) {
    snapEntity.totalPositionSize = BigInt.fromI32(0)
    snapEntity.indexPrice = BigInt.fromI32(0)
    snapEntity.baseAssetReserve = BigInt.fromI32(0)
    snapEntity.quoteAssetReserve = BigInt.fromI32(0)
    snapEntity.ffr = BigInt.fromI32(0)
    snapEntity.marketPrice = BigDecimal.zero()
  }else{
    snapEntity.totalPositionSize = oldSnapEntity.totalPositionSize
    snapEntity.indexPrice = oldSnapEntity.indexPrice
    snapEntity.baseAssetReserve = oldSnapEntity.baseAssetReserve
    snapEntity.quoteAssetReserve = oldSnapEntity.quoteAssetReserve
    snapEntity.ffr = oldSnapEntity.ffr
    snapEntity.marketPrice = oldSnapEntity.marketPrice
    ffrTobe = oldSnapEntity.ffr
  }
    snapEntity.index = event.params.newIndex
    snapEntity.vamm = event.params.amm
    snapEntity.blockTimestamp = event.block.timestamp

  snapEntity.save()

  let id = event.params.amm
  let vammEntity = VAmm.load(id)
  if (vammEntity == null) {
    vammEntity = new VAmm(id)
  }
  vammEntity.currentIndex = event.params.newIndex
  vammEntity.save()
  let ffrId = event.params.amm.concatI32(event.params.newIndex.toI32())
  let ffrEntity = FFR.load(ffrId)
  if (ffrEntity == null) {
    ffrEntity = new FFR(ffrId)
  }
  ffrEntity.index = event.params.newIndex.minus(BigInt.fromI32(1))
  ffrEntity.ffr = ffrTobe
  ffrEntity.vAmm = event.params.amm
  ffrEntity.timeStamp = event.block.timestamp
  ffrEntity.save()
  
}

export function handlePriceChange(event: PriceChangeEvent): void {
  let id = event.params.amm
  let entity = VAmm.load(id)
  if (entity == null) {
    entity = new VAmm(id)
  }
  entity.currentIndex = event.params.currentIndex

  let snapId = event.params.amm.concatI32(event.params.currentIndex.toI32())
  let snapEntity = Snapshot.load(snapId)
  if (snapEntity == null) {
    snapEntity = new Snapshot(snapId)
    snapEntity.blockTimestamp = event.block.timestamp
  }
  snapEntity.index = event.params.currentIndex
  snapEntity.vamm = event.params.amm
  snapEntity.indexPrice = event.params.indexPrice
  snapEntity.baseAssetReserve = event.params.baseAsset
  snapEntity.quoteAssetReserve = event.params.quoteAsset
  snapEntity.ffr = event.params.ffr
  snapEntity.totalPositionSize = entity.totalPositionSize
  let baseAssetDecimal = event.params.baseAsset.toBigDecimal()
  let quoteAssetDecimal = event.params.quoteAsset.toBigDecimal()

  // 10**8 as BigInt
  let tenPowEight = BigInt.fromI32(10).pow(8).toBigDecimal()

  // Calculate market price
  snapEntity.marketPrice = baseAssetDecimal.times(tenPowEight).div(quoteAssetDecimal)

  snapEntity.save()

  entity.save()
  let priceDataID = event.params.amm.concatI32(event.block.timestamp.toI32())
  let priceDataEntity = PriceData.load(priceDataID)
  if(priceDataEntity == null){
    priceDataEntity = new PriceData(priceDataID)
    priceDataEntity.isFrozen = entity.isFrozen
  }
  priceDataEntity.indexPrice = event.params.indexPrice
  priceDataEntity.vAmm = event.params.amm
  priceDataEntity.timeStamp = event.block.timestamp
  priceDataEntity.marketPrice = snapEntity.marketPrice
  priceDataEntity.save()
}

export function handleRemoveAmm(event: RemoveAmmEvent): void {
  
}

export function handleUnFreeze(event: UnFreezeEvent): void {
  let id = event.params.amm
  let entity = VAmm.load(id)
  if (entity == null) {
    entity = new VAmm(id)
  }
  entity.isFrozen = false
  let priceDataID = event.params.amm.concatI32(event.block.timestamp.toI32())
  let priceDataEntity = PriceData.load(priceDataID)
  if(priceDataEntity == null){
    priceDataEntity = new PriceData(priceDataID)
    priceDataEntity.isFrozen = false
    priceDataEntity.indexPrice = BigInt.fromI32(0)
    priceDataEntity.vAmm = event.params.amm
    priceDataEntity.timeStamp = event.block.timestamp
    priceDataEntity.marketPrice = BigInt.zero().toBigDecimal()
    priceDataEntity.save()
  }else{
    priceDataEntity.isFrozen = false
    priceDataEntity.save()
  }

  entity.save()
}
