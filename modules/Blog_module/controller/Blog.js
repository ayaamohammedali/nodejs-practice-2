import { Op } from 'sequelize'
import { blog_model } from '../../../DB/Models/blog.model.js'
import { user_model } from '../../../DB/Models/User.model.js'

export const addBlog = async (req, res) => {
  try {
    const { title, desc, price, createdBy } = req.body
    const blog = await blog_model.create({ title, desc, price, createdBy })
    res.json({ message: 'Done', blog })
  } catch (error) {
    console.log(error)
    if (error?.original?.errno == 1452) {
      res.json({ message: 'invalid user id' })
    } else {
      res.json({ message: 'Catch error' })
    }
  }
}

export const getblogs = async (req, res) => {
  try {
    const blog = await blog_model.findAndCountAll({
      include: [{ model: user_model, attributes: ['name', 'email'] }],

      attributes: { exclude: ['price'] }
    })
    res.json({ message: 'Done', blog })
  } catch (error) {
    console.log(error)
    if (error?.original?.errno == 1452) {
      res.json({ message: 'invalid user id' })
    } else {
      res.json({ message: 'Catch error' })
    }
  }
}

export const update_blog = async (req, res) => {
  try {
    const { id } = req.params // blog id
    const { title, createdBy } = req.body // createdBy , blog owner
    const updated_blog = await blog_model.update(
      { title },
      {
        where: {
          [Op.and]: {
            id,
            createdBy
          }
        }
      }
    )
    if (updated_blog[0] == 1) {
      res.json({ message: 'Updated done' })
    } else {
      res.json({ message: 'Unauthorized user' })
    }
  } catch (error) {
    console.log(error)
    res.json({ message: 'Catch error' })
  }
}