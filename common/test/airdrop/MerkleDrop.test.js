const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { keccak256,solidityKeccak256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat")
const {tree} = require("../../scripts/utils/merkle-generator");

describe("MerkleDrop", () => {
    before(async () => {
        // deploy prepare
        [deployer,alice]= await ethers.getSigners();
        console.log(
            "Deploying the contracts with the account:",
            await deployer.getAddress()
        );
        console.log("Current Network",(await ethers.provider.getNetwork()).name);
        console.log("Account balance:", (await deployer.getBalance()).toString());

        // deploy MockERC20
        const initialSupply = BigNumber.from("100000000000000000000");
        const _mockERC20 = await ethers.getContractFactory("MockERC20");
        mockERC20 = await _mockERC20.deploy(initialSupply);
        await mockERC20.deployed();
    
        // deploy MerkleDrop
        const _merkleDrop = await ethers.getContractFactory("MerkleDrop");
        const root = tree.getRoot().toString('hex');
        const rootBytes32= "0x"+root;
        console.log(rootBytes32);
        merkleDrop = await _merkleDrop.deploy(mockERC20.address,rootBytes32);
        await merkleDrop.deployed();
        
    })

    it("in whitelist", async () => {
        let claimer = deployer.address;
        let leaf = solidityKeccak256(["address", "uint256"], [claimer, 100]);
        let correctProof = tree.getHexProof(leaf);
        console.log(correctProof)
        let tx = await mockERC20.transfer(merkleDrop.address,BigNumber.from("1000000000000000000"))
        await tx.wait()
        let merkleDropTx = await merkleDrop.claim(claimer,100,correctProof,{gasLimit:8000000});
        await merkleDropTx.wait();

    })

})