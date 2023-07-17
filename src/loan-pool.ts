import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
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
  TradingFeeSet as TradingFeeSetEvent,
  UpdateTheseus as UpdateTheseusEvent,
  LoanPool as LoanPoolContract,
  
} from "../generated/LoanPool/LoanPool"

import {
  AriadneDAO,PriceData,
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,Stake,TheseusDAO,Trade,TradeBalance,User,VAmm
 } from "../generated/schema"

export const theseusAdd ='0x5f96762CD2878c99177F03F3BC803fEA9EA6D421'

export function handleAddDebt(event: AddDebtEvent): void {
  //debt: totalDebt
  let debt = Debt.load(event.params.amm)
  if (debt) {
    debt.amountOwed = debt.amountOwed.plus(event.params.amount)
  } else {
    debt = new Debt(event.params.amm)
    debt.amountOwed = event.params.amount
    debt.loanPool = event.params.amm
    let loanPool = LoanPool.load(event.params.amm)
    if (loanPool) {
      loanPool.debt = debt.id
      loanPool.save()
    }
    debt.save()
  }
  let poolBalance = PoolBalance.load(event.params.amm)
  if (poolBalance) {
    poolBalance.totalUsdcSupply = poolBalance.outstandingLoanUsdc
    poolBalance.availableUsdc = BigInt.fromI32(0)
    poolBalance.save()
  }
  let loanPoolContract = LoanPoolContract.bind(event.address)
  let balacne = Balance.load(loanPoolContract.theseusDao())
  if (balacne) {
    balacne.availableUsdc = balacne.availableUsdc.minus(event.params.amount)
    balacne.save()
  }
  let theseus = TheseusDAO.load(Bytes.fromHexString(theseusAdd))
  if (theseus) {
    theseus.insuranceFund = theseus.insuranceFund.minus(event.params.amount)
    theseus.save()
  }
}

export function handleUpdateTheseus(event: UpdateTheseusEvent): void {
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if (theseus) {
    theseus.theseusDAO = event.params.newTheseus
  }
}

export function handleBorrowAmount(event: BorrowAmountEvent): void {
  //PoolBalance: poolOutstadingLoan poolAvailableBalance 
  let poolBalance = PoolBalance.load(event.params.amm)
  if (poolBalance) {
    if(poolBalance.outstandingLoanUsdc.equals(BigInt.zero())){
      poolBalance.outstandingLoanUsdc = event.params.amount
    }else{
      poolBalance.outstandingLoanUsdc = poolBalance.outstandingLoanUsdc.plus(event.params.amount)
    }
    poolBalance.availableUsdc = poolBalance.availableUsdc.minus(event.params.amount)
  }else{
    poolBalance = new PoolBalance(event.params.amm)
    poolBalance.amm = event.params.amm
    poolBalance.totalUsdcSupply = poolBalance.outstandingLoanUsdc
    poolBalance.outstandingLoanUsdc = poolBalance.outstandingLoanUsdc
    poolBalance.availableUsdc = BigInt.fromI32(0)
    poolBalance.loanPool = event.params.amm
  }
  poolBalance.save()
}


export function handleInterestPeriodsSet(event: InterestPeriodsSetEvent): void {
  //LoanPool: interestPeriods
  let loanPool = LoanPool.load(event.params._ammPool)
  if (loanPool) {
    loanPool.interestPeriod = event.params._interestPeriods
    loanPool.save()
  }
}

export function handleLoanInterestRateSet(
  event: LoanInterestRateSetEvent
): void {
  //LoanPool: interestRate
  let loanPool = LoanPool.load(event.params._ammPool)
  if (loanPool) {
    loanPool.interestRate = event.params._loanInterestRate
    loanPool.save()
  }
}

