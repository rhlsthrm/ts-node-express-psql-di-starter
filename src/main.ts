import Config from "./Config";
import Hub from "./Hub";

const config = Config.fromEnv()

const hub = new Hub(config)

async function run() {
  hub.start()
}

run().then(
  () => process.exit(0),
  err => {
    console.error(err)
    process.exit(1)
  },
)