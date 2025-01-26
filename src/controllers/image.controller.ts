import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import { BadRequestError } from '../errors/index.js';
import apiResponse from '../utils/apiResponse.js';

const bucket = 'main-bucket';

const uploadImage = async (req: Request, res: Response) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  if (!req.file) {
    throw new BadRequestError('沒有上傳文件');
  }

  const file = req.file;
  const timestamp = Date.now();
  const newName = `${timestamp}-${file.originalname}`;
  const fileBase64 = decode(file.buffer.toString('base64'));

  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, fileBase64, { contentType: file.mimetype });

  if(!data) {
    throw new BadRequestError('圖片上傳失敗');
  }

  const url = supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;

  res.status(StatusCodes.OK).json(apiResponse({ data: { url } }));
};

const deleteImage = async (req: Request, res: Response) => {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { imageName } = req.params;

  supabase.storage.from(bucket).remove([imageName]);

  res.status(StatusCodes.OK).json(apiResponse());
};

export {
  uploadImage,
  deleteImage,
};