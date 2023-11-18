import {DirProcessor} from "./dir";
import IpfsApi from "./ipfs";

const TEST_MD = 'C:\\dev\\sources\\MAIN\\whiteparer\\Writerside\\topics\\finance\\microfunds.md';

const IPFS_HOST = 'http://ipfs-api.solenopsys.org:80/api/v0';


const ipfs = new IpfsApi(IPFS_HOST);

const dp=new DirProcessor("./content/topics",ipfs);

dp.process()