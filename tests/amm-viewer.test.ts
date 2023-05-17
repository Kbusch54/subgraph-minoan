import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { AddAmm } from "../generated/schema"
import { AddAmm as AddAmmEvent } from "../generated/AmmViewer/AmmViewer"
import { handleAddAmm } from "../src/amm-viewer"
import { createAddAmmEvent } from "./amm-viewer-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let ammAddr = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let name = "Example string value"
    let symbol = "Example string value"
    let payload = Bytes.fromI32(1234567890)
    let newAddAmmEvent = createAddAmmEvent(ammAddr, name, symbol, payload)
    handleAddAmm(newAddAmmEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddAmm created and stored", () => {
    assert.entityCount("AddAmm", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddAmm",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ammAddr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddAmm",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AddAmm",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "symbol",
      "Example string value"
    )
    assert.fieldEquals(
      "AddAmm",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "payload",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
