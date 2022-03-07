import express, { Request, Response } from 'express'
import userRoutes from './handlers/user'
import adminRoutes from './handlers/admin'
import productRoutes from './handlers/product'
import orderRoutes from './handlers/order'

const app: express.Application = express()
const port: number = 3000

app.use(express.json())
// Expose user routes
userRoutes(app);
// Expose admin routes
adminRoutes(app);
// Expose product routes
productRoutes(app);
// Expose order routes
orderRoutes(app);

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on port: ${port}`)
})
