import * as request from 'supertest'

import { getRedisClient } from '../RedisClient'
import { PgPoolService } from '../db/DBEngine'
import { Container } from '../Container'

import { truncateAllTables } from './eraseDb'
import { ApiServer } from '../ApiServer'
import { Role } from "../role/Role";
import Config from '../Config';
import { mkAddress } from './stateUtils';

const databaseUrl = process.env.DATABASE_URL_TEST || 'postgres://127.0.0.1:5432';
const redisUrl = process.env.REDIS_URL_TEST || 'redis://127.0.0.1:6379/6';
const providerUrl = process.env.ETH_RPC_URL_TEST || 'http://127.0.0.1:8545';

const Web3 = require('web3')

export class PgPoolServiceForTest extends PgPoolService {
  testNeedsReset = true

  async clearDatabase() {
    const cxn = await this.pool.connect()
    try {
      if (this.testNeedsReset) {
        await truncateAllTables(cxn as any)
      }
    } finally {
      cxn.release()
    }
  }
}

export class TestApiServer extends ApiServer {
  request: request.SuperTest<request.Test>

  constructor(container: Container) {
    super(container)
    this.request = request(this.app)
  }

  withUser(address?: string): TestApiServer {
    address = address || '0xfeedface'
    return this.container.resolve('TestApiServer', {
      'AuthHandler': {
        rolesFor: (req: any) => {
          req.session.address = address
          return [Role.AUTHENTICATED]
        },
        isAuthorized: () => true,
      },
    })
  }
}

export const testChannelManagerAddress = mkAddress('0xccc')
export const testHotWalletAddress = mkAddress('0xddd')

export const getTestConfig = (overrides?: any) => ({
  ...Config.fromEnv(),
  databaseUrl,
  redisUrl,
  sessionSecret: 'hummus',
  hotWalletAddress: testHotWalletAddress,
  channelManagerAddress: testChannelManagerAddress,
  staleChannelDays: 1,
  ...(overrides || {}),
})

export const mockServices: any = {
  'Config': {
    factory: getTestConfig,
  },

  'RedisClient': {
    factory: (config: any) => {
      const client = getRedisClient(config.redisUrl)
      client.flushall()
      return client
    },
    dependencies: ['Config'],
    isSingleton: true
  },

  'PgPoolService': {
    factory: (config: any) => new PgPoolServiceForTest(config),
    dependencies: ['Config'],
    isSingleton: true,
  },

  'TestApiServer': {
    factory: (container: Container) => new TestApiServer(container),
    dependencies: ['Container'],
  },

  'Web3': {
    factory: () => new Web3(new Web3.providers.HttpProvider(providerUrl)),
    dependencies: []
  }
}
