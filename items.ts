import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Item } from './interface.ts'

let items: Item[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 29.99,
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 39.99,
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 59.99,
    },
];

// @desc    Get all products
// @route   GET /api/v1/products
const getAllItem = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: items
    }
}

// @desc    Get single product
// @route   GET /api/v1/products/:id
const getItem = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Item | undefined = items.find(p => p.id === params.id)

    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc    Add product
// @route   Post /api/v1/products
const addItem = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const product: Item = body.value
        product.id = v4.generate()
        items.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateItem = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Item | undefined = items.find(p => p.id === params.id)

    if (product) {
        const body = await request.body()

        const updateData: { name?: string; description?: string; price?: number } = body.value

        items = items.map(p => p.id === params.id ? { ...p, ...updateData } : p)

        response.status = 200
        response.body = {
            success: true,
            data: items
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
const deleteItem = ({ params, response }: { params: { id: string }, response: any }) => {
    items = items.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'Product removed'
    }
}

export { getAllItem, getItem, addItem, updateItem, deleteItem }