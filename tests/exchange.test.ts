import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { AddCollateral } from "../generated/schema"
import { AddCollateral as AddCollateralEvent } from "../generated/Exchange/Exchange"
import { handleAddCollateral } from "../src/exchange"
import { createAddCollateralEvent } from "./exchange-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tradeId = Bytes.fromI32(1234567890)
    let amount = BigInt.fromI32(234)
    let newAddCollateralEvent = createAddCollateralEvent(tradeId, amount)
    handleAddCollateral(newAddCollateralEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddCollateral created and stored", () => {
    assert.entityCount("AddCollateral", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddCollateral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tradeId",
      "1234567890"
    )
    assert.fieldEquals(
      "AddCollateral",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
