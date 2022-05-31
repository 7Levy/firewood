// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract CounterRecipient is BaseRelayRecipient {
    uint256 public num;

    address public lastCaller;

    constructor(address _forwarder) {
        _setTrustedForwarder(_forwarder);
    }

    function versionRecipient() external pure override returns (string memory) {
        return "1.0.0";
    }

    function increment() public {
        num++;
        lastCaller = _msgSender();
    }
}
