const router = require('express').Router();
const { json } = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  router.get('/', async (req, res) => {
    
    // find all categories
    // be sure to include its associated Products
    // res.send('<h1>Hey</h1>')
    const categoryLists = await Category.findAll({
      include:  { model: Product, attributes: ['product_name'] } 
    })
      res.json(categoryLists)
    
    })
  
  
  
  
  // find all categories
  // be sure to include its associated Products


router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findByPk(req.params.id, {include:  { model: Product } });
    const plainCat = categoryId.get({plain: true})
    !categoryId ? res.status(404).json({message: 'No category with that id!'})
    : res.status(200).json(plainCat)
    
  } catch (error) {
    res.status(500).json(err)
    
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  let {category_name} = req.body.category_name;
  try {
    const addCat = Category.create({
      category_name
    })
    res.status(200).json(addCat)
    
  } catch (err) {
    res.status(500).json(err)
    
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  let {category_name} = req.body.category_name;
  let {id} = req.params.id;
  const catPut = Category.update({
    category_name
  },
  {
    where: {
      id
    }
  })
  !id ? res.status(404).json({
    message: 'No category found with that id'
  }) : res.status(200).json(catPut)
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  let {id} = req.params.id;
  try {
    const delCategory = await Category.destroy({
      where: {
        id,
      },
    });
    !id ? res.status(404).json({message: 'No Category with that id'}) :
    res.status(200).json(delCategory, {message: `Category number ${id} deleted`});
    
  } catch (err) {
    res.status(500).json(err)
    
  }
  // delete a category by its `id` value
});

module.exports = router;
