const express = require('express')
const next = require('next')
const request = require('request')
const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('*', async (req, res) => {
            const { data } = await axios.get(
                'https://www.allrecipes.com/recipe/247365/chef-johns-steak-diane/',
            )

            // console.log({ data })

            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
