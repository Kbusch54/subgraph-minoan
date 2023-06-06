
import { Address, BigInt,Bytes, ethereum } from "@graphprotocol/graph-ts";
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
  Withdraw as WithdrawEvent,
  Exchange as ExchangeContract
} from "../generated/Exchange/Exchange"
import {
  
  Balance,LoanPool,PoolBalance,Trade,TradeBalance,User } from "../generated/schema"
import { log } from "matchstick-as";
 
//  export  function decodeTradeId(tradeId: Bytes): [Bytes, Bytes, BigInt, BigInt] {
    
//   let sender = Bytes.fromHexString(tradeId.slice(0, 20).toString());
//   let amm = Bytes.fromHexString(tradeId.slice(20, 40).toString());
//   let timestamp = BigInt.fromString(tradeId.slice(40, 72).toString());
//   let side = BigInt.fromString(tradeId.slice(72, 104).toString());

//   return [sender, amm, timestamp, side];
// }

interface TradeID {
  sender: Address;
  amm: Address;
  timestamp: BigInt;
  side: BigInt;
}
export function getTradeId(tradeId: Bytes): string {
  // Define the types of the data
  const types = "(address,address, uint256, int256)";
  // web3.eth.abi.decodeParameters(types, encodedData)
  // const decoded = ethereum.decode(types, tradeId)!.toTuple()!;
  // Decode the data

    return ('0x0000000000000_0')
   
  
}
export function handleAddCollateral(event: AddCollateralEvent): void {
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let amm = pos.getAmm()
    let timestamp = pos.getTimeStamp()
  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = Trade.load(tradeId)
  if(trade){
    trade.startingCost = trade.startingCost.plus(event.params.amount)
    trade.save()
    let balance = Balance.load(trade.user)
    let tradeBalance = TradeBalance.load(tradeId)

    if(balance){
      balance.availableUsdc = balance.availableUsdc.minus(event.params.amount)
      balance.totalCollateralUsdc = balance.totalCollateralUsdc.plus(event.params.amount)
      balance.save()
    }
    if(tradeBalance){
      tradeBalance.collateral = tradeBalance.collateral.plus(event.params.amount)
      tradeBalance.save()
    }
  }
  
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  //trade 
  let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = Trade.load(tradeId)
  if(trade){
    trade.startingCost = trade.startingCost.plus(event.params.amount)
    trade.save()
  //tradeBalance 
    let tradeBalance = TradeBalance.load(tradeId)
    if(tradeBalance){
      const calc = (tradeBalance.loanAmt.plus(event.params.newLoan)).div((tradeBalance.loanAmt.div(tradeBalance.leverage)).plus(event.params.amount))
      tradeBalance.collateral = tradeBalance.collateral.plus(event.params.amount)
      tradeBalance.loanAmt = tradeBalance.loanAmt.plus(event.params.newLoan)
      tradeBalance.positionSize = tradeBalance.positionSize.plus(event.params.addiotionalPositionSize)
      tradeBalance.leverage = calc
      let lp = LoanPool.load(trade.ammPool)
      if(lp){
        const interestRate = lp.interestRate
        tradeBalance.interestRate = interestRate
      }
      let exchangeContract = ExchangeContract.bind(event.address)
      let avgEntryPrice = exchangeContract.positions(event.params.tradeId)
      tradeBalance.entryPrice = avgEntryPrice.value4
      tradeBalance.save()
    }
    let balance = Balance.load(trade.user)
    //balance
    if(balance){
      balance.availableUsdc = balance.availableUsdc.minus(event.params.amount)
      balance.totalCollateralUsdc = balance.totalCollateralUsdc.plus(event.params.amount)
      balance.save()
    }
    trade.save()
  }
}


export function handleClosePosition(event: ClosePositionEvent): void {
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = Trade.load(tradeId)
  let exhcnageContract = ExchangeContract.bind(event.address)
  if(trade){
    trade.isActive = false
    trade.save()
    let tradeBalance = TradeBalance.load(tradeId)
    if(tradeBalance){
      tradeBalance.loanAmt = BigInt.fromI32(0)
      const tradeCollateral = tradeBalance.collateral
      tradeBalance.collateral = BigInt.fromI32(0)
      tradeBalance.positionSize = BigInt.fromI32(0)
      tradeBalance.leverage = BigInt.fromI32(0)
      tradeBalance.exitPrice = event.params.closePrice
      tradeBalance.exitTime = event.params.closeTime
      if(tradeBalance.pnl){
        tradeBalance.pnl = tradeBalance.pnl.plus(event.params.pnl)
      }else{
        tradeBalance.pnl = event.params.pnl
      }
      tradeBalance.save()
      let balance = Balance.load(trade.user)
      if(balance){
       
  
        const userAddress = Address.fromBytes(trade.user)
        balance.availableUsdc = exhcnageContract.availableBalance(userAddress)
        balance.totalCollateralUsdc = balance.totalCollateralUsdc.minus(tradeCollateral)
        balance.save()
      }
      let poolBalance = PoolBalance.load(trade.ammPool)
      if(poolBalance){
        poolBalance.totalUsdcSupply = exhcnageContract.poolTotalUsdcSupply(Address.fromBytes(trade.ammPool))
        poolBalance.availableUsdc = exhcnageContract.poolAvailableUsdc(Address.fromBytes(trade.ammPool))
        poolBalance.save()
      }
    }
  }
}


