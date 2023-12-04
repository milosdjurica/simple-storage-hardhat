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

	it("Should update when we call store", async function () {
		const expectedValue = "11";
		const transactionResponse = await simpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();

		assert.equal(expectedValue, currentValue.toString());
	});
});
