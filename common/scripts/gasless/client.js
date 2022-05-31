const { InfuraProvider, JsonRpcProvider } = require("@ethersproject/providers");
const { RelayProvider } = require("@opengsn/provider");
const { ethers, web3 } = require("hardhat");

async function main() {
    const infuraProvider = new InfuraProvider("rinkeby", "a52857edcc904d6dbae349e4a5ade517");
    const httpProvider = new web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a52857edcc904d6dbae349e4a5ade517");
    console.log((await infuraProvider.getNetwork()).name);

    const MyPaymasterJson = require("../../artifacts/contracts/gasless/MyPaymaster.sol/MyPaymaster.json");
    const CounterRecipientJson = require("../../artifacts/contracts/gasless/CounterRecipient.sol/CounterRecipient.json");
    let wallet = new ethers.Wallet("2406a50a3da9f7b9331a1344d3a2448a5f430f4109a2d0cd6532c88a67b42788", infuraProvider);

    const PaymasterAddress = "0xc70797169680906f9da0b6b60b51602C849dE2e9";
    const CounterRecipientAddress = "0xC15176a5970505cF226f92520553a3452be40766";
    const conf = { paymasterAddress: PaymasterAddress }
    const gsnProvider = await RelayProvider.newProvider({ provider: httpProvider, config: conf }).init()
    gsnProvider.addAccount("2406a50a3da9f7b9331a1344d3a2448a5f430f4109a2d0cd6532c88a67b42788");
    // gsnProvider is now an rpc provider with GSN support. make it an ethers provider:
    const account = new ethers.Wallet(Buffer.from('1'.repeat(64), 'hex'))
    gsnProvider.addAccount(account.privateKey)
    from = account.address
    console.log(from)
    // gsnProvider is now an rpc provider with GSN support. make it an ethers provider:
    const etherProvider = new ethers.providers.Web3Provider(gsnProvider)
    console.log("初始化MyPaymaster");
    const MyPaymaster = new ethers.Contract("0xc70797169680906f9da0b6b60b51602C849dE2e9", MyPaymasterJson.abi, etherProvider);

    const CounterRecipient = new ethers.Contract("0xC15176a5970505cF226f92520553a3452be40766", CounterRecipientJson.abi, etherProvider);

    console.log("Mypaymaster version:", await MyPaymaster.versionPaymaster());

    console.log("CounterRecipient version:", await CounterRecipient.versionRecipient());

    console.log(await CounterRecipient.num());
    CounterRecipientWithSigner = CounterRecipient.connect(etherProvider.getSigner(from));
    let tx = await CounterRecipientWithSigner.increment();
    await tx.wait();
    console.log(await CounterRecipient.num());
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});

