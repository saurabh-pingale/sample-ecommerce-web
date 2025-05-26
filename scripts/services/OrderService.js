export class OrderService {
    static ORDERS_KEY = 'ecommerce_orders';

    static async createOrder(orderData) {
        return new Promise((resolve, reject) => {
            try {
                let orders = JSON.parse(localStorage.getItem(this.ORDERS_KEY)) || [];
                orders.push(orderData);
                localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
                resolve(orderData);
            } catch (error) {
                reject(error);
            }
        });
    }
}