// Models
import { OrdersModel } from '../models/index.js';

// Helpers
import { getMessage } from '../helpers/index.js';

// Constants
import { Status } from '../constants/index.js';

const statisticalTotal = async () => {
  const total = await OrdersModel.aggregate([
    { $match: { status: 3 } },
    {
      $group: {
        _id: null,
        totalSalary: { $sum: '$total' },
        orders: { $push: '$$ROOT' },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  const data = total.pop();

  return {
    ...data,
    totalSalary: data?.totalSalary || 0,
    orders: data?.orders || [],
  };
};

const statisticalOrder = async () => {
  const total = await OrdersModel.aggregate([
    { $match: { status: 3 } },
    {
      $group: {
        _id: null,
        sum: {
          $sum: 1,
        },
      },
    },
  ]);

  return total.pop()?.sum || 0;
};

const statisticalCart = async () => {
  const total = await OrdersModel.aggregate([
    {
      $match: {
        status: {
          $lte: 2,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCart: { $sum: 1 },
        orders: { $push: '$$ROOT' },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  const data = total.pop();

  return {
    ...data,
    totalCart: data?.totalCart || 0,
    orders: data?.orders || [],
  };
};

const getHome = async () => {
  try {
    const order = await statisticalOrder();
    const { totalSalary } = await statisticalTotal();
    const { totalCart } = await statisticalCart();
    const orders = await OrdersModel.find({
      status: {
        $lte: 3,
      },
    }).sort({
      createdAt: -1,
    });

    console.log();

    const result = [
      {
        title: 'Total revenue',
        value: totalSalary || 0,
      },
      {
        title: 'Number of orders processed',
        value: order,
      },
      {
        title: 'ORDER IS BEING PROCESSED',
        value: totalCart || 0,
      },
    ];

    const resultORders = [...orders];

    return getMessage(Status.success, {
      statisticalData: result,
      orders: resultORders,
    });
  } catch (error) {
    const { message } = new Error(error);

    return getMessage(Status.unauthorized, {}, message);
  }
};

export const adminService = {
  getHome,
};
