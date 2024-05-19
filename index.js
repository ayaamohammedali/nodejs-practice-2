import express from 'express'
import { connction_DB } from './DB/connection_db.js'
import { blog_model } from './DB/Models/blog.model.js'
import { user_model } from './DB/Models/User.model.js'
import User_Router from './modules/User_module/user.routes.js'
import Blog_Router from './modules/Blog_module/blog.routes.js'
const app = express()
const port = 3000
const BaseURL = '/api/v1'

app.use(express.json())
// DB connection
connction_DB()
user_model.hasMany(blog_model, {
  foreignKey: 'createdBy',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
blog_model.belongsTo(user_model, {
  foreignKey: 'createdBy'
})

app.use(`${BaseURL}/user`, User_Router)
app.use(`${BaseURL}/blog`, Blog_Router)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
