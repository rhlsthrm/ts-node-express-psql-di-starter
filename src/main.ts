import Config from "./Config";
import Hub from "./Hub";

const config = Config.fromEnv()

const hub = new Hub(config)

async function run() {
  hub.start()
}

run().then().catch(e => {
  console.error(e)
  process.exit(1)
})