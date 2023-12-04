// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19; // solidity version

contract SimpleStorage {
	uint public myFavoriteNumber;
	// type Person
	struct Person {
		uint256 favoriteNumber;
		string name;
	}
	// dynamic array
	Person[] public listOfPeople;
	// name -> favNum
	mapping(string => uint256) public nameToFavoriteNumber;

	function store(uint256 _favoriteNumber) public virtual {
		myFavoriteNumber = _favoriteNumber;
	}

	// view, pure -> view means we are just reading state , pure means cant change AND also cant view
	function retrieve() public view returns (uint256) {
		return myFavoriteNumber;
	}

	// calldata, memory, storage
	function addPerson(string memory _name, uint256 _favoriteNumber) public {
		listOfPeople.push(Person(_favoriteNumber, _name));
		nameToFavoriteNumber[_name] = _favoriteNumber;
	}
}
