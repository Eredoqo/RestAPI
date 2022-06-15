const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')

const {itemRoute} = require ('./routes/items')

const build=(options={},optionsSwagger={} )=>{
    const app = fastify(options)
    app.register(fastifySwagger, optionsSwagger)
    app.register(itemRoute)
    return app
}

module.exports={build}