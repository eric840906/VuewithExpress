const express = require('express')
const mongodb = require('mongodb')
const uri = "mongodb+srv://eric840906:eric9988129@cluster0.q9vdd.mongodb.net/VUE_EXPRESS?retryWrites=true&w=majority";
const router = express.Router()

// GET
router.get('/', async(req, res) => {
  const posts = await loadPostCollection()
  res.send(await posts.find({}).toArray())
})
// ADD
router.post('/', async(req, res) =>{
  const posts = await loadPostCollection()
  await posts.insertOne({
    text: req.body.text,
    createDate: new Date()
  })
  res.status(201).send()
})
// DELETE
router.delete('/:id', async(req, res) => {
  const posts = await loadPostCollection()
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  })
  res.status(200).send()
})

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const collection = client.db('VUE_EXPRESS').collection('VUE_EXPRESS_POSTS')
  // perform actions on the collection object
  return collection
} 

module.exports = router