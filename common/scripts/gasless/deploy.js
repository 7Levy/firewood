const { utils } = require("ethers");
const { formatEther } = require("ethers/lib/utils");
const { ethers, network } = require("hardhat");
const {writeAddr} = require("../utils/artifacts-log.js");
async function main() {
    if (network.name === "hardhat") {
        console.warn(
            "You are trying to deploy a contract to the Hardhat Network, which" +
            "gets automatically created and destroyed every time. Use the Hardhat" +
            " option '--network localhost'"
        );
    }
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );
    console.log("Current Network", (await ethers.provider.getNetwork()).name);
    console.log("Account balance:", formatEther((await deployer.getBalance())));
    
    const _MyPaymaster = await ethers.getContractFactory("MyPaymaster");
    const MyPaymaster = await _MyPaymaster.deploy();
    await MyPaymaster.deployed();
    console.log("MyPaymaster address:", MyPaymaster.address);
    await writeAddr(MyPaymaster.address, "MyPaymaster");
    
    let hub = "0x6650d69225CA31049DB7Bd210aE4671c0B1ca132";
    let tx = await MyPaymaster.setRelayHub(hub)
    await tx.wait();

    let forwarder = "0x83A54884bE4657706785D7309cf46B58FE5f6e8a";
    tx = await MyPaymaster.setTrustedForwarder(forwarder);
    await tx.wait();

    const _CounterRecipient = await ethers.getContractFactory("CounterRecipient");
    const CounterRecipient = await _CounterRecipient.deploy(forwarder);
    await CounterRecipient.deployed();
    console.log("CounterRecipient address:", CounterRecipient.address);
    await writeAddr(CounterRecipient.address, "CounterRecipient");

    let sendTx= {
        to: MyPaymaster.address,
        gasLimit: 800000,
        value: utils.parseEther("0.1")
    }
    let sendResponse = await deployer.sendTransaction(sendTx);
    console.log("sendResponse:", sendResponse.hash);

    //npx hardhat verify --network mainnet 0x6D1074511F67445013C771F6f1C1E2d75Fd5dBc0 "Constructor argument 1"
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });