import express, { Request, Response } from 'express'

const app: express.Application = express()
const port: number = 3000

app.use(express.json())
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on port: ${port}`)
})
