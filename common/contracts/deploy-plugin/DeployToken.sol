// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeployToken is ERC20("DeployToken","DT") {
    constructor(uint256 initialSupply)  {
        _mint(msg.sender, initialSupply);
    }
}

