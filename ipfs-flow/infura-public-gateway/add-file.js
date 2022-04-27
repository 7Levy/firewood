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
        host: "127.0.0.1",
        post: 5001,
        protocol: "http",
    });
    return ipfs;
}

async function saveText() {
    let ipfs = await ipfsClient();
    const options = {
        pin: true,
        wrapWithDirectory: false,
        timeout: 10000
    };
    let result = await ipfs.add({ path: "myfile.txt'", content: "Hello" }, options);
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
    const options = {
        pin: true,
        wrapWithDirectory: false,
        timeout: 10000
    };
    let result = await ipfs.add({path: "hello.png",content: data}, options);
    console.log(result);
}
async function saveMultiFile() {
    let ipfs = await ipfsClient();
    const options = {
        pin: true,
        wrapWithDirectory: true,
        timeout: 10000
    };

    for await (const file of ipfs.addAll(globSource('./ipfsfiles', '**/*'), options)) {
        console.log(file)
    }
}
// infura:not support yet.only  localhost
async function createDir() {
    let ipfs = await ipfsClient();
    await ipfs.files.mkdir('/mss');
    let res = await ipfs.files.stat("/mss");
    console.log(res);
}

async function cpToDir() {
    let ipfs = await ipfsClient();
    await ipfs.files.cp("/ipfs/QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j", "/my/0");
}
// saveText();
// saveJson();
// saveSingleFile();
saveMultiFile();
// createDir();
// cpToDir()