import { Address, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts"
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
  Balance,Debt,FFR,LoanPool,LoanPoolTheseus,PoolBalance,PoolToken,Proposal,Snapshot,Stake,TheseusDAO,Trade,TradeBalance,User,VAmm
 } from "../generated/schema"

export function handleAddTokenToPool(event: AddTokenToPoolEvent): void {
  //PoolToken: ammPool isFrozen tokenID totalSupply
  
  let poolToken = new PoolToken(event.params.ammPool)
  poolToken.tokenId = event.params.tokenId
  poolToken.totalSupply = BigInt.fromI32(0)
  poolToken.ammPool = event.params.ammPool
  poolToken.isFrozen = false
  poolToken.save()
  let theseusToken = PoolToken.load(Address.fromString('0xA547af463d3A202e0E85CA766FB67eE0395e4D5C'))
  if(theseusToken == null){
    theseusToken = new PoolToken(Address.fromString('0xA547af463d3A202e0E85CA766FB67eE0395e4D5C'))
    theseusToken.tokenId = BigInt.fromI32(0)
    theseusToken.totalSupply = BigInt.fromI32(0)
    theseusToken.ammPool = Address.fromString('0xA547af463d3A202e0E85CA766FB67eE0395e4D5C')
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
  if (balance !== null) {
    balance.availableUsdc = balance.availableUsdc.minus(event.params.usdcAmount)
    balance.save()
  }
  //tokenBalance: tokensOwnedByUser
  let stake = Stake.load(Bytes.fromUTF8(event.params.user.toString().concat("-").concat(event.params.ammPool.toString())))
  if (stake == null) {
    stake = new Stake(Bytes.fromUTF8(event.params.user.toString().concat("-").concat(event.params.ammPool.toString())))
    stake.user = event.params.user
    const tokenId = event.params.tokenId
    stake.token = event.params.ammPool
    stake.tokensOwnedbByUser = BigInt.fromI32(0)
    if(tokenId == BigInt.fromI32(0)){
      stake.theseusDAO = event.params.ammPool
    }else{
      stake.ammPool = event.params.ammPool
    }
    stake.totalStaked = BigInt.fromI32(0)
    stake.save()
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
  // stakes: totalStaked 
  let stakes = Stake.load(Bytes.fromUTF8(event.params.user.toString().concat("-").concat(event.params.ammPool.toString())))
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
}

