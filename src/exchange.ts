
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
  Balance,LoanPool,PoolBalance,Trade,TradeBalance,User,TradeOpenValues,CollateralChange,LiquidityChange, PoolPnl, TheseusDAO } from "../generated/schema"
import { log } from "matchstick-as";


interface TradeID {
  sender: Address;
  amm: Address;
  timestamp: BigInt;
  side: BigInt;
}

export function handleAddCollateral(event: AddCollateralEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
  let collateralChange = new CollateralChange(event.transaction.hash.toHex())
  collateralChange.id = event.transaction.hash.toHex()
  collateralChange.tradeId = tradeId
  collateralChange.collateralChange = event.params.amount
  collateralChange.save()

  

  
}


export function handleAddLiquidity(event: AddLiquidityEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
  let liquidityChange = new LiquidityChange(event.transaction.hash.toHex())
  liquidityChange.id = event.transaction.hash.toHex()
  liquidityChange.tradeId = tradeId
  liquidityChange.liquidityChange = event.params.addiotionalPositionSize
  liquidityChange.collateralChange =  event.params.amount
  liquidityChange.save()
}


export function handleClosePosition(event: ClosePositionEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
        let availablePool = poolBalance.availableUsdc
        let newPoolTotal = exhcnageContract.poolTotalUsdcSupply(Address.fromBytes(trade.ammPool))
        poolBalance.totalUsdcSupply = newPoolTotal
        let newPoolAvail = exhcnageContract.poolAvailableUsdc(Address.fromBytes(trade.ammPool))
        poolBalance.availableUsdc = newPoolAvail
        poolBalance.save()
        let diffAvail = availablePool.minus(newPoolAvail)
        let poolPnl = new PoolPnl(trade.ammPool.toHexString().concat('_').concat(event.block.timestamp.toString()))
          if(poolPnl){
            poolPnl.loanPool = trade.ammPool
            poolPnl.timeStamp = event.block.timestamp
            poolPnl.amount = diffAvail.times(BigInt.fromI32(-1))
            poolPnl.save()
          }
        
      }
    }
  }
}


