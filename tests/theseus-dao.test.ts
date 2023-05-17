import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ExecuteTransaction } from "../generated/schema"
import { ExecuteTransaction as ExecuteTransactionEvent } from "../generated/TheseusDAO/TheseusDAO"
import { handleExecuteTransaction } from "../src/theseus-dao"
import { createExecuteTransactionEvent } from "./theseus-dao-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let executor = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nonce = BigInt.fromI32(234)
    let result = Bytes.fromI32(1234567890)
    let newExecuteTransactionEvent = createExecuteTransactionEvent(
      executor,
      nonce,
      result
    )
    handleExecuteTransaction(newExecuteTransactionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExecuteTransaction created and stored", () => {
    assert.entityCount("ExecuteTransaction", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExecuteTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "executor",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExecuteTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nonce",
      "234"
    )
    assert.fieldEquals(
      "ExecuteTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "result",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
