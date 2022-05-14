const { solidityKeccak256,keccak256 } = require("ethers/lib/utils");
const { MerkleTree } = require("merkletreejs")
function generateMerkle() {
    // whitelist demo
    let whitelist = [
        { 'address': '0xe53544c5984cC5f9E079ad51941541C730885D5B', 'amount': '100' },
        { 'address': '0x68f53a4eA90AF26220524722039CA0D91560B1B5', 'amount': '100' },
        { 'address': '0x43Be076d3Cd709a38D2f83Cd032297a194196517', 'amount': '100' },
        { 'address': '0xC7FaB03eecA24CcaB940932559C5565a4cE9cFFb', 'amount': '100' },
        { 'address': '0xE4336D25e9Ca0703b574a6fd1b342A4d0327bcfa', 'amount': '100' },
    ];
    let leafNodes= [];
    // keccak256(abi.encodePacked(.....))
    for (let i = 0; i < whitelist.length; i++) {
        let leaf = solidityKeccak256(["address", "uint256"], [whitelist[i].address, whitelist[i].amount]);
        leafNodes.push(leaf);
    }
    let tree = new MerkleTree(leafNodes, keccak256, { sort: true });
    // console.log(`new merkle tree is ${tree.toString()}`);
    let root = tree.getRoot();
    console.log(`root hash is ${root.toString('hex')}`);
    return tree;
}
let tree = generateMerkle();
// let res = generateMerkle()
module.exports = {
    tree
    // res
}