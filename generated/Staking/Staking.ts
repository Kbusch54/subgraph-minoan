// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AddTokenToPool extends ethereum.Event {
  get params(): AddTokenToPool__Params {
    return new AddTokenToPool__Params(this);
  }
}

export class AddTokenToPool__Params {
  _event: AddTokenToPool;

  constructor(event: AddTokenToPool) {
    this._event = event;
  }

  get ammPool(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class FrozenStake extends ethereum.Event {
  get params(): FrozenStake__Params {
    return new FrozenStake__Params(this);
  }
}

export class FrozenStake__Params {
  _event: FrozenStake;

  constructor(event: FrozenStake) {
    this._event = event;
  }

  get ammPool(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Stake extends ethereum.Event {
  get params(): Stake__Params {
    return new Stake__Params(this);
  }
}

export class Stake__Params {
  _event: Stake;

  constructor(event: Stake) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get usdcAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get ammPool(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get tokensMinted(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class UnFrozenStake extends ethereum.Event {
  get params(): UnFrozenStake__Params {
    return new UnFrozenStake__Params(this);
  }
}

export class UnFrozenStake__Params {
  _event: UnFrozenStake;

  constructor(event: UnFrozenStake) {
    this._event = event;
  }

  get ammPool(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unstake extends ethereum.Event {
  get params(): Unstake__Params {
    return new Unstake__Params(this);
  }
}

export class Unstake__Params {
  _event: Unstake;

  constructor(event: Unstake) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get usdcAmount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get ammPool(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get tokensBurned(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Staking extends ethereum.SmartContract {
  static bind(address: Address): Staking {
    return new Staking("Staking", address);
  }

  addAmmTokenToPool(_ammPool: Address): BigInt {
    let result = super.call(
      "addAmmTokenToPool",
      "addAmmTokenToPool(address):(uint256)",
      [ethereum.Value.fromAddress(_ammPool)]
    );

    return result[0].toBigInt();
  }

  try_addAmmTokenToPool(_ammPool: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "addAmmTokenToPool",
      "addAmmTokenToPool(address):(uint256)",
      [ethereum.Value.fromAddress(_ammPool)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ammPoolToTokenId(param0: Address): BigInt {
    let result = super.call(
      "ammPoolToTokenId",
      "ammPoolToTokenId(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_ammPoolToTokenId(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ammPoolToTokenId",
      "ammPoolToTokenId(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  exchange(): Address {
    let result = super.call("exchange", "exchange():(address)", []);

    return result[0].toAddress();
  }

  try_exchange(): ethereum.CallResult<Address> {
    let result = super.tryCall("exchange", "exchange():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  hasRegistered(param0: Address): boolean {
    let result = super.call("hasRegistered", "hasRegistered(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_hasRegistered(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasRegistered",
      "hasRegistered(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  isFrozen(param0: Address): boolean {
    let result = super.call("isFrozen", "isFrozen(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isFrozen(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isFrozen", "isFrozen(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  poolToken(): Address {
    let result = super.call("poolToken", "poolToken():(address)", []);

    return result[0].toAddress();
  }

  try_poolToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("poolToken", "poolToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddAmmTokenToPoolCall extends ethereum.Call {
  get inputs(): AddAmmTokenToPoolCall__Inputs {
    return new AddAmmTokenToPoolCall__Inputs(this);
  }

  get outputs(): AddAmmTokenToPoolCall__Outputs {
    return new AddAmmTokenToPoolCall__Outputs(this);
  }
}

export class AddAmmTokenToPoolCall__Inputs {
  _call: AddAmmTokenToPoolCall;

  constructor(call: AddAmmTokenToPoolCall) {
    this._call = call;
  }

  get _ammPool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAmmTokenToPoolCall__Outputs {
  _call: AddAmmTokenToPoolCall;

  constructor(call: AddAmmTokenToPoolCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class FreezeCall extends ethereum.Call {
  get inputs(): FreezeCall__Inputs {
    return new FreezeCall__Inputs(this);
  }

  get outputs(): FreezeCall__Outputs {
    return new FreezeCall__Outputs(this);
  }
}

export class FreezeCall__Inputs {
  _call: FreezeCall;

  constructor(call: FreezeCall) {
    this._call = call;
  }

  get _ammPool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class FreezeCall__Outputs {
  _call: FreezeCall;

  constructor(call: FreezeCall) {
    this._call = call;
  }
}

export class SetExchangeCall extends ethereum.Call {
  get inputs(): SetExchangeCall__Inputs {
    return new SetExchangeCall__Inputs(this);
  }

  get outputs(): SetExchangeCall__Outputs {
    return new SetExchangeCall__Outputs(this);
  }
}

export class SetExchangeCall__Inputs {
  _call: SetExchangeCall;

  constructor(call: SetExchangeCall) {
    this._call = call;
  }

  get _exchange(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetExchangeCall__Outputs {
  _call: SetExchangeCall;

  constructor(call: SetExchangeCall) {
    this._call = call;
  }
}

export class SetPoolTokenCall extends ethereum.Call {
  get inputs(): SetPoolTokenCall__Inputs {
    return new SetPoolTokenCall__Inputs(this);
  }

  get outputs(): SetPoolTokenCall__Outputs {
    return new SetPoolTokenCall__Outputs(this);
  }
}

export class SetPoolTokenCall__Inputs {
  _call: SetPoolTokenCall;

  constructor(call: SetPoolTokenCall) {
    this._call = call;
  }

  get _ammAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetPoolTokenCall__Outputs {
  _call: SetPoolTokenCall;

  constructor(call: SetPoolTokenCall) {
    this._call = call;
  }
}

export class StakeCall extends ethereum.Call {
  get inputs(): StakeCall__Inputs {
    return new StakeCall__Inputs(this);
  }

  get outputs(): StakeCall__Outputs {
    return new StakeCall__Outputs(this);
  }
}

export class StakeCall__Inputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _ammPool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class StakeCall__Outputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }
}

export class UnFreezeCall extends ethereum.Call {
  get inputs(): UnFreezeCall__Inputs {
    return new UnFreezeCall__Inputs(this);
  }

  get outputs(): UnFreezeCall__Outputs {
    return new UnFreezeCall__Outputs(this);
  }
}

export class UnFreezeCall__Inputs {
  _call: UnFreezeCall;

  constructor(call: UnFreezeCall) {
    this._call = call;
  }

  get _ammPool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UnFreezeCall__Outputs {
  _call: UnFreezeCall;

  constructor(call: UnFreezeCall) {
    this._call = call;
  }
}

export class UnStakeCall extends ethereum.Call {
  get inputs(): UnStakeCall__Inputs {
    return new UnStakeCall__Inputs(this);
  }

  get outputs(): UnStakeCall__Outputs {
    return new UnStakeCall__Outputs(this);
  }
}

export class UnStakeCall__Inputs {
  _call: UnStakeCall;

  constructor(call: UnStakeCall) {
    this._call = call;
  }

  get _amountToBurn(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _ammPool(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class UnStakeCall__Outputs {
  _call: UnStakeCall;

  constructor(call: UnStakeCall) {
    this._call = call;
  }
}

export class UpdateTheseusCall extends ethereum.Call {
  get inputs(): UpdateTheseusCall__Inputs {
    return new UpdateTheseusCall__Inputs(this);
  }

  get outputs(): UpdateTheseusCall__Outputs {
    return new UpdateTheseusCall__Outputs(this);
  }
}

export class UpdateTheseusCall__Inputs {
  _call: UpdateTheseusCall;

  constructor(call: UpdateTheseusCall) {
    this._call = call;
  }

  get _theseusDao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateTheseusCall__Outputs {
  _call: UpdateTheseusCall;

  constructor(call: UpdateTheseusCall) {
    this._call = call;
  }
}
