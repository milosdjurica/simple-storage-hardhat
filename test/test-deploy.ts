import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage } from "../typechain-types";

describe("SimpleStorage", function () {
	let simpleStorageFactory,
		simpleStorage: SimpleStorage & {
			deploymentTransaction(): ContractTransactionResponse;
		};

	beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should start with favorite number 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";
		assert.equal(currentValue.toString(), expectedValue);
	});
});
