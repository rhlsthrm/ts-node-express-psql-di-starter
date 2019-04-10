import log from "../util/log";
import { ApiService } from "../api/ApiService";
import express from 'express'
import { prettySafeJson } from "../util";
import { ItemService } from "./Item.Service";

const LOG = log('ItemApiService')

export default class ItemApiService extends ApiService<ItemApiServiceHandler> {
  namespace = 'item'
  routes = {
    'POST /': 'doCreate',
    'POST /:id/count': 'doCount',
    'GET /:id': 'doGet',
  }
  handler = ItemApiServiceHandler
  dependencies = {
    itemService: 'ItemService'
  }
}

export class ItemApiServiceHandler {
  // @ts-ignore
  itemService: ItemService

  async doCreate(req: express.Request, res: express.Response) {
    const { data } = req.body
    if (!data) {
      LOG.warn(`Received invalid create item request, body: ${prettySafeJson(req.body)}`)
      res.send(400)
    }

    const item = await this.itemService.create(data)
    res.json(item)
  }

  async doCount(req: express.Request, res: express.Response) {
    const { id } = req.params
    if (!id) {
      LOG.warn(`Received invalid update item request, body: ${prettySafeJson(req.params)}`)
      res.send(400)
    }

    const item = await this.itemService.count(id)
    res.json(item)
  }

  async doGet(req: express.Request, res: express.Response) {
    const { id } = req.params
    if (!id) {
      LOG.warn(`Received invalid update item request, body: ${prettySafeJson(req.params)}`)
      res.send(400)
    }

    const item = await this.itemService.get(id)
    if (!item) {
      res.send(404)
    }
    
    res.json(item)
  }
}