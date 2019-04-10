import { ItemRow } from "./Item.Domain";
import log from "../util/log";
import DBEngine, { SQL } from "../db/DBEngine";
import { Client } from 'pg'

export default interface ItemDao {
  create(data: object): Promise<ItemRow | null>
  count(id: number): Promise<ItemRow | null>
  get(id: number): Promise<ItemRow | null>
}

const LOG = log('ItemDao')

export class PostgresItemDao implements ItemDao {
  constructor(private db: DBEngine<Client>) { }

  async create(data: object): Promise<ItemRow | null> {
    return this.inflateRow(
      await this.db.queryOne(SQL`
        INSERT INTO item (data) VALUES (${data}) RETURNING *
      `)
    )
  }

  async count(id: number): Promise<ItemRow | null> {
    return this.inflateRow(
      await this.db.queryOne(SQL`
        UPDATE item SET counter = counter + 1 WHERE id = ${id} RETURNING *
      `)
    )
  }
  
  async get(id: number): Promise<ItemRow | null> {
    return this.inflateRow(
      await this.db.queryOne(SQL`
        SELECT * FROM item WHERE id = ${id}
      `)
    )
  }

  private inflateRow(row: any): ItemRow | null {
    console.log('row: ', row && {
      id: row.id,
      counter: row.counter,
      data: row.data,
      createdOn: row.created_on
    });
    return row && {
      id: row.id,
      counter: row.counter,
      data: row.data,
      createdOn: row.created_on
    }
  }
}