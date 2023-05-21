import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  TradingFeeSet,
  UpdateTheseus
} from "../generated/LoanPool/LoanPool"

export function createAddDebtEvent(amm: Address, amount: BigInt): AddDebt {
  let addDebtEvent = changetype<AddDebt>(newMockEvent())

  addDebtEvent.parameters = new Array()

  addDebtEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  addDebtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return addDebtEvent
}

export function createBorrowAmountEvent(
  tradeId: Bytes,
  amm: Address,
  amount: BigInt
): BorrowAmount {
  let borrowAmountEvent = changetype<BorrowAmount>(newMockEvent())

  borrowAmountEvent.parameters = new Array()

  borrowAmountEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  borrowAmountEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  borrowAmountEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return borrowAmountEvent
}

export function createInterestPeriodsSetEvent(
  _interestPeriods: BigInt,
  _ammPool: Address
): InterestPeriodsSet {
  let interestPeriodsSetEvent = changetype<InterestPeriodsSet>(newMockEvent())

  interestPeriodsSetEvent.parameters = new Array()

  interestPeriodsSetEvent.parameters.push(
    new ethereum.EventParam(
      "_interestPeriods",
      ethereum.Value.fromUnsignedBigInt(_interestPeriods)
    )
  )
  interestPeriodsSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return interestPeriodsSetEvent
}

export function createLoanInterestRateSetEvent(
  _loanInterestRate: BigInt,
  _ammPool: Address
): LoanInterestRateSet {
  let loanInterestRateSetEvent = changetype<LoanInterestRateSet>(newMockEvent())

  loanInterestRateSetEvent.parameters = new Array()

  loanInterestRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "_loanInterestRate",
      ethereum.Value.fromUnsignedBigInt(_loanInterestRate)
    )
  )
  loanInterestRateSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return loanInterestRateSetEvent
}

export function createLoanPoolInitializedEvent(
  _ammPool: Address,
  _dao: Address,
  timeStamp: BigInt
): LoanPoolInitialized {
  let loanPoolInitializedEvent = changetype<LoanPoolInitialized>(newMockEvent())

  loanPoolInitializedEvent.parameters = new Array()

  loanPoolInitializedEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )
  loanPoolInitializedEvent.parameters.push(
    new ethereum.EventParam("_dao", ethereum.Value.fromAddress(_dao))
  )
  loanPoolInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "timeStamp",
      ethereum.Value.fromUnsignedBigInt(timeStamp)
    )
  )

  return loanPoolInitializedEvent
}

export function createLoanPoolValuesEvent(
  ammPool: Address,
  minLoan: BigInt,
  maxLoan: BigInt,
  loanInterestRate: BigInt,
  loanInterestPeriod: BigInt,
  mmr: BigInt,
  minHoldingsReqPercentage: BigInt,
  tradingFee: BigInt
): LoanPoolValues {
  let loanPoolValuesEvent = changetype<LoanPoolValues>(newMockEvent())

  loanPoolValuesEvent.parameters = new Array()

  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam("ammPool", ethereum.Value.fromAddress(ammPool))
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "minLoan",
      ethereum.Value.fromUnsignedBigInt(minLoan)
    )
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "maxLoan",
      ethereum.Value.fromUnsignedBigInt(maxLoan)
    )
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "loanInterestRate",
      ethereum.Value.fromUnsignedBigInt(loanInterestRate)
    )
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "loanInterestPeriod",
      ethereum.Value.fromUnsignedBigInt(loanInterestPeriod)
    )
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam("mmr", ethereum.Value.fromUnsignedBigInt(mmr))
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "minHoldingsReqPercentage",
      ethereum.Value.fromUnsignedBigInt(minHoldingsReqPercentage)
    )
  )
  loanPoolValuesEvent.parameters.push(
    new ethereum.EventParam(
      "tradingFee",
      ethereum.Value.fromUnsignedBigInt(tradingFee)
    )
  )

  return loanPoolValuesEvent
}

export function createMMRSetEvent(_mmr: BigInt, _ammPool: Address): MMRSet {
  let mmrSetEvent = changetype<MMRSet>(newMockEvent())

  mmrSetEvent.parameters = new Array()

  mmrSetEvent.parameters.push(
    new ethereum.EventParam("_mmr", ethereum.Value.fromUnsignedBigInt(_mmr))
  )
  mmrSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return mmrSetEvent
}

