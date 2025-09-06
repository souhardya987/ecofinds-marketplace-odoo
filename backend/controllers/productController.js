import { Product, User } from '../models/index.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
  const keyword = req.query.keyword;
  const whereCondition = keyword ? { name: { [Op.like]: `%${keyword}%` } } : {};
  
  try {
    const products = await Product.findAll({ 
      where: whereCondition,
      include: { model: User, as: 'user', attributes: ['name'] } 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: User, as: 'user', attributes: ['name', 'email'] }
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name, description, price, category, imageUrl, userId: req.user.id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { userId: req.user.id } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            if (product.userId !== req.user.id) {
                return res.status(401).json({ message: 'User not authorized' });
            }
            await product.destroy();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};