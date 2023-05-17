import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { AddDebt } from "../generated/schema"
import { AddDebt as AddDebtEvent } from "../generated/LoanPool/LoanPool"
import { handleAddDebt } from "../src/loan-pool"
import { createAddDebtEvent } from "./loan-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let amm = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let newAddDebtEvent = createAddDebtEvent(amm, amount)
    handleAddDebt(newAddDebtEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddDebt created and stored", () => {
    assert.entityCount("AddDebt", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddDebt",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amm",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddDebt",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
