import { Address, BigInt, ByteArray, Bytes, log } from "@graphprotocol/graph-ts"
import {
  AddTokenToPool as AddTokenToPoolEvent,
  FrozenStake as FrozenStakeEvent,
  Stake as StakeEvent,
  UnFrozenStake as UnFrozenStakeEvent,
  Unstake as UnstakeEvent,
  Staking as StakingContract
} from "../generated/Staking/Staking"
import {
  AriadneDAO,PriceData,
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,Stake,TheseusDAO,Trade,TradeBalance,User,VAmm,SingleStake,SingleUnstake
 } from "../generated/schema"
import { theseusAdd } from "./loan-pool"
export function handleAddTokenToPool(event: AddTokenToPoolEvent): void {
  //PoolToken: ammPool isFrozen tokenID totalSupply
  
  let poolToken = new PoolToken(event.params.ammPool)
  poolToken.tokenId = event.params.tokenId
  poolToken.totalSupply = BigInt.fromI32(0)
  poolToken.ammPool = event.params.ammPool
  poolToken.isFrozen = false
  poolToken.save()
  let theseus = Bytes.fromHexString(theseusAdd)
  let theseusToken = PoolToken.load(theseus)
  if(theseusToken == null){
    theseusToken = new PoolToken(theseus)
    theseusToken.tokenId = BigInt.fromI32(0)
    theseusToken.totalSupply = BigInt.fromI32(0)
    theseusToken.ammPool = theseus
    theseusToken.isFrozen = false
    theseusToken.save()
  }
}

export function handleFrozenStake(event: FrozenStakeEvent): void {
 let poolToken = PoolToken.load(event.params.ammPool)
  if(poolToken !== null){
    poolToken.isFrozen = true
    poolToken.save()
  }  
}

export function handleStake(event: StakeEvent): void {
  //balance: avaialbebalance
  let balance = Balance.load(event.params.user)
  const tokenId = event.params.tokenId
  if (balance !== null) {
    balance.availableUsdc = balance.availableUsdc.minus(event.params.usdcAmount)
    balance.save()
  }
  if(event.params.ammPool == Address.fromHexString(theseusAdd)){
    log.warning("theseusDAO marked for death {}",[
      event.params.ammPool.toHexString()
    ])
    let theseus = TheseusDAO.load(Bytes.fromHexString(theseusAdd))
    
    if(theseus == null){
      let id = Bytes.fromHexString(theseusAdd)
      theseus = new TheseusDAO(id)
      theseus.currentId = BigInt.fromI32(0)
      theseus.maxVotingPower = BigInt.fromI32(0)
      theseus.votesNeededPercentage = BigInt.fromI32(7500)
      theseus.minVotingPower = BigInt.fromI32(1)
      theseus.votingTime = BigInt.fromI32(7200)
      theseus.tokenId = BigInt.fromI32(0)
      theseus.insuranceFundMin = BigInt.fromI32(0)
      theseus.insuranceFund = event.params.usdcAmount
      theseus.poolToken = id
      theseus.loanPoolTheseus = id
      theseus.save()
    }else{
      theseus.insuranceFund = theseus.insuranceFund.plus(event.params.usdcAmount)
      theseus.save()
    }
  }
  //tokenBalance: tokensOwnedByUser
  let stake = Stake.load(Bytes.fromUTF8(event.params.user.toHexString().concat("-").concat(event.params.ammPool.toHexString())))
  if (stake == null) {
    stake = new Stake(Bytes.fromUTF8(event.params.user.toHexString().concat("-").concat(event.params.ammPool.toHexString())))
    stake.user = event.params.user
    stake.token = event.params.ammPool
    stake.tokensOwnedbByUser = BigInt.fromI32(0)
    if(tokenId.equals(BigInt.zero())){
 
      stake.theseusDAO = event.params.ammPool
    }else{
      stake.ammPool = event.params.ammPool
    }
    stake.totalStaked = BigInt.fromI32(0)
  }
  stake.tokensOwnedbByUser = stake.tokensOwnedbByUser.plus(event.params.tokensMinted)
  stake.totalStaked = stake.totalStaked.plus(event.params.usdcAmount)
  stake.save()
  //poolToken: totalSupply 
  let poolToken = PoolToken.load(event.params.ammPool)
  if (poolToken !== null) {
    poolToken.totalSupply = poolToken.totalSupply.plus(event.params.tokensMinted)
    poolToken.save()
  }
  //poolBalance: totalUSDCBalance availableUSDCBalance 
  let poolBalance = PoolBalance.load(event.params.ammPool)
  if (poolBalance !== null) {
    poolBalance.totalUsdcSupply = poolBalance.totalUsdcSupply.plus(event.params.usdcAmount)
    poolBalance.availableUsdc = poolBalance.availableUsdc.plus(event.params.usdcAmount)
    poolBalance.save()
  }
  let single = new SingleStake(event.transaction.hash)
  single.user = event.params.user
  if(tokenId.equals(BigInt.zero())){
    single.theseusDAO = event.params.ammPool
  }else{
    single.ammPool = event.params.ammPool
  }
  single.usdcStaked = event.params.usdcAmount
  single.token = event.params.ammPool
  single.tokensMinted = event.params.tokensMinted
  single.stake = stake.id
  single.timeStamp = event.block.timestamp
  single.save()
}

