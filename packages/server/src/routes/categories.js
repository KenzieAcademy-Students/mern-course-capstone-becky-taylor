import express from 'express'
const router = express.Router()
import { Category } from '../models'

router.get('/', async (request, response) => {
    try {
        const categories = await Category.find({})
    
        response.json(categories.map((categories) => categories.toJSON()))
      } catch (error) {
        response.status(404).end()
      }
})

router.get('/:id', async (request, response) => {
  try {
    const categories = await Category.findById(request.params.id)

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

  const { name} = request.body
  
  try {
    const category = new Category({
      categoryName: name
    })
    
    const saveCategory = await category.save()
    response.json(saveCategory.toJSON())
  } catch (error) {
    console.log(error)
    response.status(404).end()
  }
})

router.put('/:id', async (request, response) => {
  
  const { name } = request.body
  const categoryId = request.params.id

  try {
    const categoryUpdate = await Category.findByIdAndUpdate(
      {
        _id: categoryId,
      },
      {
        categoryName: name
      },
      {
        new: true,
      }
    )
    response.json(categoryUpdate.toJSON())
  } catch (error) {
    response.status(404).end()
  }
})

router.delete('/:id', async (request, response) => {
  
  const categoryId = request.params.id
  const category = await Category.findById(categoryId)

  if (!category) {
    return response.status(422).json({ error: 'Cannot find category' })
  }
  
  try {
    const removedCategory = await category.remove()

    response.json(removedCategory)
  } catch (error) {
    response.status(404).end()
  }
  
})

module.exports = router