const { default: Web3 } = require("web3");

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

  it("should split the payment", async function () {
    const contract = PrismSale.deployed();
    const startBalance = web3.utils.toBN(
      await Web3.eth.getBalance(accounts[1])
    );
    const purchase = await contract.buy.sendTransaction({
      from: accounts[0],
      value: Web3.utils.toWei("0.01", "ether"),
    });
    const commission = web3.utils.toBN(web3.utils.toWei("0.008", "ether"));
    const endBalance = web3.utils.toBN(await Web3.eth.getBalance(accounts[1]));

    assert.equal(
      startBalance.add(commission).toString(),
      endBalance.toString()
    );
  });

  it("should split the payment to the charity", async function () {
    const contract = PrismSale.deployed();
    const startBalance = web3.utils.toBN(
      await Web3.eth.getBalance(accounts[1])
    );
    const purchase = await contract.buy.sendTransaction({
      from: accounts[5],
      value: Web3.utils.toWei("0.01", "ether"),
    });
    const commission = web3.utils.toBN(web3.utils.toWei("0.002", "ether"));
    const endBalance = web3.utils.toBN(await Web3.eth.getBalance(accounts[2]));

    assert.equal(
      startBalance.add(commission).toString(),
      endBalance.toString()
    );
  });
});
