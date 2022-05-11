const { BigNumber, utils } = require("ethers");
const { ethers, network } = require("hardhat");
const {tree} = require("./utils/merkle-generator");
async function main(){
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }   
    const [deployer]= await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );
    console.log("Current Network",(await ethers.provider.getNetwork()).name);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const initialSupply = BigNumber.from("1000000000000000000");
    const _mockERC20 = await ethers.getContractFactory("MockERC20");
    mockERC20 = await _mockERC20.deploy(initialSupply);
    await mockERC20.deployed();

    const _merkleDrop = await ethers.getContractFactory("MerkleDrop");
    const root = tree.getRoot().toString('hex');
    const rootBytes32= "0x"+root;
    console.log(rootBytes32);
    merkleDrop = await _merkleDrop.deploy(mockERC20.address,rootBytes32);
    await merkleDrop.deployed();
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });