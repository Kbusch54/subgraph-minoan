import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddTokenToPool } from "../generated/schema"
import { AddTokenToPool as AddTokenToPoolEvent } from "../generated/Staking/Staking"
import { handleAddTokenToPool } from "../src/staking"
import { createAddTokenToPoolEvent } from "./staking-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let ammPool = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newAddTokenToPoolEvent = createAddTokenToPoolEvent(ammPool, tokenId)
    handleAddTokenToPool(newAddTokenToPoolEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddTokenToPool created and stored", () => {
    assert.entityCount("AddTokenToPool", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddTokenToPool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ammPool",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddTokenToPool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
