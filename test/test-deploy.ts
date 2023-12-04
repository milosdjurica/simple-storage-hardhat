import { BigNumberish, ContractTransactionResponse } from "ethers";
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

	it("Should add person in array", async function () {
		const address = "0x9202cB9aEBBE5e78b93BEA8f2075b1BB0687d22C";
		const number = "11";
		await simpleStorage.addPerson(address, number);

		const currentPersonAdded = (await simpleStorage.listOfPeople(0)).name;
		const currentPersonFavoriteNumber = (
			await simpleStorage.nameToFavoriteNumber(address)
		).toString();

		// console.log(address, currentPersonAdded);
		// console.log(currentPersonFavoriteNumber, number);
		assert.equal(address, currentPersonAdded);
		assert.equal(currentPersonFavoriteNumber, number);
	});
});
