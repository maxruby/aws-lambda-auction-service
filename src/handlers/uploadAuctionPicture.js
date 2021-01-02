import { uploadPictureToS3 } from '../lib/uploadPictureToS3';
import uploadAuctionPictureSchema from '../lib/schemas/uploadAuctionPictureSchema';
import { getAuctionById } from './getAuction';
import validator from '@middy/validator';
import createError from 'http-errors';
import { setAuctionPictureUrl } from '../lib/setAuctionPictureUrl';
import commonMiddleware from '../lib/commonMiddleware';

async function uploadAuctionPicture(event) {

  const { id } = event.pathParameters;
  const { email } = event.requestContext.authorizer;
  const auction = await getAuctionById(id);

  if (auction.seller !== email) {
    throw new createError.Forbidden('You are not allowed to upload pictures for this Auction!');
  }

  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  let updatedAuction;

  try {
    const pictureUrl = await uploadPictureToS3(`${auction.id}.jpg`, buffer);
    updatedAuction = await setAuctionPictureUrl(auction.id, pictureUrl);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(uploadAuctionPicture)
  .use(validator({ inputSchema: uploadAuctionPictureSchema }));