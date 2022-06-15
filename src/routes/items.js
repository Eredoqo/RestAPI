let items = require('../Items')

const Item ={
    
    type: 'object',
    properties:{
        id:{type: 'string'},
        name:{type: 'string'},
        description:{ type: 'string' }
    }
}

const getItemsOpts = {
    schema:{
        response:{
            200:{
                type: 'array',
                items:{Item}
            }
        }
    }
}
const getItemOpts = {
    schema:{
        response:{
            200: Item
        },
    },
};
const postItemOpts = {
    schema:{
        body:{
            type:'object',
            required:['name', 'description'],
            properties:{
                name: {type: 'string'},
                description: {type: 'string'}
            }
        },
        response:{
            201: Item
        },
    },
};
const deleteItemsOpts = {
    schema:{
        response:{
            200:{
                type: 'object',
                properties:{
                    message:{type: 'string'}}
            }
        }
    }
}
const updateItemOpts = {
    schema:{
        body:{
            type:'object',
            required:['name', 'description'],
            properties:{
                name: {type: 'string'},
                description: {type: 'string'}
            }
        },
        response:{
            201: Item
        },
    },
};

const itemRoute = (fastify, options, done)=>{

    fastify.get('/', getItemsOpts, function(req, reply){
        reply.send(items)
    })

    fastify.get('/:id', getItemOpts, (req, reply)=>{
        const {id} = req.params 
        const item = items.find((item)=>item.id === id)

        reply.send(item)
    })

    fastify.post('/',postItemOpts, (req, reply)=>{
        const {name, description} = req.body
        const item = {id: String(items.length + 1), name, description}
        items.push(item)
        reply.code(201).send(item)
    })

    fastify.delete('/:id', deleteItemsOpts, (req, reply)=>{
        const {id} = req.params
        const item = items.filter((item)=>item.id !== id)
        reply.send(`Todo ${id} got deleted`)
    })

    fastify.put('/:id',updateItemOpts, (req, reply)=>{
        const {id} = req.params
        const {name, description}= req.body
        const item =items.find((item)=>item.id === id)
        item.name = name
        item.description = description
        reply.send(item)
    })

    done()
}


module.exports ={itemRoute}