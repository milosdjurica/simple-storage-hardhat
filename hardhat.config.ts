import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-verify";
import "./tasks/block-number";
import "hardhat-gas-reporter";

dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xKey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

const config: HardhatUserConfig = {
	// defaultNetwork:"hardhat",
	networks: {
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 11155111,
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			// accounts -> automatically imported
			chainId: 31337,
		},
	},
	solidity: "0.8.19",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		// put it enabled: true -> only when you want to check gas optimizations
		enabled: false,
		noColors: true,
		outputFile: "gas-report.txt",
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		// token: "MATIC", // polygon network
	},
};

export default config;
