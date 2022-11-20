import Web3 from "web3"
import dotenv from "dotenv";
import Abi from "./lazyMintSetting/contract/Abi.js";

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK));
const contractHx = process.env.CONTRACT; 
const contract = new web3.eth.Contract(Abi, contractHx); 
// var personal = new Personal(Personal.givneProvider || process.env.NETWORK);


const createContract = () => {

    // 컨트랙트 자동생성 // Advanced CheckList
    // 1. 지갑 프라이빗 키를 가져와서 지갑과 연결한다.
    // 2. contract 폴더에 위치한 lazymint.sol을 연결된 지갑에서 배포시킨다.
    // 3. 배포시킨 contractHx와 ABI 값을 상수로 저장한다 (sign 함수에서 이용할 예정)

}

async function hash(str) {
    var result = await contract.methods._hash(str).call()
    return result
}

const sign = async (tokenId, price, totalSupply) => {
    // 자동 메세지 서명
    // 1. 지갑 프라이빗 키를 가져와서 지갑과 연결한다.
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    // 2. [tokenId, price]을 해쉬화한다.  ([tokenId, price]이고 컨트랙트 코드내에 위치한 struct NFTVoucher을 위한 내용이다. 이때 tokenId는 1~150번에 속한다)
    const msg = [tokenId, price, totalSupply];
    hash(msg).then(msgHx => {
    // 3. 웹 콘솔창에서 ethereum.request({method: "personal_sign", params: [account, hash]}) 이렇게 사용되던걸 이용한다.
        const signature = web3.eth.sign(msgHx, process.env.ACCOUNT);
    // 4. 3번에 대한 출력값으로 signature이 리턴되는데 그 값을 저장해둔다. (총 150개)
        console.log(signature); // @@@ 나중에 DB 테이블 생성이 완료되면, console.log 가 아닌 DB에 저장할 수 있도록 하는 함수 CALL
    })
}

const extractSignature = () => {
    for(var i=1; i<=3; i++){
        
        // FOR TEST
        const price = 300;
        const totalSupply = 300;
        console.log(sign(i, price, totalSupply));

        // FOR DEPLOY
        // const price = "FILL_ME_IN";
        // sign(i, price);
    }
}

extractSignature();



export default sign;
