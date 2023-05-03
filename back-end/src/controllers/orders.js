import { ordersService } from '../services/order.js';

const payment = async (req, res) => {
  const payload = req.body;
  const user_id = req.userId;
  const { status, ...rest } = await ordersService.handlePayment({
    ...payload,
    user_id,
  });

  return res.status(status).json({ ...rest });
};

const getByUserId = async (req, res) => {
  // const { id } = req.params;
  const id = req.userId;
  const { status, ...rest } = await ordersService.handleGetOrderByUserId(id);

  return res.status(status).json({ ...rest });
};

const changeData = async (req, res) => {
  const { oid } = req.params;
  const requestData = req.body;
  const { status, ...rest } = await ordersService.handleUpdate(
    oid,
    requestData
  );

  return res.status(status).json({ ...rest });
};

const getById = async (req, res) => {
  const { oid } = req.params;

  const { status, ...rest } = await ordersService.handleGetOrderById(oid);

  return res.status(status).json({ ...rest });
};

const getOrderDeliverByUserId = async (req, res) => {
  // const { id } = req.params;
  const id = req.userId;

  const { status, ...rest } = await ordersService.handleOrderDeliverByUserId(
    id
  );

  return res.status(status).json({ ...rest });
};
export const ordersController = {
  payment,
  getByUserId,
  changeData,
  getById,
  getOrderDeliverByUserId,
};
