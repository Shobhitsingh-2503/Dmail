const { ethers } = require("hardhat");
const { abi } = require("../artifacts/contracts/DMail.sol/DMail.json");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.API_KEY);
  const signer = await provider.getSigner().then((res) => {
    console.log(res);
  });

  // const contract = new ethers.Contract(deployedAddress, abi, signer);
  // await contract
  //   .send(
  //     "new message for you part-1",
  //     "ab",
  //     "",
  //     "0xdb1516ac74ca9f9f8d4319db0786a6372be1bc74"
  //   )
  //   .then((res) => {
  //     console.log(`success`);
  //   });
  // await contract.getInbox(signer).then((res) => {
  //   console.log(res);
  // });
  // var x = 0;
  // await contract.markImp(signer, 0).then((result) => {
  //   console.log(result);
  // });
  // await contract.deleteMail(signer, x, "to").then((res) => {
  //   console.log(`deleted`);
  // });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
