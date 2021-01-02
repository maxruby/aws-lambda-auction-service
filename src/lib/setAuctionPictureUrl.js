import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function setAuctionPictureUrl(id, pictureUrl) {

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: `set pictureUrl = :pictureUrl`,
    ExpressionAttributeValues: {
      ':pictureUrl': pictureUrl,
    },
    ReturnValues: 'ALL_NEW'
  };

  const updatedAuction = await dynamoDB.update(params).promise();
  
  return updatedAuction.Attributes;
}