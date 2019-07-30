import { map } from 'ramda'
import query from './db'

export async function search(term) {
  const books = await searchBooks(term)
  const reviews = await searchReviews(term)
  return [...books, ...reviews]
}

async function searchBooks(term) {
  const sql = `
  select * from hb.book
  where tokens @@ to_tsquery($1);
  `
  try {
    const params = [term]
    const result = await query(sql, params)
    return map(obj => ({ ...obj, __type: 'Book' }), result.rows)
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function searchReviews(term) {
  const sql = `
  select * from hb.review
  where tokens @@ to_tsquery($1);
  `
  try {
    const params = [term]
    const result = await query(sql, params)
    return map(obj => ({ ...obj, __type: 'Review' }), result.rows)
  } catch (error) {
    console.log(error)
    throw error
  }
}
