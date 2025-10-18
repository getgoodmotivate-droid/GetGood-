import paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: process.env.PAYPAL_MODE as 'sandbox' | 'live' || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_SECRET!,
});

export default paypal;

export const createPayout = (email: string, amount: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    const payoutBatch = {
      sender_batch_header: {
        sender_batch_id: `payout_${Date.now()}`,
        email_subject: '💰 You got paid from gEtgOOd!',
        email_message: 'Congratulations! Your fitness earnings have been paid out.',
      },
      items: [{
        recipient_type: 'EMAIL',
        amount: {
          value: amount.toFixed(2),
          currency: 'GBP',
        },
        receiver: email,
        note: 'gEtgOOd fitness app payout - Keep crushing those goals! 💪',
        sender_item_id: `item_${Date.now()}`,
      }],
    };

    paypal.payout.create(payoutBatch, (error, payout) => {
      if (error) {
        reject(error);
      } else {
        resolve(payout);
      }
    });
  });
};

