import { Request, Response } from 'express';
import ecpay_payment from 'ecpay_aio_nodejs';
import StatusCodes from 'http-status-codes';
import apiResponse from '../utils/apiResponse.js';
import createDateToLocaleString from '../utils/createDateToLocaleString.js';
import * as orderService from '../services/orderService.js';
import checkPermissions from '../utils/checkPermissions.js';

const checkout = async (req: Request, res: Response) => {
  const { id: orderId } = req.params;

  const order = await orderService.getOrderById(orderId);
  checkPermissions(req.user, order.userId);

  const options = {
    OperationMode: 'Test',
    IsProjectContractor: false,
    MercProfile: {
      MerchantID: process.env.MERCHANTID,
      HashKey: process.env.HASHKEY,
      HashIV: process.env.HASHIV,
    },
  };

  const MerchantTradeDate = createDateToLocaleString();
  const MerchantTradeNo = 'test' + new Date().getTime();
  const baseParam = {
    MerchantTradeNo,
    MerchantTradeDate,
    TotalAmount: order.totalAmount,
    TradeDesc: '測試交易描述',
    ItemName: '測試商品',
    ReturnURL: `${process.env.HOST}/api/v1/checkout/return/${orderId}`,
    ClientBackURL: `${process.env.HOST}/order/${orderId}`,
  };

  const create = new ecpay_payment(options);
  const html = create.payment_client.aio_check_out_all(baseParam);

  res.status(StatusCodes.OK).json(apiResponse({ data: { html } }));
};

const checkoutReturn = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const { id: orderId } = req.params;

  const options = {
    OperationMode: 'Test',
    IsProjectContractor: false,
    MercProfile: {
      MerchantID: process.env.MERCHANTID,
      HashKey: process.env.HASHKEY,
      HashIV: process.env.HASHIV,
    },
  };

  const { CheckMacValue } = req.body;

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(req.body);
  const isPaid = CheckMacValue === checkValue;

  await orderService.updateOrderStatus({ orderId, userId, isPaid });
  res.send('1|OK');
};

export {
  checkout,
  checkoutReturn
};