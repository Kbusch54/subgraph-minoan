import { BigInt, Bytes } from "@graphprotocol/graph-ts"
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
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,Stakes,TheseusDAO,Trade,TradeBalance,User,VAmm
 } from "../generated/schema"

export function handleAddTokenToPool(event: AddTokenToPoolEvent): void {
  //PoolToken: ammPool isFrozen tokenID totalSupply
  let poolToken =  new PoolToken(Bytes.fromBigInt(event.params.tokenId))
  poolToken.tokenId = event.params.tokenId
  poolToken.totalSupply = BigInt.fromI32(0)
  poolToken.ammPool = event.params.ammPool
  poolToken.isFrozen = false
}

export function handleFrozenStake(event: FrozenStakeEvent): void {
  let stakingContract = StakingContract.bind(event.address)
  let tokenId = stakingContract.ammPoolToTokenId(event.params.ammPool)
 let poolToken = PoolToken.load(Bytes.fromBigInt(tokenId))
  if(poolToken != null){
    poolToken.isFrozen = true
    poolToken.save()
  }  
}

export function handleStake(event: StakeEvent): void {
  //balance: avaialbebalance
  let balance = Balance.load(event.params.user)
  if (balance != null) {
    balance.availableUsdc = balance.availableUsdc.minus(event.params.usdcAmount)
    balance.save()
  }
  //tokenBalance: tokensOwnedByUser
  let stake = Stakes.load(Bytes.fromHexString(event.params.user.toString().concat("-").concat(event.params.tokenId.toString())))
  if (stake == null) {
    stake = new Stakes(Bytes.fromHexString(event.params.user.toString().concat("-").concat(event.params.tokenId.toString())))
    stake.user = event.params.user
    stake.token = Bytes.fromBigInt(event.params.tokenId)
    stake.tokensOwnedbByUser = BigInt.fromI32(0)
    stake.ammPool = event.params.ammPool
    stake.totalStaked = BigInt.fromI32(0)
  }
  stake.tokensOwnedbByUser = stake.tokensOwnedbByUser.plus(event.params.tokensMinted)
  stake.totalStaked = stake.totalStaked.plus(event.params.usdcAmount)
  stake.save()
  //poolToken: totalSupply 
  let poolToken = PoolToken.load(Bytes.fromBigInt(event.params.tokenId))
  if (poolToken != null) {
    poolToken.totalSupply = poolToken.totalSupply.plus(event.params.tokensMinted)
    poolToken.save()
  }
  //poolBalance: totalUSDCBalance availableUSDCBalance 
  let poolBalance = PoolBalance.load(event.params.ammPool)
  if (poolBalance != null) {
    poolBalance.totalUsdcSupply = poolBalance.totalUsdcSupply.plus(event.params.usdcAmount)
    poolBalance.availableUsdc = poolBalance.availableUsdc.plus(event.params.usdcAmount)
    poolBalance.save()
  }
}

export function handleUnFrozenStake(event: UnFrozenStakeEvent): void {
  let stakingContract = StakingContract.bind(event.address)
  let tokenId = stakingContract.ammPoolToTokenId(event.params.ammPool)
  let poolToken = PoolToken.load(Bytes.fromBigInt(tokenId))
  if(poolToken != null){
    poolToken.isFrozen = false
    poolToken.save()
  }
}

export function handleUnstake(event: UnstakeEvent): void {
  //balance: avaialbebalance
  let balance = Balance.load(event.params.user)
  if (balance != null) {
    balance.availableUsdc = balance.availableUsdc.plus(event.params.usdcAmount)
    balance.save()
  }
  //poolToken: totalSupply 
  let poolToken = PoolToken.load(Bytes.fromBigInt(event.params.tokenId))
  if (poolToken != null) {
    poolToken.totalSupply = poolToken.totalSupply.minus(event.params.tokensBurned)
    poolToken.save()
  }
  // stakes: totalStaked 
  let stakes = Stakes.load(Bytes.fromHexString(event.params.user.toString().concat("-").concat(event.params.tokenId.toString())))
  if (stakes != null) {
    stakes.totalStaked = stakes.totalStaked.minus(event.params.usdcAmount)
    stakes.tokensOwnedbByUser = stakes.tokensOwnedbByUser.minus(event.params.tokensBurned)
    stakes.save()
  }
  //poolBalance: totalUSDCBalance availableUSDCBalance 
  let poolBalance = PoolBalance.load(event.params.ammPool)
  if (poolBalance != null) {
    poolBalance.totalUsdcSupply = poolBalance.totalUsdcSupply.minus(event.params.usdcAmount)
    poolBalance.availableUsdc = poolBalance.availableUsdc.minus(event.params.usdcAmount)
    poolBalance.save()
  }
}

