import express from 'express';
import crypto from 'crypto';
import ecpay_payment from 'ecpay_aio_nodejs';

const router = express.Router();

// 綠界提供的 SDK
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;


// SDK 提供的範例，初始化
// https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js


let TradeNo;

router.get('/', (req, res) => {
  console.log(process.env.MERCHANTID);
  console.log(process.env.HASHKEY);
  console.log(process.env.HASHIV);

  const options = {
    OperationMode: 'Test',
    MercProfile: {
      MerchantID: process.env.MERCHANTID,
      HashKey: process.env.HASHKEY,
      HashIV: process.env.HASHIV,
    },
    IgnorePayment: [
      //    "Credit",
      //    "WebATM",
      //    "ATM",
      //    "CVS",
      //    "BARCODE",
      //    "AndroidPay"
    ],
    IsProjectContractor: false,
  };
  // SDK 提供的範例，參數設定
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  TradeNo = 'test' + new Date().getTime();
  const base_param = {
    MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate,
    TotalAmount: '100',
    TradeDesc: '測試交易描述',
    ItemName: '測試商品等',
    ReturnURL: `${process.env.HOST}/return`,
    ClientBackURL: `${process.env.HOST}/clientReturn`,
  };

  console.log(base_param);
  const create = new ecpay_payment(options);

  // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
  const html = create.payment_client.aio_check_out_all(base_param);
  console.log(html);

  res.send(html);
});

// 後端接收綠界回傳的資料
router.post('/return', async (req, res) => {
  const options = {
    OperationMode: 'Test',
    MercProfile: {
      MerchantID: process.env.MERCHANTID,
      HashKey: process.env.HASHKEY,
      HashIV: process.env.HASHIV,
    },
    IgnorePayment: [
      //    "Credit",
      //    "WebATM",
      //    "ATM",
      //    "CVS",
      //    "BARCODE",
      //    "AndroidPay"
    ],
    IsProjectContractor: false,
  };
  console.log('req.body:', req.body);

  const { CheckMacValue } = req.body;
  const data = { ...req.body };
  delete data.CheckMacValue; // 此段不驗證

  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

  console.log(
    '確認交易正確性：',
    CheckMacValue === checkValue,
    CheckMacValue,
    checkValue,
  );

  // 交易成功後，需要回傳 1|OK 給綠界
  res.send('1|OK');
});

// 用戶交易完成後的轉址
router.get('/clientReturn', (req, res) => {
  console.log('clientReturn:', req.body, req.query);
  res.render('return', { query: req.query });
});

export default router;