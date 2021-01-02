import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS({ region: 'es-west-1' });

export async function closeAuction(auction) {
  const { id } = auction;

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: `set #status = :status`,
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  };

  await dynamoDB.update(params).promise();

  const { title, seller, highestBid } = auction;
  const { amount, bidder } = highestBid;

  const notifySeller = sqs.sendMessage({
     QueueUrl: process.env.MAIL_QUEUE_URL,
     MessageBody: JSON.stringify({
      subject: 'Your item has benen sold!',
      recipient: seller,
      body: `Your item "${title}" has been sold for $${amount}.`,
     }),
  }).promise();

  const notifyBidder = sqs.sendMessage({
    QueueUrl: process.env.MAIL_QUEUE_URL,
    MessageBody: JSON.stringify({
     subject: 'Your bid won the auction!',
     recipient: bidder,
     body: `You get the "${title}" bid for $${amount}.`,
    }),
 }).promise();

 return Promise.all([notifySeller, notifyBidder]);
}