export function handleDeposit(event: DepositEvent): void {
  let user = User.load(event.params.user)
  let balance = Balance.load(event.params.user)
  if (user == null) {
    user = new User(event.params.user)
    user.address = event.params.user
    user.balances = event.params.user
    user.save()
  }
  if(balance == null){
    balance = new Balance(event.params.user)
    balance.user = event.params.user
    balance.availableUsdc = event.params.amount
    balance.totalCollateralUsdc = BigInt.fromI32(0)
    balance.save()
  }else{
    balance.availableUsdc = balance.availableUsdc.plus(event.params.amount)
    balance.save()
  }

}

export function handleFfrAdjust(event: FfrAdjustEvent): void {
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance){
    tradeBalance.collateral = tradeBalance.collateral.plus(event.params.amount)
    tradeBalance.save()
    let trade = Trade.load(tradeBalance.tradeId)
    if(trade){

      let amm = trade.ammPool
      let poolBalance = PoolBalance.load(amm)
      if(poolBalance){
        poolBalance.availableUsdc = poolBalance.availableUsdc.minus(event.params.amount)
        poolBalance.totalUsdcSupply = poolBalance.totalUsdcSupply.minus(event.params.amount)
        poolBalance.save()
      }
    }
  }
}


export function handleLiquidated(event: LiquidatedEvent): void {
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = Trade.load(tradeId)
  if(trade){
    trade.liquidated = true
    trade.isActive = false
    trade.save()
  }
}


export function handleNewPosition(event: NewPositionEvent): void {
 
let sender = event.params.trader
let timestamp = event.params.timeStamp;

let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = new Trade(tradeId)
  trade.tradeId = tradeId
  trade.user = event.params.trader
  trade.ammPool = event.params.amm
  trade.vamm = event.params.amm
  trade.isActive = true
  trade.tradeBalance = tradeId
  trade.created = event.params.timeStamp
  trade.liquidated = false
  trade.startingCost = BigInt.fromI32(0)
  trade.save()
  let tradeBalance = new TradeBalance(tradeId)

  tradeBalance.pnl = BigInt.fromI32(0)
  tradeBalance.collateral = BigInt.fromI32(0)
  tradeBalance.leverage = BigInt.fromI32(0)
  tradeBalance.loanAmt = BigInt.fromI32(0)
  tradeBalance.interestRate = BigInt.fromI32(0)
  tradeBalance.positionSize = BigInt.fromI32(0)
  tradeBalance.entryPrice = BigInt.fromI32(0)
  tradeBalance.LastFFRPayed = BigInt.fromI32(0)
  tradeBalance.tradeId = tradeId
  tradeBalance.LastInterestPayed = event.params.timeStamp
  tradeBalance.side = event.params.side

  tradeBalance.save()
}


export function handleOpenPosition(event: OpenPositionEvent): void {
 
  let exCon = ExchangeContract.bind(event.address)
  let pos = exCon.positions(event.params.tradeId)
  // let sender =pos.getTrader()
  let sender =event.transaction.from
  let timestamp = event.block.timestamp
  // let timestamp = pos.getTimeStamp()
  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance !== null){
    tradeBalance.LastFFRPayed = event.params.lastFundingRate
    tradeBalance.entryPrice = event.params.entryPrice
    tradeBalance.loanAmt = event.params.loanAmt
    tradeBalance.collateral = event.params.collateral
    tradeBalance.leverage = event.params.loanAmt.div(event.params.collateral)
    tradeBalance.positionSize = event.params.positionSize
    let trade = Trade.load(tradeId)
    if(trade !== null){
      let lp = LoanPool.load(trade.ammPool)
      if(lp !== null){
        const tradingFee = lp.tradingFee
        const interestRate = lp.interestRate
        tradeBalance.interestRate = interestRate
        let balance = Balance.load(trade.user)
        if(balance !== null){
          //loan * tradingFee / 10**6
          const feeToPay = event.params.loanAmt.times(tradingFee).div(BigInt.fromI32(10).pow(6))
          balance.availableUsdc = balance.availableUsdc.minus(feeToPay)
          trade.startingCost = event.params.collateral.plus(feeToPay)
          trade.save()
          balance.availableUsdc = balance.availableUsdc.minus(event.params.collateral)
          balance.totalCollateralUsdc = event.params.collateral
          let poolBal = PoolBalance.load(trade.ammPool)
          if(poolBal !== null){
            poolBal.availableUsdc = poolBal.availableUsdc.plus(feeToPay)
            poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.plus(feeToPay)
            poolBal.save()
          }
          balance.save()
        }
      }     
    }
    tradeBalance.save()
  }
}