export function createMaxLoanSetEvent(
  _maxLoan: BigInt,
  _ammPool: Address
): MaxLoanSet {
  let maxLoanSetEvent = changetype<MaxLoanSet>(newMockEvent())

  maxLoanSetEvent.parameters = new Array()

  maxLoanSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxLoan",
      ethereum.Value.fromUnsignedBigInt(_maxLoan)
    )
  )
  maxLoanSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return maxLoanSetEvent
}

export function createMinAndMaxHoldingsReqPercentageSetEvent(
  _minHoldingsReqPercentage: BigInt,
  _maxHoldingsReqPercentage: BigInt
): MinAndMaxHoldingsReqPercentageSet {
  let minAndMaxHoldingsReqPercentageSetEvent = changetype<
    MinAndMaxHoldingsReqPercentageSet
  >(newMockEvent())

  minAndMaxHoldingsReqPercentageSetEvent.parameters = new Array()

  minAndMaxHoldingsReqPercentageSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minHoldingsReqPercentage",
      ethereum.Value.fromUnsignedBigInt(_minHoldingsReqPercentage)
    )
  )
  minAndMaxHoldingsReqPercentageSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxHoldingsReqPercentage",
      ethereum.Value.fromUnsignedBigInt(_maxHoldingsReqPercentage)
    )
  )

  return minAndMaxHoldingsReqPercentageSetEvent
}

export function createMinAndMaxInterestPeriodsSetEvent(
  _minInterestPeriods: BigInt,
  _maxInterestPeriods: BigInt
): MinAndMaxInterestPeriodsSet {
  let minAndMaxInterestPeriodsSetEvent = changetype<
    MinAndMaxInterestPeriodsSet
  >(newMockEvent())

  minAndMaxInterestPeriodsSetEvent.parameters = new Array()

  minAndMaxInterestPeriodsSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minInterestPeriods",
      ethereum.Value.fromUnsignedBigInt(_minInterestPeriods)
    )
  )
  minAndMaxInterestPeriodsSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxInterestPeriods",
      ethereum.Value.fromUnsignedBigInt(_maxInterestPeriods)
    )
  )

  return minAndMaxInterestPeriodsSetEvent
}

export function createMinAndMaxInterestRateSetEvent(
  _minInterestRate: BigInt,
  _maxInterestRate: BigInt
): MinAndMaxInterestRateSet {
  let minAndMaxInterestRateSetEvent = changetype<MinAndMaxInterestRateSet>(
    newMockEvent()
  )

  minAndMaxInterestRateSetEvent.parameters = new Array()

  minAndMaxInterestRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minInterestRate",
      ethereum.Value.fromUnsignedBigInt(_minInterestRate)
    )
  )
  minAndMaxInterestRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxInterestRate",
      ethereum.Value.fromUnsignedBigInt(_maxInterestRate)
    )
  )

  return minAndMaxInterestRateSetEvent
}

export function createMinAndMaxLoanSetEvent(
  _minLoan: BigInt,
  _maxLoan: BigInt
): MinAndMaxLoanSet {
  let minAndMaxLoanSetEvent = changetype<MinAndMaxLoanSet>(newMockEvent())

  minAndMaxLoanSetEvent.parameters = new Array()

  minAndMaxLoanSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minLoan",
      ethereum.Value.fromUnsignedBigInt(_minLoan)
    )
  )
  minAndMaxLoanSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxLoan",
      ethereum.Value.fromUnsignedBigInt(_maxLoan)
    )
  )

  return minAndMaxLoanSetEvent
}

export function createMinAndMaxMMRSetEvent(
  _minMMR: BigInt,
  _maxMMR: BigInt
): MinAndMaxMMRSet {
  let minAndMaxMmrSetEvent = changetype<MinAndMaxMMRSet>(newMockEvent())

  minAndMaxMmrSetEvent.parameters = new Array()

  minAndMaxMmrSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minMMR",
      ethereum.Value.fromUnsignedBigInt(_minMMR)
    )
  )
  minAndMaxMmrSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxMMR",
      ethereum.Value.fromUnsignedBigInt(_maxMMR)
    )
  )

  return minAndMaxMmrSetEvent
}

