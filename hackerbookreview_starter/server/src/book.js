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

export function imageUrl(size, id) {
  const zoom = size === 'SMALL' ? 1 : 0
  return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`
}
