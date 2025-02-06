import { Context, Next } from "hono"
import prisma from "../../prisma/client"

export const apiKeyAuth = async (c: Context, next: Next) => {
  const apiKey = c.req.header('x-api-key')

  if (!apiKey) {
    return c.json({ success: false, message: "Masukkan API key !"}, 401)
  }

  const auth = await prisma.auth.findFirst({
    where: { key: apiKey }
  })

  if (!auth) {
    return c.json({ success: false, message: 'Tidak ada API key'}, 401)
  }

  await next()
}