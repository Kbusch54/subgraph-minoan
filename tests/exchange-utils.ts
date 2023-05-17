import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  AddCollateral,
  AddLiquidity,
  ClosePosition,
  Deposit,
  FfrAdjust,
  Liquidated,
  NewPosition,
  OpenPosition,
  PayInterest,
  RemoveCollateral,
  RemoveLiquidity,
  Withdraw
} from "../generated/Exchange/Exchange"

export function createAddCollateralEvent(
  tradeId: Bytes,
  amount: BigInt
): AddCollateral {
  let addCollateralEvent = changetype<AddCollateral>(newMockEvent())

  addCollateralEvent.parameters = new Array()

  addCollateralEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  addCollateralEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return addCollateralEvent
}

export function createAddLiquidityEvent(
  tradeId: Bytes,
  amount: BigInt,
  newLoan: BigInt,
  addiotionalPositionSize: BigInt
): AddLiquidity {
  let addLiquidityEvent = changetype<AddLiquidity>(newMockEvent())

  addLiquidityEvent.parameters = new Array()

  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "newLoan",
      ethereum.Value.fromUnsignedBigInt(newLoan)
    )
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "addiotionalPositionSize",
      ethereum.Value.fromSignedBigInt(addiotionalPositionSize)
    )
  )

  return addLiquidityEvent
}

export function createClosePositionEvent(
  tradeId: Bytes,
  closePrice: BigInt,
  closeTime: BigInt,
  pnl: BigInt
): ClosePosition {
  let closePositionEvent = changetype<ClosePosition>(newMockEvent())

  closePositionEvent.parameters = new Array()

  closePositionEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "closePrice",
      ethereum.Value.fromUnsignedBigInt(closePrice)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam(
      "closeTime",
      ethereum.Value.fromUnsignedBigInt(closeTime)
    )
  )
  closePositionEvent.parameters.push(
    new ethereum.EventParam("pnl", ethereum.Value.fromSignedBigInt(pnl))
  )

  return closePositionEvent
}

export function createDepositEvent(user: Address, amount: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createFfrAdjustEvent(
  tradeId: Bytes,
  amount: BigInt
): FfrAdjust {
  let ffrAdjustEvent = changetype<FfrAdjust>(newMockEvent())

  ffrAdjustEvent.parameters = new Array()

  ffrAdjustEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  ffrAdjustEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromSignedBigInt(amount))
  )

  return ffrAdjustEvent
}

export function createLiquidatedEvent(tradeId: Bytes): Liquidated {
  let liquidatedEvent = changetype<Liquidated>(newMockEvent())

  liquidatedEvent.parameters = new Array()

  liquidatedEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )

  return liquidatedEvent
}

export function createNewPositionEvent(
  tradeId: Bytes,
  trader: Address,
  amm: Address,
  side: BigInt,
  timeStamp: BigInt
): NewPosition {
  let newPositionEvent = changetype<NewPosition>(newMockEvent())

  newPositionEvent.parameters = new Array()

  newPositionEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam("trader", ethereum.Value.fromAddress(trader))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam("side", ethereum.Value.fromSignedBigInt(side))
  )
  newPositionEvent.parameters.push(
    new ethereum.EventParam(
      "timeStamp",
      ethereum.Value.fromUnsignedBigInt(timeStamp)
    )
  )

  return newPositionEvent
}

export function createOpenPositionEvent(
  tradeId: Bytes,
  collateral: BigInt,
  loanAmt: BigInt,
  positionSize: BigInt,
  entryPrice: BigInt,
  lastFundingRate: BigInt
): OpenPosition {
  let openPositionEvent = changetype<OpenPosition>(newMockEvent())

  openPositionEvent.parameters = new Array()

  openPositionEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "loanAmt",
      ethereum.Value.fromUnsignedBigInt(loanAmt)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "positionSize",
      ethereum.Value.fromSignedBigInt(positionSize)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "entryPrice",
      ethereum.Value.fromUnsignedBigInt(entryPrice)
    )
  )
  openPositionEvent.parameters.push(
    new ethereum.EventParam(
      "lastFundingRate",
      ethereum.Value.fromUnsignedBigInt(lastFundingRate)
    )
  )

  return openPositionEvent
}

export function createPayInterestEvent(
  tradeId: Bytes,
  totalAmount: BigInt,
  amountToPool: BigInt
): PayInterest {
  let payInterestEvent = changetype<PayInterest>(newMockEvent())

  payInterestEvent.parameters = new Array()

  payInterestEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  payInterestEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmount",
      ethereum.Value.fromUnsignedBigInt(totalAmount)
    )
  )
  payInterestEvent.parameters.push(
    new ethereum.EventParam(
      "amountToPool",
      ethereum.Value.fromUnsignedBigInt(amountToPool)
    )
  )

  return payInterestEvent
}

export function createRemoveCollateralEvent(
  tradeId: Bytes,
  amount: BigInt
): RemoveCollateral {
  let removeCollateralEvent = changetype<RemoveCollateral>(newMockEvent())

  removeCollateralEvent.parameters = new Array()

  removeCollateralEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  removeCollateralEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return removeCollateralEvent
}

export function createRemoveLiquidityEvent(
  tradeId: Bytes,
  positionSizeRemoved: BigInt,
  amountOwed: BigInt,
  usdcReturned: BigInt
): RemoveLiquidity {
  let removeLiquidityEvent = changetype<RemoveLiquidity>(newMockEvent())

  removeLiquidityEvent.parameters = new Array()

  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "positionSizeRemoved",
      ethereum.Value.fromSignedBigInt(positionSizeRemoved)
    )
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "amountOwed",
      ethereum.Value.fromSignedBigInt(amountOwed)
    )
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "usdcReturned",
      ethereum.Value.fromSignedBigInt(usdcReturned)
    )
  )

  return removeLiquidityEvent
}

export function createWithdrawEvent(user: Address, amount: BigInt): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawEvent
}