export function handleDeposit(event: DepositEvent): void {
  if(event.params.user == Address.fromString('0x9971256545fe1eE74B224b3D0cA5B4e6DDc3283d')){
    let thes = TheseusDAO.load(Bytes.fromHexString('0x9971256545fe1eE74B224b3D0cA5B4e6DDc3283d'));
    if(thes){
      thes.insuranceFund = thes.insuranceFund.plus(event.params.amount)
      thes.save()
    }
  }else{
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
}

export function handleFfrAdjust(event: FfrAdjustEvent): void {
 
    let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance){
    tradeBalance.collateral = tradeBalance.collateral.plus(event.params.amount)
    tradeBalance.save()
    let trade = Trade.load(tradeBalance.tradeId)
    if(trade){
      trade.ffrPayed = trade.ffrPayed.plus(event.params.amount)
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
    let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
  let trade = Trade.load(tradeId)
  let exhcnageContract = ExchangeContract.bind(event.address)
  if(trade){
    trade.liquidated = true
    trade.isActive = false
    let poolBalance = PoolBalance.load(trade.ammPool)
    if(poolBalance){
      let availablePool = poolBalance.availableUsdc
      poolBalance.totalUsdcSupply = exhcnageContract.poolTotalUsdcSupply(Address.fromBytes(trade.ammPool))
      poolBalance.availableUsdc = exhcnageContract.poolAvailableUsdc(Address.fromBytes(trade.ammPool))
      poolBalance.save()
      let diffAvail = availablePool.minus(poolBalance.availableUsdc)
      let poolPnl = new PoolPnl(trade.ammPool.toHexString().concat('_').concat(event.block.timestamp.toString()))
        if(poolPnl){
          poolPnl.loanPool = trade.ammPool
          poolPnl.timeStamp = event.block.timestamp
          poolPnl.amount = diffAvail
          poolPnl.save()
        }
      
    }
    trade.save()
  }else{
    let trade = new Trade(tradeId)
    trade.tradeId = tradeId
    trade.user = Bytes.fromI32(3939393)
    trade.ammPool = Bytes.fromI32(3939393)
    trade.vamm = Bytes.fromI32(3939393)
    trade.isActive = false
    trade.tradeBalance = tradeId
    trade.created = BigInt.fromI32(22)
    trade.liquidated = true
    trade.startingCost = BigInt.fromI32(22)
    trade.save()
  }
}


export function handleNewPosition(event: NewPositionEvent): void {

 
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timeStamp.toString())
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
  trade.interestPayed = BigInt.fromI32(0)
  trade.ffrPayed = BigInt.fromI32(0)
    
  let tradeOpen = new TradeOpenValues(tradeId)
  trade.tradeOpenValues = tradeId
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

  tradeOpen.openCollateral =BigInt.fromI32(0)
  tradeOpen.openValue = BigInt.fromI32(0)
  tradeOpen.openPositionSize = BigInt.fromI32(0)
  tradeOpen.openLeverage = BigInt.fromI32(0)
  tradeOpen.openEntryPrice = BigInt.fromI32(0)
  tradeOpen.openInterestRate = BigInt.fromI32(0)
  tradeOpen.openLoanAmt = BigInt.fromI32(0)
  tradeOpen.tradingFee= BigInt.fromI32(0)
  tradeOpen.tradeId = tradeId
  tradeOpen.save()
}


export function handleOpenPosition(event: OpenPositionEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
        if(balance ){
          //loan * tradingFee / 10**6
          const feeToPay = event.params.loanAmt.times(tradingFee).div(BigInt.fromI32(10).pow(6))
          balance.availableUsdc = balance.availableUsdc.minus(feeToPay)
          trade.startingCost = event.params.collateral.plus(feeToPay)
          trade.save()
          balance.availableUsdc = balance.availableUsdc.minus(event.params.collateral)
          balance.totalCollateralUsdc = event.params.collateral
          let poolBal = PoolBalance.load(trade.ammPool)
          if(poolBal !== null){
            log.warning('poolPnl {}', [feeToPay.toString()])
            let poolPnl = new PoolPnl(trade.ammPool.toHexString().concat('_').concat(event.block.timestamp.toString()))
            poolPnl.loanPool = trade.ammPool
            poolPnl.timeStamp = event.block.timestamp
            poolPnl.amount = feeToPay
            poolPnl.save()
            poolBal.availableUsdc = poolBal.availableUsdc.plus(feeToPay)
            poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.plus(feeToPay)
            poolBal.save()
          }
          balance.save()
        }
        let tradeOpen = TradeOpenValues.load(tradeId)
        if(tradeOpen){
          tradeOpen.openCollateral = event.params.collateral
          tradeOpen.openValue = event.params.positionSize.times(event.params.entryPrice).div(BigInt.fromI32(10).pow(8))
          tradeOpen.openPositionSize = event.params.positionSize
          tradeOpen.openLeverage = event.params.loanAmt.div(event.params.collateral)
          tradeOpen.openEntryPrice = event.params.entryPrice
          tradeOpen.openInterestRate = interestRate
          tradeOpen.openLoanAmt = event.params.loanAmt
          tradeOpen.tradingFee= event.params.loanAmt.times(tradingFee).div(BigInt.fromI32(10).pow(6))
          tradeOpen.save()
        }
      }     
    }
    tradeBalance.save()
  }

}



