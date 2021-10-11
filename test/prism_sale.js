const PrismSale = artifacts.require("PrismSale");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PrismSale", function (accounts) {
  it("should assert true", async function () {
    await PrismSale.deployed();
    return assert.isTrue(true);
  });

  it("should get the right accounts", async function () {
    const contract = PrismSale.deployed();
    const owner = await contract.owner.call();
    const charity = await contract.charity.call();

    assert.isTrue(owner == 0x59840c39cb047f3d56d920c6455537f84e2da84e);
    assert.isTrue(charity == 0x1d57d14b1c8c80fe553f65ecdaa1581918972ccb);
  });
});
