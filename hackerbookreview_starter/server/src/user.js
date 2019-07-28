import { groupBy, map } from 'ramda'
import DataLoader from 'dataloader'
import query from './db'

export async function findUsersByIds(ids) {
  const sql = `select * from hb.user where id = ANY($1)`
  const params = [ids]
  try {
    const result = await query(sql, params)
    const rowsById = groupBy(user => user.id, result.rows)
    return map(id => {
      const user = rowsById[id] ? rowsById[id][0] : null
      return user
    }, ids)
  } catch (error) {
    console.log(error)
  }
}

export function findUsersByIdsLoader() {
  return new DataLoader(findUsersByIds)
}