export function handlePayInterest(event: PayInterestEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
  let tradeBalance = TradeBalance.load(tradeId)
  if(tradeBalance){
    tradeBalance.collateral = tradeBalance.collateral.minus(event.params.totalAmount)
    tradeBalance.LastInterestPayed = event.block.timestamp

    tradeBalance.save()
  }

  let balance = Balance.load(event.params.trader)
  if(balance){
    balance.totalCollateralUsdc = balance.totalCollateralUsdc.minus(event.params.totalAmount)
    balance.save()
  }
  let trade = Trade.load(tradeId)
  if(trade){
    let poolBal = PoolBalance.load(trade.ammPool)
    trade.interestPayed = trade.interestPayed.plus(event.params.totalAmount)
    trade.save()
    if(poolBal){
      poolBal.availableUsdc = poolBal.availableUsdc.plus(event.params.amountToPool)
      poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.plus(event.params.amountToPool)
      poolBal.save()
    }
    let poolPnl = new PoolPnl(trade.ammPool.toHexString().concat('__').concat(event.block.timestamp.toString()))
    if(poolPnl){
      poolPnl.loanPool = trade.ammPool
      poolPnl.timeStamp = event.block.timestamp
      poolPnl.amount = event.params.amountToPool
      poolPnl.save()
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
}


export function handleRemoveCollateral(event: RemoveCollateralEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
    let collateralChange = new CollateralChange(event.transaction.hash.toHex())
    collateralChange.id = event.transaction.hash.toHex()
    collateralChange.tradeId = tradeId
    collateralChange.collateralChange = event.params.amount.times(BigInt.fromI32(-1))
    collateralChange.save()
  }
}



export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let tradeId = event.params.trader.toHexString().concat('_').concat(event.params.timestamp.toString())
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
    
    let balance = Balance.load(event.params.trader)
    if(balance){
      balance.availableUsdc = balance.availableUsdc.plus(event.params.usdcReturned).minus(event.params.amountOwed)
      balance.save()
    }
  //poolBalance: totalusdcSupply availableUsdc
    let trade = Trade.load(tradeId)
    if(trade){
      let amm = trade.vamm 
    let poolBal = PoolBalance.load(amm)
    const pnl = event.params.usdcReturned.minus(event.params.amountOwed)
    if(poolBal){
      if(pnl > BigInt.fromI32(0)){
        poolBal.availableUsdc = poolBal.availableUsdc.minus(pnl)
        poolBal.totalUsdcSupply = poolBal.totalUsdcSupply.minus(pnl)
        let poolPnl = new PoolPnl(trade.ammPool.toHexString().concat('_').concat(event.block.timestamp.toString()))
          if(poolPnl){
            poolPnl.loanPool = trade.ammPool
            poolPnl.timeStamp = event.block.timestamp
            poolPnl.amount = pnl.times(BigInt.fromI32(-1))
            poolPnl.save()
          }
      }else{
        tradeBalance.collateral = tradeBalance.collateral.minus(pnl)
      }
      poolBal.save()
    }
  }
    tradeBalance.save()
  }
  let liquidityChange = new LiquidityChange(event.transaction.hash.toHex())
  liquidityChange.id = event.transaction.hash.toHex()
  liquidityChange.tradeId = tradeId
  liquidityChange.liquidityChange = event.params.positionSizeRemoved.times(BigInt.fromI32(-1))
  liquidityChange.collateralChange =  (event.params.usdcReturned.minus(event.params.amountOwed)).times(BigInt.fromI32(-1))
  liquidityChange.save()
}


export function handleWithdraw(event: WithdrawEvent): void {
  if(event.params.user == Address.fromString('0x9971256545fe1eE74B224b3D0cA5B4e6DDc3283d')){
    let thes = TheseusDAO.load(Bytes.fromHexString('0x9971256545fe1eE74B224b3D0cA5B4e6DDc3283d'));
    if(thes){ 
      thes.insuranceFund = thes.insuranceFund.minus(event.params.amount)
      thes.save()
    }
  }else{
    let balance = Balance.load(event.params.user)
    if(balance !=null){
      balance.availableUsdc = balance.availableUsdc.minus(event.params.amount)
      balance.save()
    }
  }

}
