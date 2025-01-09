import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import emailTemplateRoutes from './routes/emailTemplateRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

// todos:
// update literally all of this for the routes and
// also add a bunch of external middleware for security stuff lol

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('auth', authRoutes)
app.use('users', userRoutes)
app.use('events', eventRoutes)
app.use('email_templates', emailTemplateRoutes)

const PORT = process.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${3000}`)
})