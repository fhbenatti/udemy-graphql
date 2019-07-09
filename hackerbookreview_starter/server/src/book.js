import query from './db'
export async function allBooks() {
  const sql = `select * from hb.book`
  try {
    const result = await query(sql)
    return result.rows
  } catch (error) {
    console.log(error)
  }
}
