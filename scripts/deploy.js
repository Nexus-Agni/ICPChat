const hre = require("hardhat");

async function main() {

  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chat = await ChatApp.deploy();

  await chat.deployed()

  console.log("ChatApp address:", chat.address);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
})