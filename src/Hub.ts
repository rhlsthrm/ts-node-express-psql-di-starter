import Config from "./Config";
import { Registry, Container } from "./Container";
import defaultRegistry from "./services";
import { ApiServer } from "./ApiServer";
import log from './util/log'
import Web3 from 'web3'

const LOG = log('Hub')

export default class Hub {
  private registry: Registry
  private config: Config

  public container: Container
  private apiServer: ApiServer

  constructor(config: Config) {
    if (!config.ethRpcUrl) {
      throw new Error('ERROR: ETH_RPC_URL not set!')
    }

    const registry = defaultRegistry()
    this.registry = registry

    let web3 = new Web3(config.ethRpcUrl)
    registry.bind('Config', () => config)
    registry.bind('Web3', () => web3)

    this.config = config
    this.container = new Container(registry)
    registry.bind('Container', () => this.container)

    this.apiServer = this.container.resolve('ApiServer')
  }

  public async start() {
    const services = [
      'apiServer'
    ]
    for (let service of services) {
      try {
        await (this as any)[service].start()
      } catch (err) {
        LOG.error(`Failed to start ${service}: ${err}`)
        process.exit(1)
      }
    }
    return new Promise(res => {})
  }
}