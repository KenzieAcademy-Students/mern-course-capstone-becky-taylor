import express from 'express'
const router = express.Router()
import { Categories} from '../models'

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find({})
    
        response.json(categories.map((categories) => categories.toJSON()))
      } catch (error) {
        response.status(404).end()
      }
})

router.get('/:id', async (req, res) => {
  try {
    const categories = await Categories.findById(request.params.id)

    if (categories) {
      response.json(categories.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(404).end()
  }

}) 

router.post('/', async (request, response) => {

  const { name, id} = request.body
  
  try {
    const category = new Category({
      categoryName: name,
      categoryId: id
    })
    
    const saveCategory = await category.save()
    response.json(saveCategory.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})
module.exports = router