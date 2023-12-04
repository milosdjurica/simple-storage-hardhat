import { ethers, run, network } from "hardhat";

async function main() {
	const SimpleStorageFactory =
		await ethers.getContractFactory("SimpleStorage");

	console.log("Deploying contract");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deploymentTransaction();
	console.log("Address is: ", await simpleStorage.getAddress());

	console.log("network.config", network.config);

	if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deploymentTransaction()?.wait(6);
		await verify(await simpleStorage.getAddress(), []);
	}

	const currentValue = await simpleStorage.retrieve();
	console.log("currentValue", currentValue);

	const transactionResponse = await simpleStorage.store(11);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log("updatedValue", updatedValue);
}

async function verify(contractAddress: string, args: any[]) {
	console.log("Verifying...");

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error: any) {
		if (error.message.toLowerCase().includes("already verified")) {
			console.log("Already Verified!");
		}
		console.log("error", error);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.log("error", error);
		process.exit(1);
	});
