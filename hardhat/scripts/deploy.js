const { ethers } = require("hardhat");
const {
  abi,
  bytecode,
} = require("../artifacts/contracts/DMail.sol/DMail.json");
require("dotenv").config();

// const privateKey = process.env.PRIVATE_KEY;
async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.API_KEY);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const mailFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  const mail = await mailFactory.deploy();
  console.log(`Deployed at ${mail.target}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
