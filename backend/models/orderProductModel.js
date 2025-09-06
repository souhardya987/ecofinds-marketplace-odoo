import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderProduct = sequelize.define('OrderProduct', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, references: { model: 'Orders', key: 'id' } },
  productId: { type: DataTypes.INTEGER, references: { model: 'Products', key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  timestamps: false,
});

export default OrderProduct;