export function handleLoanPoolInitialized(
  event: LoanPoolInitializedEvent
): void {
  //LoanPool: newLoanPool
  let loanPool = new LoanPool(event.params._ammPool)
  loanPool.amm = event.params._ammPool
  loanPool.created = event.params.timeStamp
  loanPool.ariadneDAO = event.params._dao
  loanPool.loanPoolTheseus = Bytes.fromI32(1)
  loanPool.minLoan = BigInt.fromI32(0)
  loanPool.maxLoan = BigInt.fromI32(0)
  loanPool.interestRate = BigInt.fromI32(0)
  loanPool.interestPeriod = BigInt.fromI32(0)
  loanPool.mmr = BigInt.fromI32(0)
  loanPool.tradingFee = BigInt.fromI32(0)
  loanPool.minHoldingsReqPercentage = BigInt.fromI32(0)
  loanPool.poolBalance = event.params._ammPool
  loanPool.poolToken = event.params._ammPool
  loanPool.save()
}

export function handleLoanPoolValues(event: LoanPoolValuesEvent): void {
  //loanPool: newLoanPool
  let loanPool = LoanPool.load(event.params.ammPool)
  let poolBalance = new PoolBalance(event.params.ammPool)
  poolBalance.amm = event.params.ammPool
  poolBalance.totalUsdcSupply = BigInt.fromI32(0)
  poolBalance.outstandingLoanUsdc = BigInt.fromI32(0)
  poolBalance.availableUsdc = BigInt.fromI32(0)
  poolBalance.loanPool = event.params.ammPool
  poolBalance.save()
  if(loanPool){
    loanPool.minLoan = event.params.minLoan
    loanPool.maxLoan = event.params.maxLoan
    loanPool.interestRate = event.params.loanInterestRate
    loanPool.interestPeriod = event.params.loanInterestPeriod
    loanPool.mmr = event.params.mmr
    loanPool.tradingFee = event.params.tradingFee
    loanPool.minHoldingsReqPercentage = event.params.minHoldingsReqPercentage
    loanPool.poolBalance = event.params.ammPool
    loanPool.save()
  }
}

export function handleMMRSet(event: MMRSetEvent): void {
  //LoanPool: MMR
  let loanPool = LoanPool.load(event.params._ammPool)
  if(loanPool){
    loanPool.mmr = event.params._mmr
    loanPool.save()
  }

}

export function handleMaxLoanSet(event: MaxLoanSetEvent): void {
  //LoanPool: maxLoan
  let loanPool = LoanPool.load(event.params._ammPool)
  if(loanPool){
    loanPool.maxLoan = event.params._maxLoan
    loanPool.save()
  }
}

export function handleMinAndMaxHoldingsReqPercentageSet(
  event: MinAndMaxHoldingsReqPercentageSetEvent
): void {
  //TheseusLoanPool: minHoldingsReqPercentage
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if(theseus == null){
    let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd) 
    theseus.minHoldingsReqPercentage = event.params._minHoldingsReqPercentage
    theseus.save()
  }else{
    theseus.minHoldingsReqPercentage = event.params._minHoldingsReqPercentage
    theseus.save()
  }
  
}

export function handleMinAndMaxInterestPeriodsSet(
  event: MinAndMaxInterestPeriodsSetEvent
): void {
  //TheseusLoanPool: minInterestPeriods maxInterestPeriods
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if(theseus == null){
    let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd) 
    theseus.minInterestPeriod = event.params._minInterestPeriods
    theseus.maxInterestPeriod = event.params._maxInterestPeriods
    theseus.save()
  }else{
    theseus.minInterestPeriod = event.params._minInterestPeriods
    theseus.maxInterestPeriod = event.params._maxInterestPeriods
    theseus.save()
  }
}

export function handleMinAndMaxInterestRateSet(
  event: MinAndMaxInterestRateSetEvent
): void {
  //TheseusLoanPool: minInterestRate maxInterestRate
    //TheseusLoanPool: minInterestPeriods maxInterestPeriods
    let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
    if(theseus == null){
      let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd) 
      
      theseus.minInterestRate = event.params._minInterestRate
      theseus.maxInterestRate = event.params._maxInterestRate
      theseus.save()
    }else{
      theseus.minInterestRate = event.params._minInterestRate
      theseus.maxInterestRate = event.params._maxInterestRate
      theseus.save()
    }
  
}

export function handleMinAndMaxLoanSet(event: MinAndMaxLoanSetEvent): void {
  //TheseusLoanPool: minLoan maxLoan
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if(theseus == null){
    let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd) 
     
    theseus.minLoan = event.params._minLoan
    theseus.maxLoan = event.params._maxLoan
    theseus.save()
  }else{
    theseus.minLoan = event.params._minLoan
    theseus.maxLoan = event.params._maxLoan
    theseus.save()
  }
}

