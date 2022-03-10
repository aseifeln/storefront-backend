import express, { Request, Response } from 'express'
import { DashboardQueries } from "../services/dashboard";
import verifyAuthToken from '../middlewares/verifyAuthToken';

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders()
  res.json(products)
}

const dashboardRoutes = (app: express.Application) => {
    app.get('/products-in-orders', verifyAuthToken, productsInOrders)
}

export default dashboardRoutes;
