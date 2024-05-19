import { Op } from 'sequelize'
import { blog_model } from '../../../DB/Models/blog.model.js'
import { user_model } from '../../../DB/Models/User.model.js'

export const addUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body
    const user = await user_model.create({ name, email, password, age })
    res.json({ message: 'Done', user })
  } catch (error) {
    if (error?.original?.errno == 1062) {
      res.json({ message: 'email is already exist' })
    } else {
      res.json({ message: 'catch error' })
    }
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await user_model.findAll({
      include: [{ model: blog_model, attributes: ['title'] }]
    })
    res.json({ message: 'Done', Data: users })
  } catch (error) {
    console.log(error)
    res.json({ message: 'catch error' })
  }
}

export const getUser = async (req, res) => {
  try {
    const { email, age } = req.body
    const user = await user_model.findOne({
      where: {
        [Op.or]: {
          email,
          age
        }
      }
    })
    if (user) {
      res.json({ message: 'Done', Data: user })
    } else {
      res.json({ message: 'no data match ' })
    }
  } catch (error) {
    console.log(error)
    res.json({ message: 'catch error' })
  }
}

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await user_model.findOne({
      where: {
        [Op.and]: {
          email,
          password
        }
      }
    })
    if (user) {
      res.json({ message: 'Done', Data: user })
    } else {
      res.json({ message: 'invalid email or password' })
    }
  } catch (error) {
    console.log(error)
    res.json({ message: 'catch error' })
  }
}

export const update_user = async (req, res) => {
  try {
    const { email, age } = req.body
    const updated_user = await user_model.update(
      { age },
      {
        where: {
          email
        }
      }
    )
    if (updated_user[0] == 1) {
      res.json({ message: 'Updated' })
    } else {
      res.json({ message: 'Updated fail' })
    }
  } catch (error) {
    console.log(error)
    res.json({ message: 'catch error' })
  }
}

export const get_user_by_name = async (req, res) => {
  try {
    const { searchKey } = req.query
    const users = await user_model.findAll({
      where: {
        name: {
          // [Op.startsWith]: searchKey
          // [Op.substring]:searchKey
          // [Op.like]:`%${searchKey}%`
        }
      }
    })
    if (users.length) {
      res.json({ message: 'Done', users })
    } else {
      res.json({ message: `there are no users start with ${searchKey}` })
    }
  } catch (error) {
    console.log(error)
    res.json({ message: 'catch error' })
  }
}
