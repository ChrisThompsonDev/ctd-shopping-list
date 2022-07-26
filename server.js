const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'shoppingList'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('groceryItems').find().sort({section: 1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/additem', (request, response) => {
    db.collection('groceryItems').insertOne({section: request.body.section, name: request.body.name, qty: 1})
    .then(result => {
        console.log('Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneQty', (request, response) => {
    db.collection('groceryItems').updateOne({section: request.body.sectionS, name: request.body.nameS, qty: request.body.qtyS},{
        $set: {
            qty:request.body.qtyS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added Qty of 1')
        response.json('1 Added')
    })
    .catch(error => console.error(error))

})

app.put('/subOneQty', (request, response) => {
    db.collection('groceryItems').updateOne({section: request.body.sectionS, name: request.body.nameS, qty: request.body.qtyS},{
        $set: {
            qty:request.body.qtyS - 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Subtracted Qty of 1')
        response.json('1 Subtracted')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection('groceryItems').deleteOne({name: request.body.nameS})
    .then(result => {
        console.log('Item Deleted')
        response.json('Item Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})