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

export class AddAmm extends ethereum.Event {
  get params(): AddAmm__Params {
    return new AddAmm__Params(this);
  }
}

export class AddAmm__Params {
  _event: AddAmm;

  constructor(event: AddAmm) {
    this._event = event;
  }

  get ammAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[2].value.toString();
  }

  get payload(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class AmmClosePosition extends ethereum.Event {
  get params(): AmmClosePosition__Params {
    return new AmmClosePosition__Params(this);
  }
}

export class AmmClosePosition__Params {
  _event: AmmClosePosition;

  constructor(event: AmmClosePosition) {
    this._event = event;
  }

  get ammAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AmmOpenPosition extends ethereum.Event {
  get params(): AmmOpenPosition__Params {
    return new AmmOpenPosition__Params(this);
  }
}

export class AmmOpenPosition__Params {
  _event: AmmOpenPosition;

  constructor(event: AmmOpenPosition) {
    this._event = event;
  }

  get ammAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Freeze extends ethereum.Event {
  get params(): Freeze__Params {
    return new Freeze__Params(this);
  }
}

export class Freeze__Params {
  _event: Freeze;

  constructor(event: Freeze) {
    this._event = event;
  }

  get amm(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NewSnappshot extends ethereum.Event {
  get params(): NewSnappshot__Params {
    return new NewSnappshot__Params(this);
  }
}

export class NewSnappshot__Params {
  _event: NewSnappshot;

  constructor(event: NewSnappshot) {
    this._event = event;
  }

  get amm(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class PriceChange extends ethereum.Event {
  get params(): PriceChange__Params {
    return new PriceChange__Params(this);
  }
}

export class PriceChange__Params {
  _event: PriceChange;

  constructor(event: PriceChange) {
    this._event = event;
  }

  get amm(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get currentIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get indexPrice(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get baseAsset(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get quoteAsset(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get ffr(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class RemoveAmm extends ethereum.Event {
  get params(): RemoveAmm__Params {
    return new RemoveAmm__Params(this);
  }
}

export class RemoveAmm__Params {
  _event: RemoveAmm;

  constructor(event: RemoveAmm) {
    this._event = event;
  }

  get ammAddr(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class UnFreeze extends ethereum.Event {
  get params(): UnFreeze__Params {
    return new UnFreeze__Params(this);
  }
}

export class UnFreeze__Params {
  _event: UnFreeze;

  constructor(event: UnFreeze) {
    this._event = event;
  }

  get amm(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AmmViewer extends ethereum.SmartContract {
  static bind(address: Address): AmmViewer {
    return new AmmViewer("AmmViewer", address);
  }

  getPriceValue(_stock: Bytes): BigInt {
    let result = super.call(
      "getPriceValue",
      "getPriceValue(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_stock)]
    );

    return result[0].toBigInt();
  }

  try_getPriceValue(_stock: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPriceValue",
      "getPriceValue(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(_stock)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isAmm(param0: Address): boolean {
    let result = super.call("isAmm", "isAmm(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_isAmm(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isAmm", "isAmm(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  payload(): Bytes {
    let result = super.call("payload", "payload():(bytes)", []);

    return result[0].toBytes();
  }

  try_payload(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("payload", "payload():(bytes)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  priceFeed(): Address {
    let result = super.call("priceFeed", "priceFeed():(address)", []);

    return result[0].toAddress();
  }

  try_priceFeed(): ethereum.CallResult<Address> {
    let result = super.tryCall("priceFeed", "priceFeed():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  theseusDao(): Address {
    let result = super.call("theseusDao", "theseusDao():(address)", []);

    return result[0].toAddress();
  }

  try_theseusDao(): ethereum.CallResult<Address> {
    let result = super.tryCall("theseusDao", "theseusDao():(address)", []);
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

  get _priceFeed(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _payload(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddAmmCall extends ethereum.Call {
  get inputs(): AddAmmCall__Inputs {
    return new AddAmmCall__Inputs(this);
  }

  get outputs(): AddAmmCall__Outputs {
    return new AddAmmCall__Outputs(this);
  }
}

export class AddAmmCall__Inputs {
  _call: AddAmmCall;

  constructor(call: AddAmmCall) {
    this._call = call;
  }

  get ammAddr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _name(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _symbol(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _payload(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class AddAmmCall__Outputs {
  _call: AddAmmCall;

  constructor(call: AddAmmCall) {
    this._call = call;
  }
}

export class EmitAmmClosePositionCall extends ethereum.Call {
  get inputs(): EmitAmmClosePositionCall__Inputs {
    return new EmitAmmClosePositionCall__Inputs(this);
  }

  get outputs(): EmitAmmClosePositionCall__Outputs {
    return new EmitAmmClosePositionCall__Outputs(this);
  }
}

export class EmitAmmClosePositionCall__Inputs {
  _call: EmitAmmClosePositionCall;

  constructor(call: EmitAmmClosePositionCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmitAmmClosePositionCall__Outputs {
  _call: EmitAmmClosePositionCall;

  constructor(call: EmitAmmClosePositionCall) {
    this._call = call;
  }
}

export class EmitAmmOpenPositionCall extends ethereum.Call {
  get inputs(): EmitAmmOpenPositionCall__Inputs {
    return new EmitAmmOpenPositionCall__Inputs(this);
  }

  get outputs(): EmitAmmOpenPositionCall__Outputs {
    return new EmitAmmOpenPositionCall__Outputs(this);
  }
}

export class EmitAmmOpenPositionCall__Inputs {
  _call: EmitAmmOpenPositionCall;

  constructor(call: EmitAmmOpenPositionCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmitAmmOpenPositionCall__Outputs {
  _call: EmitAmmOpenPositionCall;

  constructor(call: EmitAmmOpenPositionCall) {
    this._call = call;
  }
}

export class EmitFreezeCall extends ethereum.Call {
  get inputs(): EmitFreezeCall__Inputs {
    return new EmitFreezeCall__Inputs(this);
  }

  get outputs(): EmitFreezeCall__Outputs {
    return new EmitFreezeCall__Outputs(this);
  }
}

export class EmitFreezeCall__Inputs {
  _call: EmitFreezeCall;

  constructor(call: EmitFreezeCall) {
    this._call = call;
  }
}

export class EmitFreezeCall__Outputs {
  _call: EmitFreezeCall;

  constructor(call: EmitFreezeCall) {
    this._call = call;
  }
}

export class EmitNewSnappshotCall extends ethereum.Call {
  get inputs(): EmitNewSnappshotCall__Inputs {
    return new EmitNewSnappshotCall__Inputs(this);
  }

  get outputs(): EmitNewSnappshotCall__Outputs {
    return new EmitNewSnappshotCall__Outputs(this);
  }
}

export class EmitNewSnappshotCall__Inputs {
  _call: EmitNewSnappshotCall;

  constructor(call: EmitNewSnappshotCall) {
    this._call = call;
  }

  get newIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmitNewSnappshotCall__Outputs {
  _call: EmitNewSnappshotCall;

  constructor(call: EmitNewSnappshotCall) {
    this._call = call;
  }
}

export class EmitPriceChangeCall extends ethereum.Call {
  get inputs(): EmitPriceChangeCall__Inputs {
    return new EmitPriceChangeCall__Inputs(this);
  }

  get outputs(): EmitPriceChangeCall__Outputs {
    return new EmitPriceChangeCall__Outputs(this);
  }
}

export class EmitPriceChangeCall__Inputs {
  _call: EmitPriceChangeCall;

  constructor(call: EmitPriceChangeCall) {
    this._call = call;
  }

  get currentIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get indexPrice(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get baseAsset(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get quoteAsset(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get ffr(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class EmitPriceChangeCall__Outputs {
  _call: EmitPriceChangeCall;

  constructor(call: EmitPriceChangeCall) {
    this._call = call;
  }
}

export class EmitUnFreezeCall extends ethereum.Call {
  get inputs(): EmitUnFreezeCall__Inputs {
    return new EmitUnFreezeCall__Inputs(this);
  }

  get outputs(): EmitUnFreezeCall__Outputs {
    return new EmitUnFreezeCall__Outputs(this);
  }
}

export class EmitUnFreezeCall__Inputs {
  _call: EmitUnFreezeCall;

  constructor(call: EmitUnFreezeCall) {
    this._call = call;
  }
}

export class EmitUnFreezeCall__Outputs {
  _call: EmitUnFreezeCall;

  constructor(call: EmitUnFreezeCall) {
    this._call = call;
  }
}

export class RemoveAmmCall extends ethereum.Call {
  get inputs(): RemoveAmmCall__Inputs {
    return new RemoveAmmCall__Inputs(this);
  }

  get outputs(): RemoveAmmCall__Outputs {
    return new RemoveAmmCall__Outputs(this);
  }
}

export class RemoveAmmCall__Inputs {
  _call: RemoveAmmCall;

  constructor(call: RemoveAmmCall) {
    this._call = call;
  }

  get ammAddr(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAmmCall__Outputs {
  _call: RemoveAmmCall;

  constructor(call: RemoveAmmCall) {
    this._call = call;
  }
}

export class UpdatePayloadCall extends ethereum.Call {
  get inputs(): UpdatePayloadCall__Inputs {
    return new UpdatePayloadCall__Inputs(this);
  }

  get outputs(): UpdatePayloadCall__Outputs {
    return new UpdatePayloadCall__Outputs(this);
  }
}

export class UpdatePayloadCall__Inputs {
  _call: UpdatePayloadCall;

  constructor(call: UpdatePayloadCall) {
    this._call = call;
  }

  get _payload(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class UpdatePayloadCall__Outputs {
  _call: UpdatePayloadCall;

  constructor(call: UpdatePayloadCall) {
    this._call = call;
  }
}

export class UpdatePriceFeedCall extends ethereum.Call {
  get inputs(): UpdatePriceFeedCall__Inputs {
    return new UpdatePriceFeedCall__Inputs(this);
  }

  get outputs(): UpdatePriceFeedCall__Outputs {
    return new UpdatePriceFeedCall__Outputs(this);
  }
}

export class UpdatePriceFeedCall__Inputs {
  _call: UpdatePriceFeedCall;

  constructor(call: UpdatePriceFeedCall) {
    this._call = call;
  }

  get _priceFeed(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdatePriceFeedCall__Outputs {
  _call: UpdatePriceFeedCall;

  constructor(call: UpdatePriceFeedCall) {
    this._call = call;
  }
}

export class UpdateQuoteAssetStarterCall extends ethereum.Call {
  get inputs(): UpdateQuoteAssetStarterCall__Inputs {
    return new UpdateQuoteAssetStarterCall__Inputs(this);
  }

  get outputs(): UpdateQuoteAssetStarterCall__Outputs {
    return new UpdateQuoteAssetStarterCall__Outputs(this);
  }
}

export class UpdateQuoteAssetStarterCall__Inputs {
  _call: UpdateQuoteAssetStarterCall;

  constructor(call: UpdateQuoteAssetStarterCall) {
    this._call = call;
  }

  get _amm(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _quoteAssetStarter(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateQuoteAssetStarterCall__Outputs {
  _call: UpdateQuoteAssetStarterCall;

  constructor(call: UpdateQuoteAssetStarterCall) {
    this._call = call;
  }
}

export class UpdateTheseusDaoCall extends ethereum.Call {
  get inputs(): UpdateTheseusDaoCall__Inputs {
    return new UpdateTheseusDaoCall__Inputs(this);
  }

  get outputs(): UpdateTheseusDaoCall__Outputs {
    return new UpdateTheseusDaoCall__Outputs(this);
  }
}

export class UpdateTheseusDaoCall__Inputs {
  _call: UpdateTheseusDaoCall;

  constructor(call: UpdateTheseusDaoCall) {
    this._call = call;
  }

  get _theseusDao(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpdateTheseusDaoCall__Outputs {
  _call: UpdateTheseusDaoCall;

  constructor(call: UpdateTheseusDaoCall) {
    this._call = call;
  }
}
