// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @dev airdrop according to a merkle root
 */
contract MerkleDrop is Ownable {
    using SafeERC20 for IERC20;
    // token address
    address public  token;
    // merkle root
    bytes32 public  merkleRoot;
    uint256 public maxAmount;

    mapping(address => bool) private _claimedMap;

    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }
    function isClaimed(address claimer)public view returns(bool){
        return _claimedMap[claimer];
    }

    function setMerkleRoot(bytes32 _merkleRoot)external onlyOwner {
        merkleRoot = _merkleRoot;
    }
    
    function setToken(address _token)external onlyOwner{
        token = _token;
    }

    function claim(address to,uint256 amount,bytes32[] calldata proof)external{
        require(isClaimed(to)==false,"MerkleDrop: already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(to,amount));
        bool isValidLeaf = MerkleProof.verify(proof, merkleRoot, leaf);
        require(isValidLeaf,"MerkleDrop: verify failed");
        _claimedMap[to]=true;
        require(IERC20(token).balanceOf(address(this))>=amount,"MerkleDrop: insufficient balance");
        IERC20(token).safeTransfer(to,amount);
    }
}
