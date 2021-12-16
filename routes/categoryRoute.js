import express from 'express';
import Category from '../models/categoryModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find({})
    res.json({
        success: true,
        data: categories
    })
});

router.post('/create', async (req, res) => {
  const { title  , image } = req.body
  const category = await Category.findOne({ title: title });
  if (category) {
      return res.status(401).json({
          success: false,
          msg: 'Category already added.'
      })
  }

  const new_cat = await Category.create({ title ,image});

  res.status(201).json({
      success: true,
      msg: 'Category created',
      data: new_cat
  })

});

router.put('/:id',  async (req, res) => {
  let category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(401).json({
            success: false,
            msg: 'Category not found.'
        })
    }

    category = await Category.findByIdAndUpdate(req.params.catId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: category, msg: 'Successfully updated' });

});

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    console.log(category)

    res.status(201).json({
        success: true,
        msg: 'Successfully Deleted',
        data: category
    })

    if (!category) {
        return res.status(401).json({
            success: false,
            msg: 'Category not found.'
        })
    }

});

export default router;
