import { get_account, set_quiet } from "@completium/experiment-ts"
import { count } from "./bindings/count"
import { Int } from "@completium/archetype-ts-types"
import { set_mockup } from "@completium/experiment-ts"

set_mockup()

// silence completium output:
set_quiet(true)

const alice = get_account("alice")
const bob = get_account("bob")

describe("Count Contract Initialisation", async () => {
  it("Contract deploys", async () => {
            await count.deploy(new Int(0), { as: alice })
            console.log("count contract: ", count)

    })
})
