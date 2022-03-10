import { DashboardQueries } from "../../services/dashboard";
import dotenv from 'dotenv';

dotenv.config();
const dashboard = new DashboardQueries();

describe('Dashboard service', () => {
    
    it('should have a productsInOrders method', async () => {
        expect(dashboard.productsInOrders).toBeDefined();
    })
})