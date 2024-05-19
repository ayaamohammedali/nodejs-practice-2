import { DataTypes } from 'sequelize'
import { sql_conn } from '../connection_db.js'

export const blog_model = sql_conn.define(
  'Blog',
  {
    title: {
      type: DataTypes.STRING(40)
    },
    desc: {
      type: DataTypes.STRING(100)
    },
    price: {
      type: DataTypes.FLOAT(50)
    }
  },
  {
    timestamps: true
  }
)
