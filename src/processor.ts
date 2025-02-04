import {EvmBatchProcessor} from '@subsquid/evm-processor'
// import * as erc20abi from './abi/erc20'
import {events} from './abi/abi_gw'


// export const USDC_CONTRACT = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'.toLowerCase()
// export const contractAddress = '0xcc2c1d45A3ECeEdec364a6B9e537AE97Fa20bEa7'.toLowerCase();


export const contractAddresses = [

	'0xcc2c1d45A3ECeEdec364a6B9e537AE97Fa20bEa7',

	'0x32768E87f7E929616f43B02F83c0F155A942Bc6B',
  
	'0xB13e4a342C43C89780b903dA8B89a343F7ec381c',
  
	'0x2bCC70980A6Fe3d6726481Ae099f99A8ACa4326b',
  
	'0x22d89f64561a3a6d9aeae732Cf249F425d2D49ff',
  
	'0x1b08d820E52e61536BEF9bD6D3beB2987f75d99A',
  
	'0xF348976425F8e1F53031D0400EA5662Bcf69bFcC'
].map(address => address.toLowerCase()); // Convert all addresses to lowercase


export const  strategiesAddresses = [
'0xC8DeBCcFCA009F586263D1F1596504b104B22fD2',

'0xcAd8c3290a2f2F9c025493d1923Cbc243ec5907E',

'0x41A60D89478b93045389a3767e392cc023a76e5C',

'0x6Ca2a3E66c2289eA4b683A5253E1E7656C54B78e',

'0x04EDDD9743C3b75B0b1D2742F9035d0A4929d5E0',

'0xaB4B5Dac1a969971d76B192b42f0896A63C776E0',

'0x05d54F1f6e456A5f07cf37010CAD3308b9803b73',

'0x0BeF2A8b771E37763c1ce02A88f404c6b2573843',

'0x98649858A2D008410CB3bC6533Fc2571905C456D',

'0xa5bB4f96AE058FA13bb3960103276063b6EaD666',

'0xf5F2F90d3EdC557B7FF0a285169A0B194Df7b6F2',

'0x046DaeB4a46d83FC655a905aB352afbe981Cbd29',

'0xDf3aA56F2626e253b5Db7703AC7241E835140566',

'0x513c2E3bB90807f80ab1c68c4ec3C44ad07a750C',

'0x64B83aF91D702d090C18e05592910Bb2483F4D74',

'0xCD7e24A7672FcE1E58DcD6374E59a4027B6C1290',

'0x9151C9D31B54b853354B0Ab4891659f6AA3fA3eD',

'0x9509e42a304b408A17403a0a439692DBe8b68F6c',

'0x2a4F027cb568F2F3f7b2F7008b92C3B0eFc8DCfD',

'0x0A0A0F6d572488093763C13AF7aB55597477aBDB',

'0x3806fB50eb43E4e50b5E5AC4eF44Fa2F92793101',

'0x1f13fC5Cd540104aC810749246844E577bc402Ec',

'0x1c7ab34f5f24e6947F6e4cABd37a50febA37bdE4',

'0x4b6Ec2339822A1023b11e45E43DBaAbedeD0BC3B',

'0x1D1DEc94E4C9c19f06B30777F5662976e521e720',

'0x828B2b38154C62b5F6733A74126A0795d709e493',
]

export const gWRegistryAddress = '0xAE6770a207E86FaE3b191564FA55ce7Bfee0Dde9'

export const processor = new EvmBatchProcessor()
	.setGateway('https://v2.archive.subsquid.io/network/bob-mainnet')
	.addLog({
		address: contractAddresses,
		topic0: [events.DepositERC20.topic, events.ExecuteOnramp.topic, events.WithdrawERC20.topic, events.WithdrawETH.topic]
	})
	.addLog({
		address: strategiesAddresses,
		topic0: [events.DepositERC20.topic, events.ExecuteOnramp.topic, events.WithdrawERC20.topic, events.WithdrawETH.topic]
	})	
	.addTransaction({
		to: [gWRegistryAddress]
	})
	.setFields({
		transaction: {
			input: true,
			value: true,
			type: true,
			status: true,
			sighash: true
		}
	  })
	.setBlockRange({from:0})