export function handleMinAndMaxMMRSet(event: MinAndMaxMMRSetEvent): void {
  //TheseusLoanPool: minMMR maxMMR
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if(theseus == null){
    let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd) 
    theseus.minMMR = event.params._minMMR
    theseus.maxMMR = event.params._maxMMR
    theseus.save()
  }else{
    theseus.minMMR = event.params._minMMR
    theseus.maxMMR = event.params._maxMMR
    theseus.save()
  }
}

export function handleMinAndMaxTradingFeeSet(
  event: MinAndMaxTradingFeeSetEvent
): void {
  //TheseusLoanPool: minTradingFee maxTradingFee
  let theseus = LoanPoolTheseus.load(Bytes.fromI32(1))
  if(theseus == null){
    let theseus = new LoanPoolTheseus(Bytes.fromI32(1))
    theseus.theseusDAO = Address.fromString(theseusAdd)  
    theseus.minTradingFee = event.params._minTradingFee
    theseus.maxTradingFee = event.params._maxTradingFee
    theseus.save()
  }else{
    theseus.minTradingFee = event.params._minTradingFee
    theseus.maxTradingFee = event.params._maxTradingFee
    theseus.save()
  }
}

export function handleMinHoldingsReqPercentageSet(
  event: MinHoldingsReqPercentageSetEvent
): void {
  //LoanPool: minHoldingsReqPercentage
  let loanPool = LoanPool.load(event.params._ammPool)
  if(loanPool){
    loanPool.minHoldingsReqPercentage = event.params._minHoldingsReqPercentage
    loanPool.save()
  }
}

export function handleMinLoanSet(event: MinLoanSetEvent): void {
  //LoanPool: minLoan
  let loanPool = LoanPool.load(event.params._ammPool)
  if(loanPool){
    loanPool.minLoan = event.params._minLoan
    loanPool.save()
  }
}

export function handlePayDebt(event: PayDebtEvent): void {
  let debt = Debt.load(event.params.amm)
  if (debt) {
    debt.amountOwed = debt.amountOwed.minus(event.params.amount)
  } 
  let poolBalance = PoolBalance.load(event.params.amm)
  if (poolBalance) {
    poolBalance.totalUsdcSupply = poolBalance.outstandingLoanUsdc
    poolBalance.availableUsdc = BigInt.fromI32(0)
    poolBalance.save()
  }
  let loanPoolContract = LoanPoolContract.bind(event.address)
  let balacne = Balance.load(loanPoolContract.theseusDao())
  if (balacne) {
    balacne.availableUsdc = balacne.availableUsdc.plus(event.params.amount)
    balacne.save()
  }
  let theseus = TheseusDAO.load(Bytes.fromHexString(theseusAdd))
  if (theseus) {
    theseus.insuranceFund = theseus.insuranceFund.plus(event.params.amount)
    theseus.save()
  }

}
interface TradeID {
  sender: string;
  amm: string;
  timestamp: number;
  side: number;
}

export function handlePayInterest(event: PayInterestEvent): void {
 
  // let tradeIdF =event.params.tradeId
  // let loanPoolCOn = LoanPoolContract.bind(event.address)

  // let tradeBalanced = TradeBalance.load(tradeId)
  // if (tradeBalanced) {
  //   tradeBalanced.LastInterestPayed = event.params.lastPayed
  //   tradeBalanced.save()
  // }
}


export function handleRepayLoan(event: RepayLoanEvent): void {
  let poolBalance = PoolBalance.load(event.params.amm)
  if (poolBalance) {
    poolBalance.outstandingLoanUsdc = poolBalance.outstandingLoanUsdc.minus(event.params.amount)
    poolBalance.availableUsdc = poolBalance.availableUsdc.plus(event.params.amount)
    poolBalance.save()
  }
}

export function handleTradingFeeSet(event: TradingFeeSetEvent): void {
  //LoanPool: tradingFee
  let loanPool = LoanPool.load(event.params._ammPool)
  if(loanPool){
    loanPool.tradingFee = event.params._tradingFee
    loanPool.save()
  }
}
