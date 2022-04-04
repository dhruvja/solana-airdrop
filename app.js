import {Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account} from "@solana/web3.js"

const newPair = new Keypair();
console.log(newPair);

const secretKey = newPair._keypair.secretKey
const publicKey = new PublicKey(newPair._keypair.publicKey).toString()

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);

        const balance = await connection.getBalance(new PublicKey(myWallet.publicKey));
        console.log("For Wallet address ",myWallet.publicKey.toString() )
        console.log(balance/LAMPORTS_PER_SOL);

    } catch (error) {
        console.log("Error occured while in balance");
        console.log(error)
    }
}

const airDrop = async() => {
    try {
        console.log("Airdropping Sol")
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);

        const airDropSignature = await connection.requestAirdrop(new PublicKey(myWallet.publicKey), 2*LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airDropSignature);
        console.log("Airdrop is confirmed");
    } catch (error) {
        console.log("Error occured while airdropping")
        console.log(error)
    }
}


const driverFunction = async() => {
    await getWalletBalance();
    await airDrop();
    console.log("The wallet balance is");
    await getWalletBalance();
}

driverFunction();

