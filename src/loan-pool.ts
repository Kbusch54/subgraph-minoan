import {
  AddDebt as AddDebtEvent,
  BorrowAmount as BorrowAmountEvent,
  InterestPeriodsSet as InterestPeriodsSetEvent,
  LoanInterestRateSet as LoanInterestRateSetEvent,
  LoanPoolInitialized as LoanPoolInitializedEvent,
  LoanPoolValues as LoanPoolValuesEvent,
  MMRSet as MMRSetEvent,
  MaxLoanSet as MaxLoanSetEvent,
  MinAndMaxHoldingsReqPercentageSet as MinAndMaxHoldingsReqPercentageSetEvent,
  MinAndMaxInterestPeriodsSet as MinAndMaxInterestPeriodsSetEvent,
  MinAndMaxInterestRateSet as MinAndMaxInterestRateSetEvent,
  MinAndMaxLoanSet as MinAndMaxLoanSetEvent,
  MinAndMaxMMRSet as MinAndMaxMMRSetEvent,
  MinAndMaxTradingFeeSet as MinAndMaxTradingFeeSetEvent,
  MinHoldingsReqPercentageSet as MinHoldingsReqPercentageSetEvent,
  MinLoanSet as MinLoanSetEvent,
  PayDebt as PayDebtEvent,
  PayInterest as PayInterestEvent,
  RepayLoan as RepayLoanEvent,
  TradingFeeSet as TradingFeeSetEvent
} from "../generated/LoanPool/LoanPool"
import {
  AddDebt,
  BorrowAmount,
  InterestPeriodsSet,
  LoanInterestRateSet,
  LoanPoolInitialized,
  LoanPoolValues,
  MMRSet,
  MaxLoanSet,
  MinAndMaxHoldingsReqPercentageSet,
  MinAndMaxInterestPeriodsSet,
  MinAndMaxInterestRateSet,
  MinAndMaxLoanSet,
  MinAndMaxMMRSet,
  MinAndMaxTradingFeeSet,
  MinHoldingsReqPercentageSet,
  MinLoanSet,
  PayDebt,
  PayInterest,
  RepayLoan,
  TradingFeeSet
} from "../generated/schema"

export function handleAddDebt(event: AddDebtEvent): void {
  let entity = new AddDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBorrowAmount(event: BorrowAmountEvent): void {
  let entity = new BorrowAmount(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amm = event.params.amm
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInterestPeriodsSet(event: InterestPeriodsSetEvent): void {
  let entity = new InterestPeriodsSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._interestPeriods = event.params._interestPeriods
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanInterestRateSet(
  event: LoanInterestRateSetEvent
): void {
  let entity = new LoanInterestRateSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._loanInterestRate = event.params._loanInterestRate
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanPoolInitialized(
  event: LoanPoolInitializedEvent
): void {
  let entity = new LoanPoolInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._ammPool = event.params._ammPool
  entity._dao = event.params._dao
  entity.timeStamp = event.params.timeStamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanPoolValues(event: LoanPoolValuesEvent): void {
  let entity = new LoanPoolValues(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ammPool = event.params.ammPool
  entity.minLoan = event.params.minLoan
  entity.maxLoan = event.params.maxLoan
  entity.loanInterestRate = event.params.loanInterestRate
  entity.loanInterestPeriod = event.params.loanInterestPeriod
  entity.mmr = event.params.mmr
  entity.minHoldingsReqPercentage = event.params.minHoldingsReqPercentage
  entity.tradingFee = event.params.tradingFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMMRSet(event: MMRSetEvent): void {
  let entity = new MMRSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._mmr = event.params._mmr
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMaxLoanSet(event: MaxLoanSetEvent): void {
  let entity = new MaxLoanSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._maxLoan = event.params._maxLoan
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxHoldingsReqPercentageSet(
  event: MinAndMaxHoldingsReqPercentageSetEvent
): void {
  let entity = new MinAndMaxHoldingsReqPercentageSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minHoldingsReqPercentage = event.params._minHoldingsReqPercentage
  entity._maxHoldingsReqPercentage = event.params._maxHoldingsReqPercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxInterestPeriodsSet(
  event: MinAndMaxInterestPeriodsSetEvent
): void {
  let entity = new MinAndMaxInterestPeriodsSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minInterestPeriods = event.params._minInterestPeriods
  entity._maxInterestPeriods = event.params._maxInterestPeriods

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxInterestRateSet(
  event: MinAndMaxInterestRateSetEvent
): void {
  let entity = new MinAndMaxInterestRateSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minInterestRate = event.params._minInterestRate
  entity._maxInterestRate = event.params._maxInterestRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxLoanSet(event: MinAndMaxLoanSetEvent): void {
  let entity = new MinAndMaxLoanSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minLoan = event.params._minLoan
  entity._maxLoan = event.params._maxLoan

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxMMRSet(event: MinAndMaxMMRSetEvent): void {
  let entity = new MinAndMaxMMRSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minMMR = event.params._minMMR
  entity._maxMMR = event.params._maxMMR

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinAndMaxTradingFeeSet(
  event: MinAndMaxTradingFeeSetEvent
): void {
  let entity = new MinAndMaxTradingFeeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minTradingFee = event.params._minTradingFee
  entity._maxTradingFee = event.params._maxTradingFee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinHoldingsReqPercentageSet(
  event: MinHoldingsReqPercentageSetEvent
): void {
  let entity = new MinHoldingsReqPercentageSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minHoldingsReqPercentage = event.params._minHoldingsReqPercentage
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinLoanSet(event: MinLoanSetEvent): void {
  let entity = new MinLoanSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._minLoan = event.params._minLoan
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayDebt(event: PayDebtEvent): void {
  let entity = new PayDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amm = event.params.amm
  entity.amount = event.params.amount

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
  entity.lastPayed = event.params.lastPayed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepayLoan(event: RepayLoanEvent): void {
  let entity = new RepayLoan(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tradeId = event.params.tradeId
  entity.amm = event.params.amm
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTradingFeeSet(event: TradingFeeSetEvent): void {
  let entity = new TradingFeeSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._tradingFee = event.params._tradingFee
  entity._ammPool = event.params._ammPool

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
