import * as pg from 'pg'
import { clientGenerateToken, clientIsValidToken, clientGetInfoFromToken } from '~~/backend/utils/clientToken'
const { Pool } = pg.default

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  if (id === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Не указан id обращения'
    })
  }

  const token = getCookie(event, 'token')
  if (!clientIsValidToken(token)) {
    throw createError({
      statusCode: 403,
      message: 'Пользователь не авторизован'
    })
  }
  const tokenInfo = clientGetInfoFromToken(token!)

  setCookie(event, 'token', clientGenerateToken(tokenInfo!.id))

  const pool = new Pool({
    ssl: {
      mode: 'require'
    }
  })
  const appealSQL = await pool.query(`
    SELECT a.id, CONCAT(adm.last_name, ' ', adm.first_name, ' ', adm.patronymic) admin_name, a.status 
    FROM "Appeals" a
    LEFT JOIN "Administrators" adm ON a.admin_id = adm.id
    WHERE a.id = $1 AND user_id = $2
  `, [+id, tokenInfo!.id])
  if (appealSQL.rows.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Не удалось найти обращение'
    })
  }

  const appeal = appealSQL.rows[0]

  const messagesSQL = await pool.query('SELECT from_admin, sent_time, message FROM "Appeal_Messages" WHERE appeal_id = $1', [appeal.id])

  await pool.end()

  return {
    ...appeal,
    admin: {
      name: appeal.admin_name
    },
    messages: messagesSQL.rows.map((m: AppealMessage) => {
      return {
        ...m,
        sent_time: new Date(m.sent_time).toLocaleString()
      }
    })
  }
})
