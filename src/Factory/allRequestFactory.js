import faker from "faker";

const allRequestFactory = (amount) => {
  let allRequests = [];

  for (let i = 0; i <= amount; i++) {
    let request = {
      id: faker.random.number(12),
      requestedBy: faker.name.findName(),
      userId: faker.random.number(),
      paymentMode: faker.random.arrayElement(["paytm", "upi", "bank"]),
      status: faker.random.arrayElement(["active", "renewed"]),
      amount: faker.random.number({ min: 0, max: 10000 }),
      date: `${Math.floor(
        new Date(`${faker.date.between("2014", "2020")}`).getTime() / 100
      )}`,
    };

    allRequests.push(request);
  }

  return allRequests;
};

export default allRequestFactory;