export function handlePayInterest(event: PayInterestEvent): void {
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()
    let amm = pos.getAmm()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance){
    tradeBalance.collateral = tradeBalance.collateral.minus(event.params.totalAmount)
    tradeBalance.LastInterestPayed = event.block.timestamp
  }

  let balance = Balance.load(sender)
  if(balance){
    balance.totalCollateralUsdc = balance.totalCollateralUsdc.minus(event.params.totalAmount)
    balance.save()
  }
  let poolBal = PoolBalance.load(amm)
  if(poolBal){
    poolBal.availableUsdc = poolBal.availableUsdc.plus(event.params.amountToPool)
    poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.plus(event.params.amountToPool)
    poolBal.save()
  }
  if(event.params.amountToPool !== event.params.totalAmount){
    let exhcnageCon  = ExchangeContract.bind(event.address)
    let theseusAdd = exhcnageCon.theseusDao()
    let theseus = Balance.load(theseusAdd)
    if(theseus){
      theseus.availableUsdc = theseus.availableUsdc.plus(event.params.amountToPool)
      theseus.save()
    }
  }
}


export function handleRemoveCollateral(event: RemoveCollateralEvent): void {
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let trade = Trade.load(tradeId)
  if(trade){
    trade.startingCost = trade.startingCost.minus(event.params.amount)
    trade.save()
    let balance = Balance.load(trade.user)
    let tradeBalance = TradeBalance.load(tradeId)

    if(balance && tradeBalance){
      balance.availableUsdc = balance.availableUsdc.plus(event.params.amount)
      balance.totalCollateralUsdc = balance.totalCollateralUsdc.minus(event.params.amount)
      tradeBalance.collateral = tradeBalance.collateral.minus(event.params.amount)
      balance.save()
      tradeBalance.save()
    }
  }
}



export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  //
  //tradeBalance: loanAmt positionSize
   // @ts-ignore
   let exCon = ExchangeContract.bind(event.address)
    let pos = exCon.positions(event.params.tradeId)
    let sender =pos.getTrader()
    let timestamp = pos.getTimeStamp()

  let tradeId = sender.toHexString().concat('_').concat(timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance){
    tradeBalance.loanAmt = tradeBalance.loanAmt.minus(event.params.amountOwed)
    tradeBalance.positionSize = tradeBalance.positionSize.minus(event.params.positionSizeRemoved)
    if(tradeBalance.pnl){
      tradeBalance.pnl = tradeBalance.pnl.plus(event.params.usdcReturned).minus(event.params.amountOwed)
    }else{
      tradeBalance.pnl = event.params.usdcReturned.minus(event.params.amountOwed)
    }
  //balance:  availableUsdc
    
    let balance = Balance.load(sender)
    if(balance){
      balance.availableUsdc = balance.availableUsdc.plus(event.params.usdcReturned).minus(event.params.amountOwed)
      balance.save()
    }
  //poolBalance: totalusdcSupply availableUsdc
    let amm = Bytes.fromHexString(tradeId.slice(20, 40).toString());
    let poolBal = PoolBalance.load(amm)
    const pnl = event.params.usdcReturned.minus(event.params.amountOwed)
    if(poolBal){
      if(pnl > BigInt.fromI32(0)){
      poolBal.availableUsdc = poolBal.availableUsdc.minus(pnl)
      poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.minus(pnl)
      }else{
        tradeBalance.collateral = tradeBalance.collateral.minus(pnl)
      }
    poolBal.save()
    }
    tradeBalance.save()
  }
}


export function handleWithdraw(event: WithdrawEvent): void {
  let balance = Balance.load(event.params.user)
  if(balance !=null){
    balance.availableUsdc = balance.availableUsdc.minus(event.params.amount)
    balance.save()
  }

}
