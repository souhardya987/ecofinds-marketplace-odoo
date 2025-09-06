import { Order, Product, OrderProduct } from '../models/index.js';
import sequelize from '../config/database.js';

export const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const t = await sequelize.transaction();
  try {
    const order = await Order.create({ userId: req.user.id, totalPrice: totalPrice }, { transaction: t });
    for (const item of orderItems) {
      await OrderProduct.create({
        orderId: order.id,
        productId: item._id, // Frontend sends _id, which corresponds to product.id
        quantity: item.qty,
        price: item.price,
      }, { transaction: t });
    }
    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: {
        model: Product,
        as: 'products',
        attributes: ['id', 'name'],
        through: { attributes: ['quantity', 'price'] }
      },
      order: [['createdAt', 'DESC']]
    });
    // The structure returned by Sequelize for "through" is nested. We'll flatten it for the frontend.
    const formattedOrders = orders.map(order => {
        const plainOrder = order.get({ plain: true });
        plainOrder.products = plainOrder.products.map(p => ({
            ...p,
            quantity: p.OrderProduct.quantity,
            price: p.OrderProduct.price
        }));
        return plainOrder;
    });
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};