export function createMinAndMaxTradingFeeSetEvent(
  _minTradingFee: BigInt,
  _maxTradingFee: BigInt
): MinAndMaxTradingFeeSet {
  let minAndMaxTradingFeeSetEvent = changetype<MinAndMaxTradingFeeSet>(
    newMockEvent()
  )

  minAndMaxTradingFeeSetEvent.parameters = new Array()

  minAndMaxTradingFeeSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minTradingFee",
      ethereum.Value.fromUnsignedBigInt(_minTradingFee)
    )
  )
  minAndMaxTradingFeeSetEvent.parameters.push(
    new ethereum.EventParam(
      "_maxTradingFee",
      ethereum.Value.fromUnsignedBigInt(_maxTradingFee)
    )
  )

  return minAndMaxTradingFeeSetEvent
}

export function createMinHoldingsReqPercentageSetEvent(
  _minHoldingsReqPercentage: BigInt,
  _ammPool: Address
): MinHoldingsReqPercentageSet {
  let minHoldingsReqPercentageSetEvent = changetype<
    MinHoldingsReqPercentageSet
  >(newMockEvent())

  minHoldingsReqPercentageSetEvent.parameters = new Array()

  minHoldingsReqPercentageSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minHoldingsReqPercentage",
      ethereum.Value.fromUnsignedBigInt(_minHoldingsReqPercentage)
    )
  )
  minHoldingsReqPercentageSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return minHoldingsReqPercentageSetEvent
}

export function createMinLoanSetEvent(
  _minLoan: BigInt,
  _ammPool: Address
): MinLoanSet {
  let minLoanSetEvent = changetype<MinLoanSet>(newMockEvent())

  minLoanSetEvent.parameters = new Array()

  minLoanSetEvent.parameters.push(
    new ethereum.EventParam(
      "_minLoan",
      ethereum.Value.fromUnsignedBigInt(_minLoan)
    )
  )
  minLoanSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return minLoanSetEvent
}

export function createPayDebtEvent(amm: Address, amount: BigInt): PayDebt {
  let payDebtEvent = changetype<PayDebt>(newMockEvent())

  payDebtEvent.parameters = new Array()

  payDebtEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return payDebtEvent
}

export function createPayInterestEvent(
  tradeId: Bytes,
  lastPayed: BigInt
): PayInterest {
  let payInterestEvent = changetype<PayInterest>(newMockEvent())

  payInterestEvent.parameters = new Array()

  payInterestEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  payInterestEvent.parameters.push(
    new ethereum.EventParam(
      "lastPayed",
      ethereum.Value.fromUnsignedBigInt(lastPayed)
    )
  )

  return payInterestEvent
}

export function createRepayLoanEvent(
  tradeId: Bytes,
  amm: Address,
  amount: BigInt
): RepayLoan {
  let repayLoanEvent = changetype<RepayLoan>(newMockEvent())

  repayLoanEvent.parameters = new Array()

  repayLoanEvent.parameters.push(
    new ethereum.EventParam("tradeId", ethereum.Value.fromBytes(tradeId))
  )
  repayLoanEvent.parameters.push(
    new ethereum.EventParam("amm", ethereum.Value.fromAddress(amm))
  )
  repayLoanEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return repayLoanEvent
}

export function createTradingFeeSetEvent(
  _tradingFee: BigInt,
  _ammPool: Address
): TradingFeeSet {
  let tradingFeeSetEvent = changetype<TradingFeeSet>(newMockEvent())

  tradingFeeSetEvent.parameters = new Array()

  tradingFeeSetEvent.parameters.push(
    new ethereum.EventParam(
      "_tradingFee",
      ethereum.Value.fromUnsignedBigInt(_tradingFee)
    )
  )
  tradingFeeSetEvent.parameters.push(
    new ethereum.EventParam("_ammPool", ethereum.Value.fromAddress(_ammPool))
  )

  return tradingFeeSetEvent
}

export function createUpdateTheseusEvent(
  oldTheseus: Address,
  newTheseus: Address
): UpdateTheseus {
  let updateTheseusEvent = changetype<UpdateTheseus>(newMockEvent())

  updateTheseusEvent.parameters = new Array()

  updateTheseusEvent.parameters.push(
    new ethereum.EventParam(
      "oldTheseus",
      ethereum.Value.fromAddress(oldTheseus)
    )
  )
  updateTheseusEvent.parameters.push(
    new ethereum.EventParam(
      "newTheseus",
      ethereum.Value.fromAddress(newTheseus)
    )
  )

  return updateTheseusEvent
}
