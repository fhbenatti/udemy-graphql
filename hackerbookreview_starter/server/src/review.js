import { groupBy, map } from 'ramda'
import DataLoader from 'dataloader'
import query from './db'

export async function findReviewsByBookIds(ids) {
  const sql = `select * from hb.review where book_id = ANY($1) order by id`
  const params = [ids]
  try {
    const result = await query(sql, params)
    const rowsById = groupBy(review => review.bookId, result.rows)
    return map(id => rowsById[id], ids)
  } catch (error) {
    console.log(error)
  }
}

export function findReviewsByBookIdsLoader() {
  return new DataLoader(findReviewsByBookIds)
}

export async function allReviews() {
  const sql = `select * from hb.review;`

  try {
    const result = await query(sql)
    return result.rows
  } catch (error) {
    console.log(err)
    throw err
  }
}
