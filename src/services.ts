import { Registry, PartialServiceDefinitions, Container, Context } from "./Container";
import { MemoryCRAuthManager } from "./auth/CRAuthManager";
import AuthApiService from "./auth/AuthApiService";
import { ApiServer } from "./ApiServer";
import Config from "./Config";
import { DefaultAuthHandler } from "./middleware/AuthHandler";
import { getRedisClient } from "./RedisClient";
import { PgPoolService, PostgresDBEngine } from "./db/DBEngine";

export default function defaultRegistry(otherRegistry?: Registry): Registry {
  const registry = new Registry(otherRegistry)
  registry.bindDefinitions(serviceDefinitions)
  return registry
}

export const serviceDefinitions: PartialServiceDefinitions = {
  // 
  // Singletons
  // 
  ApiServer: {
    factory: (container: Container) => new ApiServer(container),
    dependencies: ['Container'],
    isSingleton: true,
  },

  ApiServerServices: {
    factory: () => [
      AuthApiService
    ],
    isSingleton: true,
  },

  CRAuthManager: {
    factory: (web3: any) => new MemoryCRAuthManager(web3),
    dependencies: ['Web3'],
    isSingleton: true,
  },

  RedisClient: {
    factory: (config: Config) => getRedisClient(config.redisUrl),
    dependencies: ['Config'],
    isSingleton: true
  },

  PgPoolService: {
    factory: (config: Config) => new PgPoolService(config),
    dependencies: ['Config'],
    isSingleton: true,
  },

  // 
  // Factories
  // 
  AuthHandler: {
    factory: (config: Config) => new DefaultAuthHandler(config),
    dependencies: ['Config'],
    isSingleton: false
  },

  DBEngine: {
    factory: (pool: PgPoolService, context: Context) =>
      new PostgresDBEngine(pool, context),
    dependencies: ['PgPoolService', 'Context'],
    isSingleton: false
  },
}