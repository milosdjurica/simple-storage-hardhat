import { ethers } from "hardhat";

async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);

	console.log("Deploying contract");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deploymentTransaction();
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log("error", error);
		process.exit(1);
	});
