import { ethers } from "hardhat";

/*
async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = ethers.parseEther("0.001");

  const Sbt = await ethers.getContractFactory("SIRKLsbt");
  // const sbt = await ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });
  const sbt = await Sbt.deploy('ipfs://QmcMuXzFw4f1Qjizsxt17qqrYqQJduBzEwNdabPFxYGEFe');
  await sbt.deployed();
  // await lock.waitForDeployment();
  console.log('sbt contract has been deployed to address $ {sbt.address}');

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const constructorArgs = ['ipfs://QmcMuXzFw4f1Qjizsxt17qqrYqQJduBzEwNdabPFxYGEFe'];
  const contract = await ethers.deployContract("SIRKLsbt", constructorArgs);

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("SIRKLsbt deployed to:", contractAddress);

  await delay(10000); // Wait for 10 seconds before verifying the contract

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArgs,
  });

  // Uncomment if you want to enable the `tenderly` extension
  // await hre.tenderly.verify({
  //   name: "Greeter",
  //   address: contractAddress,
  // });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
