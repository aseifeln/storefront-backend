import { DashboardQueries } from "../../services/dashboard";
import dotenv from 'dotenv';

dotenv.config();
const dashboard = new DashboardQueries();

describe('Dashboard service', () => {
    const oldEnv = process.env.ENV;
    beforeAll(() => {
        process.env.ENV = 'test';
    });
    afterAll(()=> {
        process.env.ENV = oldEnv;
    });

    it('should have a productsInOrders method', async () => {
        expect(dashboard.productsInOrders).toBeDefined();
    })
})