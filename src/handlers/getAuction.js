import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from 'http-errors';
const HTTP_OK = 200;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById(id) {
  let auction;

  try {
    const result = await dynamoDB.get({ 
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    }).promise();
    
    auction = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with "${id}" not found`);
  }

  return auction;
}

async function getAuction(event, context) {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);

  return {
    statusCode: HTTP_OK,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction);
