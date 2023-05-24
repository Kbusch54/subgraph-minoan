import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  AddAmm,
  AmmClosePosition,
  AmmOpenPosition,
  Freeze,
  NewSnappshot,
  PriceChange,
  RemoveAmm,
  UnFreeze
} from "../generated/AmmViewer/AmmViewer"

export function createAddAmmEvent(
  ammAddr: Address,
  name: string,
  symbol: string,
  payload: Bytes
): AddAmm {
  let addAmmEvent = changetype<AddAmm>(newMockEvent())

  addAmmEvent.parameters = new Array()

  addAmmEvent.parameters.push(
    new ethereum.EventParam("ammAddr", ethereum.Value.fromAddress(ammAddr))
  )
  addAmmEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  addAmmEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  addAmmEvent.parameters.push(
    new ethereum.EventParam("payload", ethereum.Value.fromFixedBytes(payload))
  )

  return addAmmEvent
}

export function createAmmClosePositionEvent(
  ammAddr: Address,
  amount: BigInt,
  timestamp: BigInt
): AmmClosePosition {
  let ammClosePositionEvent = changetype<AmmClosePosition>(newMockEvent())

  ammClosePositionEvent.parameters = new Array()

  ammClosePositionEvent.parameters.push(
    new ethereum.EventParam("ammAddr", ethereum.Value.fromAddress(ammAddr))
  )
  ammClosePositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromSignedBigInt(amount))
  )
  ammClosePositionEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return ammClosePositionEvent
}

export function createAmmOpenPositionEvent(
  ammAddr: Address,
  amount: BigInt,
  timestamp: BigInt
): AmmOpenPosition {
  let ammOpenPositionEvent = changetype<AmmOpenPosition>(newMockEvent())

  ammOpenPositionEvent.parameters = new Array()

  ammOpenPositionEvent.parameters.push(
    new ethereum.EventParam("ammAddr", ethereum.Value.fromAddress(ammAddr))
  )
  ammOpenPositionEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromSignedBigInt(amount))
  )
  ammOpenPositionEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return ammOpenPositionEvent
}

export function createFreezeEvent(amm: Address): Freeze {
  let freezeEvent = changetype<Freeze>(newMockEvent())

  freezeEvent.parameters = new Array()

  freezeEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )

  return freezeEvent
}

export function createNewSnappshotEvent(
  amm: Address,
  newIndex: BigInt
): NewSnappshot {
  let newSnappshotEvent = changetype<NewSnappshot>(newMockEvent())

  newSnappshotEvent.parameters = new Array()

  newSnappshotEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  newSnappshotEvent.parameters.push(
    new ethereum.EventParam(
      "newIndex",
      ethereum.Value.fromUnsignedBigInt(newIndex)
    )
  )

  return newSnappshotEvent
}

export function createPriceChangeEvent(
  amm: Address,
  currentIndex: BigInt,
  indexPrice: BigInt,
  baseAsset: BigInt,
  quoteAsset: BigInt,
  ffr: BigInt
): PriceChange {
  let priceChangeEvent = changetype<PriceChange>(newMockEvent())

  priceChangeEvent.parameters = new Array()

  priceChangeEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  priceChangeEvent.parameters.push(
    new ethereum.EventParam(
      "currentIndex",
      ethereum.Value.fromUnsignedBigInt(currentIndex)
    )
  )
  priceChangeEvent.parameters.push(
    new ethereum.EventParam(
      "indexPrice",
      ethereum.Value.fromUnsignedBigInt(indexPrice)
    )
  )
  priceChangeEvent.parameters.push(
    new ethereum.EventParam(
      "baseAsset",
      ethereum.Value.fromUnsignedBigInt(baseAsset)
    )
  )
  priceChangeEvent.parameters.push(
    new ethereum.EventParam(
      "quoteAsset",
      ethereum.Value.fromUnsignedBigInt(quoteAsset)
    )
  )
  priceChangeEvent.parameters.push(
    new ethereum.EventParam("ffr", ethereum.Value.fromSignedBigInt(ffr))
  )

  return priceChangeEvent
}

export function createRemoveAmmEvent(ammAddr: Address): RemoveAmm {
  let removeAmmEvent = changetype<RemoveAmm>(newMockEvent())

  removeAmmEvent.parameters = new Array()

  removeAmmEvent.parameters.push(
    new ethereum.EventParam("ammAddr", ethereum.Value.fromAddress(ammAddr))
  )

  return removeAmmEvent
}

export function createUnFreezeEvent(amm: Address): UnFreeze {
  let unFreezeEvent = changetype<UnFreeze>(newMockEvent())

  unFreezeEvent.parameters = new Array()

  unFreezeEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )

  return unFreezeEvent
}
