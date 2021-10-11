// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PrismSale {
  uint public totalSales;
  uint public maxSales;
  address public owner;
  address public charity;

  mapping (address => bool) sales;

  constructor() {
    totalSales = 0;
    totalSales = 100;
    owner = 0x59840C39CB047F3d56D920C6455537f84E2DA84E;
    charity = 0x1d57d14b1C8C80fe553F65EcdAA1581918972CCB;
  }

  function canBuy () public view returns (bool){
    return totalSales < maxSales;

  }

  function hasAccess () public view returns (bool){
    return sales[msg.sender];
  }


  function buy () public payable returns (bool) {
    require(canBuy() == true, "You can't buy this");
    require(msg.value == 0.01 ether, "you didn't send the right amount");
    require(hasAccess() == false, "Already bought");

    payable(owner).transfer(msg.value * 80/100);
    payable(charity).transfer(msg.value * 20/100);
    totalSales = totalSales + 1;

    sales[msg.sender] = true;

    return true;
  }
}
