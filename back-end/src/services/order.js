import { CartsModel, OrderDetailModel, OrdersModel } from '../models/index.js';

// Helpers
import { getMessage } from '../helpers/index.js';

// Constants
import { Status } from '../constants/index.js';
import mongoose from 'mongoose';

const handleGetOrderById = async (oid) => {
  try {
    const orderDetails = await OrderDetailModel.find({ orderId: oid })
      .populate({
        path: 'productId',
        select: {
          name: 1,
        },
      })
      .select({
        productId: 1,
        quantity: 1,
      });

    return getMessage(Status.success, orderDetails);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handlePayment = async ({ user_id, ...rest }) => {
  try {
    const carts = await CartsModel.find({
      userId: user_id,
      active: true,
    })
      .populate({
        path: 'productId',
        select: 'price',
      })
      .populate({
        path: 'userId',
        select: 'fullName phoneNumber',
      })
      .select('quantity');

    let user = {};
    const total = carts.reduce((result, { userId, productId, quantity }) => {
      user = userId;
      return result + productId.price * quantity;
    }, 0);

    delete user._doc._id;

    const order = new OrdersModel({
      userId: user_id,
      order_date: new Date(),
      total,
      ...rest,
      ...user._doc,
    });

    const { id: orderId } = await order.save();

    const createOrderDetail = () => {
      const orderDetails = carts.map(
        ({ productId: { id, price }, quantity }) => {
          const orderDetail = new OrderDetailModel({
            orderId: orderId,
            productId: id,
            price,
            quantity,
          });

          return orderDetail.save();
        }
      );

      return orderDetails;
    };

    Promise.all(createOrderDetail());

    return getMessage(
      Status.success,
      {
        carts,
        order,
      },
      'ok'
    );
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleOrderDeliverByUserId = async (userId) => {
  try {
    const orders = await OrdersModel.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          status: {
            $lt: 3,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'orderdetails',
          localField: '_id',
          foreignField: 'orderId',
          as: 'orderDetails',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'orderDetails.productId',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $project: {
          'orderDetails.quantity': 1,
          products: 1,
          status: 1,
          total: 1,
          createdAt: 1,
        },
      },
    ]);

    return getMessage(Status.success, orders);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleGetOrderByUserId = async (userId) => {
  try {
    const orders = await OrdersModel.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          status: {
            $eq: 3,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'orderdetails',
          localField: '_id',
          foreignField: 'orderId',
          as: 'result',
        },
      },
      {
        $unwind: '$result',
      },
      {
        $project: {
          result: 1,
          _id: 0,
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'result.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $project: {
          'result.quantity': 1,
          product: 1,
        },
      },
      {
        $unwind: '$product',
      },
    ]);

    return getMessage(Status.success, orders);
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

const handleUpdate = async (orderId, value) => {
  try {
    await OrdersModel.findByIdAndUpdate(orderId, value);
    return getMessage(Status.success, {});
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

export const ordersService = {
  handlePayment,
  handleGetOrderByUserId,
  handleUpdate,
  handleGetOrderById,
  handleOrderDeliverByUserId,
};
