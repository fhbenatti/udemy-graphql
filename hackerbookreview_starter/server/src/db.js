import { Pool } from 'pg'

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'hackerbook'
})

async function query(sql, params) {
  const client = await pool.connect()
  try {
    return client.query(sql, params)
  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}

export default query
