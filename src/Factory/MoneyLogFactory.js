import faker from "faker";

const MoneyLogFactory = (amount) => {
  let moneyLogs = [];

  for (let i = 0; i <= amount; i++) {
    let moneyLog = {
      transactionId: faker.random.uuid(12),
      walletType: faker.random.arrayElement(["cashout", "credit", "referral"]),
      type: faker.random.arrayElement(["DEBIT", "CREDIT", "REQUEST"]),
      transactionType: "MONEY RECEIVED FOR RETURNED ORDER",
      transactionAmount: faker.random.number({ min: 0, max: 1000 }),
      openingBalance: faker.random.number({ min: 0, max: 1000 }),
      closingBalance: faker.random.number({ min: 0, max: 1000 }),
      transactionDate: `${Math.floor(
        new Date(`${faker.date.between("2014", "2020")}`).getTime() / 100
      )}`,
      transactionData: {
        orderId: faker.random.number(),
        productId: faker.random.number(),
        productPrice: faker.random.number(),
        orderTransactionId: faker.random.uuid(12),
        comments: "RETURN PRODUCT RECIEVED AT HUB",
      },
    };

    moneyLogs.push(moneyLog);
  }

  return moneyLogs;
};

export default MoneyLogFactory;
