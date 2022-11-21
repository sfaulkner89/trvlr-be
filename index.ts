const express = require('express')
import router from './routes/index'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 8080, () => console.log('listenin'))
