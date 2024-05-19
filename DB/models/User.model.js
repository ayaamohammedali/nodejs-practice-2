import { DataTypes } from 'sequelize'
import { sql_conn } from '../connection_db.js'

export const user_model = sql_conn.define(
  'User',
  {
    name: {
      type: DataTypes.STRING(40),
      required: true
    },
    email: {
      type: DataTypes.STRING(50),
      required: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      required: true
    },
    age: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: true
  }
)
