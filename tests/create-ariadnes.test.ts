import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { AriadneCreated } from "../generated/schema"
import { AriadneCreated as AriadneCreatedEvent } from "../generated/CreateAriadnes/CreateAriadnes"
import { handleAriadneCreated } from "../src/create-ariadnes"
import { createAriadneCreatedEvent } from "./create-ariadnes-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let contractId = BigInt.fromI32(234)
    let name = "Example string value"
    let contractAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let ammAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAriadneCreatedEvent = createAriadneCreatedEvent(
      contractId,
      name,
      contractAddress,
      ammAddress
    )
    handleAriadneCreated(newAriadneCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AriadneCreated created and stored", () => {
    assert.entityCount("AriadneCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AriadneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractId",
      "234"
    )
    assert.fieldEquals(
      "AriadneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "AriadneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "contractAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AriadneCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ammAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
