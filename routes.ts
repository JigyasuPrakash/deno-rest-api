import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getAllItem, getItem, addItem, updateItem, deleteItem } from './items.ts'

const router = new Router()

router.get('/api/v1/items', getAllItem)
    .get('/api/v1/item/:id', getItem)
    .post('/api/v1/item', addItem)
    .put('/api/v1/item/:id', updateItem)
    .delete('/api/v1/item/:id', deleteItem)

export default router