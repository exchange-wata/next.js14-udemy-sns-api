const { PrismaClient } = require('@prisma/client');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const PORT = 5000;
const prisma = new PrismaClient

// 新規登録
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    body: {
      name, email, password: hashedPassword
    }
  })

  return user.json({ user })
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))

