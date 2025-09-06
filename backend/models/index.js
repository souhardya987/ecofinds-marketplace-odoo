import User from './userModel.js';
import Product from './productModel.js';
import Order from './orderModel.js';
import OrderProduct from './orderProductModel.js';

export const associateModels = () => {
  User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
  Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId', as: 'products' });
  Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId', as: 'orders' });
};

export { User, Product, Order, OrderProduct };