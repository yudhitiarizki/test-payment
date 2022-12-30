const midtransClient = require('midtrans-client');
// Create Core API instance
const Api = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : 'SB-Mid-server-umN3nQFbcCFox84QCboJvD-j',
        clientKey : 'SB-Mid-client-kUsxGWKUctqAIxm9'
    });

const Parameter = ( orderId, paymentMethod, user, package ) => {
    return {
        payment_type: "bank_transfer",
        transaction_details: {
            gross_amount: package.price,
            order_id: orderId,
        },
        customer_details: {
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            phone: user.phoneNumber
        },
        item_details: [
            {
                id: package.packageId,
                price: package.price,
                quantity: 1,
                name: package.Service.title
            }
        ],
        bank_transfer:{
            bank: paymentMethod
        }
    };
};

module.exports = { Api, Parameter }