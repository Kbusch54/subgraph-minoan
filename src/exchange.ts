import {
  AddCollateral as AddCollateralEvent,
  AddLiquidity as AddLiquidityEvent,
  ClosePosition as ClosePositionEvent,
  Deposit as DepositEvent,
  FfrAdjust as FfrAdjustEvent,
  Liquidated as LiquidatedEvent,
  NewPosition as NewPositionEvent,
  OpenPosition as OpenPositionEvent,
  PayInterest as PayInterestEvent,
  RemoveCollateral as RemoveCollateralEvent,
  RemoveLiquidity as RemoveLiquidityEvent,
  Withdraw as WithdrawEvent
} from "../generated/Exchange/Exchange"
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
} from "../generated/schema"

export function handleAddCollateral(event: AddCollateralEvent): void {
  let entity = new AddCollateral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  let entity = new AddLiquidity(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amount = event.params.amount
  entity.newLoan = event.params.newLoan
  entity.addiotionalPositionSize = event.params.addiotionalPositionSize

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClosePosition(event: ClosePositionEvent): void {
  let entity = new ClosePosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.closePrice = event.params.closePrice
  entity.closeTime = event.params.closeTime
  entity.pnl = event.params.pnl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFfrAdjust(event: FfrAdjustEvent): void {
  let entity = new FfrAdjust(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidated(event: LiquidatedEvent): void {
  let entity = new Liquidated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPosition(event: NewPositionEvent): void {
  let entity = new NewPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.trader = event.params.trader
  entity.amm = event.params.amm
  entity.side = event.params.side
  entity.timeStamp = event.params.timeStamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOpenPosition(event: OpenPositionEvent): void {
  let entity = new OpenPosition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.collateral = event.params.collateral
  entity.loanAmt = event.params.loanAmt
  entity.positionSize = event.params.positionSize
  entity.entryPrice = event.params.entryPrice
  entity.lastFundingRate = event.params.lastFundingRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayInterest(event: PayInterestEvent): void {
  let entity = new PayInterest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.totalAmount = event.params.totalAmount
  entity.amountToPool = event.params.amountToPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveCollateral(event: RemoveCollateralEvent): void {
  let entity = new RemoveCollateral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let entity = new RemoveLiquidity(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.positionSizeRemoved = event.params.positionSizeRemoved
  entity.amountOwed = event.params.amountOwed
  entity.usdcReturned = event.params.usdcReturned

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
