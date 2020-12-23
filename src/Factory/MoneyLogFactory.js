import faker from "faker";

const MoneyLogFactory = (amount) => {
  let moneyLogs = [];

  for (let i = 0; i <= amount; i++) {
    let moneyLog = {
      transactionId: faker.random.uuid(12),
      userName: faker.name.findName(),
      date: `${Math.floor(
        new Date(`${faker.date.between("2014", "2020")}`).getTime() / 100
      )}`,
      userId: faker.random.number(),
      walletType: faker.random.arrayElement(["cashout", "credit", "referral"]),
      amount: faker.random.number({ min: 0, max: 10000 }),
    };

    moneyLogs.push(moneyLog);
  }

  return moneyLogs;
};

export default MoneyLogFactory;
