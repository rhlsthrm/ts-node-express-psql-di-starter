import log from "../util/log";
import ItemDao from "./Item.Dao";
import { ItemRow } from "./Item.Domain";

const LOG = log('ChannelsService')

export class ItemService {
  constructor(private itemDao: ItemDao) {}

  public async create(data: object): Promise<ItemRow | null> {
    return await this.itemDao.create(data)
  }

  public async count(id: number): Promise<ItemRow | null> {
    const item = await this.itemDao.get(id)
    if (!item) {
      throw new Error(`Could not find item, id: ${id}`)
    }
    return await this.itemDao.count(id)
  }

  public async get(id: number): Promise<ItemRow | null> {
    return await this.itemDao.get(id)
  }
}