import { Sequelize } from 'sequelize'

// config
export const sql_conn = new Sequelize('work3_sequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

// connect
export const connction_DB = async () => {
  return await sql_conn
    .sync({ alter: true })
    .then(res => console.log({ DB_connection: 'Success to connect' }))
    .catch(err => console.log({ DB_connection: 'Fail to connect', err }))
}
