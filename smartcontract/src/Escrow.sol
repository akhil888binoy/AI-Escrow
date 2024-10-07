// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public payer;
    address public payee;
    address public arbiter;
    uint256 public amount;
    bool public isReleased;
    bool public isCancelled;

    function initiateEscrow(address _payee, address _arbiter) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(payer == address(0), "Escrow already initiated");

        payer = msg.sender;
        payee = _payee;
        arbiter = _arbiter;
        amount = msg.value;
    }

    function deleteStateVariables() external {
    require(msg.sender == arbiter, "Only arbiter can perform this action");
    require(isReleased || isCancelled, "Escrow must be completed or cancelled before reset");

    payer = address(0);
    payee = address(0);
    arbiter = address(0);
    amount = 0;
    isReleased = false;
    isCancelled = false;
}


    function release() external {
        require(msg.sender == arbiter, "Only arbiter can perform this action");
        require(!isReleased, "Funds have already been released");
        require(!isCancelled, "Escrow has already been cancelled");

        isReleased = true;
        payable(payee).transfer(amount);
    }

    function cancel() external {
        require(msg.sender == arbiter, "Only arbiter can perform this action");
        require(!isReleased, "Funds have already been released");
        require(!isCancelled, "Escrow has already been cancelled");
        isCancelled = true;
        payable(payer).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
