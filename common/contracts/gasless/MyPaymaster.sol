// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./AcceptEverythingPaymaster.sol";

contract MyPaymaster is AcceptEverythingPaymaster {
    bool public useSenderWhitelist;
    bool public useTargetWhitelist;

    mapping(address => bool) public senderWhitelist;
    mapping(address => bool) public targetWhitelist;

    event SenderSet(address);
    event TargetSet(address);

    event PreRelayed(uint256);
    event PostRelayed(uint256);

    function versionPaymaster()
        external
        view
        virtual
        override
        returns (string memory)
    {
        return "2.2.4";
    }

    function setSenderWhitelist(address sender) public onlyOwner {
        senderWhitelist[sender] = true;
        useSenderWhitelist = true;
        emit SenderSet(sender);
    }

    function setTargetWhitelist(address target) public onlyOwner {
        targetWhitelist[target] = true;
        useTargetWhitelist = true;
        emit TargetSet(target);
    }

    function preRelayedCall(
        GsnTypes.RelayRequest calldata relayRequest,
        bytes calldata signature,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    )
        external
        virtual
        override
        returns (bytes memory context, bool rejectOnRecipientRevert)
    {
        _verifyForwarder(relayRequest);
        (signature, approvalData, maxPossibleGas);
        require(approvalData.length == 0, "approvalData: invalid length");
        require(
            relayRequest.relayData.paymasterData.length == 0,
            "paymasterData: invalid length"
        );
        if (useSenderWhitelist) {
            require(
                senderWhitelist[relayRequest.request.from],
                "sender not whitelisted"
            );
        }
        if (useTargetWhitelist) {
            require(
                targetWhitelist[relayRequest.request.to],
                "target not whitelisted"
            );
        }
        emit PreRelayed(block.timestamp);
        return (abi.encode(block.timestamp), false);
    }

    function postRelayedCall(
        bytes calldata context,
        bool success,
        uint256 gasUseWithoutPost,
        GsnTypes.RelayData calldata relayData
    ) external virtual override {
        (context, success, gasUseWithoutPost, relayData);
        emit PostRelayed(abi.decode(context, (uint256)));
    }
}
