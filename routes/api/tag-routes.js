const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include:  { model: Product }
    })
  
    res.status(200).json(allTags)
    
  } catch (err) {
    res.status(500).json(err)
    
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tagById = await Tag.findByPk(req.params.id, {include: {model: Product} });
  !tagById ? res.status(404).json({message: 'No tag with that id!'}) :
  res.status(200).json(tagById)
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  let { tag_name } = req.body.tag_name
  try {
    const nuTag = await Tag.create({
      tag_name});
      res.status(200).json(nuTag)
    
  } catch (err) {
    res.status(500).json(err)
    
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  let { tag_name } = req.body.tag_name;
  let { id } = req.body.id;
  const upTag = await Tag.update({
    tag_name

  },
  {
    where: {
      id 
    }
  })
  !upTag ? res.status(404).json({message:'No tag with that id!'}) :
   res.status(200).json(upTag)
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  let { id } = req.params.id
  delTag = await Tag.destroy({
    where: {
      id
    }
  });
  !delTag ? res.status(404).json({message: 'No tag with that id!'}) :
  res.status(200).json({message: `You deleted tag ${id}`})
  // delete on tag by its `id` value
});

module.exports = router;
