const express = require('express')
import router from './routes/index'
const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 8080, () => console.log('listenin'))