export function handleUnFrozenStake(event: UnFrozenStakeEvent): void {
  let stakingContract = StakingContract.bind(event.address)
  let tokenId = stakingContract.ammPoolToTokenId(event.params.ammPool)
  let poolToken = PoolToken.load(event.params.ammPool)
  if(poolToken !== null){
    poolToken.isFrozen = false
    poolToken.save()
  }
}

export function handleUnstake(event: UnstakeEvent): void {
  //balance: avaialbebalance
  let balance = Balance.load(event.params.user)
  if (balance !== null) {
    balance.availableUsdc = balance.availableUsdc.plus(event.params.usdcAmount)
    balance.save()
  }
  //poolToken: totalSupply 
  let poolToken = PoolToken.load(event.params.ammPool)
  if (poolToken !== null) {
    poolToken.totalSupply = poolToken.totalSupply.minus(event.params.tokensBurned)
    poolToken.save()
  }
  if(event.params.ammPool.toHexString() == theseusAdd){
    let theseus = TheseusDAO.load(Bytes.fromHexString(theseusAdd))
    if(theseus){
    theseus.insuranceFund = theseus.insuranceFund.plus(event.params.usdcAmount)
      theseus.save()
    }
  }
  // stakes: totalStaked 
  let stakes = Stake.load(Bytes.fromUTF8(event.params.user.toHexString().concat("-").concat(event.params.ammPool.toHexString())))
  if (stakes !== null) {
    stakes.totalStaked = stakes.totalStaked.minus(event.params.usdcAmount)
    stakes.tokensOwnedbByUser = stakes.tokensOwnedbByUser.minus(event.params.tokensBurned)
    stakes.save()
  }
  //poolBalance: totalUSDCBalance availableUSDCBalance 
  let poolBalance = PoolBalance.load(event.params.ammPool)
  if (poolBalance !== null) {
    poolBalance.totalUsdcSupply = poolBalance.totalUsdcSupply.minus(event.params.usdcAmount)
    poolBalance.availableUsdc = poolBalance.availableUsdc.minus(event.params.usdcAmount)
    poolBalance.save()
  }
  let single = new SingleUnstake(event.transaction.hash)
  single.user = event.params.user
  single.usdcUnstaked = event.params.usdcAmount
  single.token = event.params.ammPool
  single.tokensBurned = event.params.tokensBurned
  const tokenId = event.params.tokenId
  single.timeStamp = event.block.timestamp
  if(tokenId.equals(BigInt.zero())){
    single.theseusDAO = event.params.ammPool
  }else{
    single.ammPool = event.params.ammPool
  }
  if(stakes){

    single.stake = stakes.id
  }
  single.save()
}

