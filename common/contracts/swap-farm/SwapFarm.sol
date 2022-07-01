// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./library/IOracle.sol";

contract SwapFarm is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    EnumerableSet.AddressSet private _whitelist;

    uint256 public gemPerblock;
    uint256 public startBlock;
    uint256 public halvingPeriod = 5256000; // 60m * 24h * 182.5d/3s

    uint256 public totalAllocPoint; // 0

    IOracle public oracle;

    
    
}
