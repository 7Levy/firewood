const { ethers } = require("hardhat");

async function main(){
    const [deployer]= await ethers.getSigners();
    const ProxyJson = require("./test.json");
    const ProxyAbi = ProxyJson.result;
    let GnosisProxy = new ethers.Contract("0xBbdBBC6C79aa6B8d2328Fb6a6B16A9Ab6032e309", ProxyAbi, deployer);
    GnosisProxy =  GnosisProxy.connect(ethers.provider);

    console.log(await GnosisProxy.threshold())

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });