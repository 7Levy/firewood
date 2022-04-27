const {create}=require("ipfs-http-client");

/**
 * @author 7Levy
 */
//infura public gateway ipfs.infura-ipfs.io
//infura public gateway(available) ipfs.staging.infura.org
//infura access path https://infura-ipfs.io/ipfs/<CID>
//ipfs access path https://ipfs.io/ipfs/<CID>
async function ipfsClient(){
    const ipfs = await create(
        {
            host:"ipfs.staging.infura.org",
            post:5001,
            protocol:"https"
        }
    );
    return ipfs;
}

async function catFile(hash){
    let ipfs =await ipfsClient();
    let stream = ipfs.cat(hash)
    for await (const content of stream){
        let data = Buffer.from(content).toString()
        console.log(data)
    }
}
async function catDir(){
    let ipfs = await ipfsClient();
    // await ipfs.files.mkdir('/mss');
    let res = await ipfs.files.stat("/mss");
    console.log(res.cid);
}
catFile("QmfAJAv9uSZbQjLTP6R6ecXfJWe4PEYfeDnwGKsW7N7Zzg");