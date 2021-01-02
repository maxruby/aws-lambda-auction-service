import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import placeBidSchema from '../lib/schemas/placeBidSchema';
import createError from 'http-errors';
import { getAuctionById } from './getAuction';
import validator from '@middy/validator';
const HTTP_OK = 200;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
  
  const { id } = event.pathParameters;
  const { email } = event.requestContext.authorizer;
  const { amount } = event.body; 
  const auction = await getAuctionById(id);

  // Validate bidder identity
  if (email === auction.seller) {
    throw new createError.Forbidden('You can not bid on your own auctions!');
  }

  // Validate Auction status  
  if (auction.status !== 'OPEN') {
    throw new createError.Forbidden('You can not bid on a closed auction!');
  }

  // Validate Bid amount
  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}!`);
  }

  // Avoid double bidding
  if (email === auction.highestBid.bidder) {
    throw new createError.Forbidden('You are already the highest bidder!');
  }
  
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: `set highestBid.amount = :amount, highestBid.bidder = :bidder`,
    ExpressionAttributeValues: {
      ':amount': amount,
      ':bidder': email,
    },
    ReturnValues: 'ALL_NEW'
  };

  let updatedAuction;

  try {
    const result = await dynamoDB.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: HTTP_OK,
    body: JSON.stringify(updatedAuction),
  };
}

export const handler = commonMiddleware(placeBid)
  .use(validator({ inputSchema: placeBidSchema }));
