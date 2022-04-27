const { create, globSource } = require("ipfs-http-client");
const fs = require("fs");

/**
 * @author 7Levy
 */
//infura public gateway ipfs.infura-ipfs.io
//infura public gateway(available) ipfs.staging.infura.org
//infura access path https://infura-ipfs.io/ipfs/<CID>
//ipfs access path https://ipfs.io/ipfs/<CID>
async function ipfsClient() {
    const ipfs = await create({
        host: "ipfs.staging.infura.org",
        post: 5001,
        protocol: "https",
    });
    return ipfs;
}

async function saveText() {
    let ipfs = await ipfsClient();
        const options = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000
    };
    let result = await ipfs.add({ path: "myfile.txt'", content: "Hello" });
    console.log(result);
}

async function saveJson() {
    let ipfs = await ipfsClient();
    let data = {
        name: "levy",
        age: "14",
    };
    let result = await ipfs.add({
        path: "hello.json",
        content: JSON.stringify(data),
    });
    console.log(result);
}

async function saveSingleFile() {
    let ipfs = await ipfsClient();
    let data = fs.readFileSync("./mountain.png");
    let options = {
        pin: true
    };
    let result = await ipfs.add({
        path: "hello.png",
        content: data,
    });
    console.log(result);
}
async function saveMultiFile() {
    let ipfs = await ipfsClient();
    const options = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000
    };
    
    for await (const file of ipfs.addAll(globSource('./docs', '**/*'),options)) {
        console.log(file)
    }
}
// infura:not support yet.only  localhost
async function createDir(){
    let ipfs = await ipfsClient();
    await ipfs.files.mkdir('/mss');
    let res = await ipfs.files.stat("/mss");
    console.log(res);
}

async function cpToDir(){
    let ipfs = await ipfsClient();
    await ipfs.files.cp("/ipfs/QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j","/my/0");
}
saveText();
// saveJson();
// saveSingleFile();
// saveMultiFile();
// createDir();
// cpToDir()