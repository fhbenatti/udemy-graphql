import { groupBy, map, pathOr } from 'ramda'
import DataLoader from 'dataloader'
import axios from 'axios'
import query from './db'

export async function searchBook(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}`
  try {
    const result = await axios(url)
    const items = pathOr([], ['data', 'items'], result)
    const books = map(book => ({ id: book.id, ...book.volumeInfo }), items)
    return books
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function findBookByIds(ids) {
  const sql = `select * from hb.book where id = ANY($1)`
  const params = [ids]
  try {
    const result = await query(sql, params)
    const rowsById = groupBy(book => book.id, result.rows)
    return map(id => {
      const book = rowsById[id] ? rowsById[id][0] : null
      return book
    }, ids)
  } catch (error) {
    console.log(error)
  }
}

export function findBooksByIdsLoader() {
  return new DataLoader(findBookByIds)
}

export async function findBookById(id) {
  const sql = `select * from hb.book where id = $1`
  const params = [id]
  try {
    const result = await query(sql, params)
    return result.rows[0]
  } catch (error) {
    console.log(error)
  }
}

const ORDER_BY = {
  ID_DESC: 'id desc',
  ID_ASC: 'id asc',
  RATING_DESC: 'rating desc'
}

export async function allBooks(args) {
  const orderBy = ORDER_BY[args.orderBy]
  const sql = `select * from hb.book order by ${orderBy}`
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
