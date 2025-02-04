import * as erc20abi from './abi/erc20'
import {events} from './abi/abi_gw'
import {events as events_reg} from './abi/abi_gwregistry'
import {functions as functions_reg} from './abi/abi_gwregistry'
import {Database, LocalDest} from '@subsquid/file-store'
import {Column, Table, Types, dialects} from '@subsquid/file-store-csv'

import {processor} from './processor'

const dbOptions = {
	tables: {
		DepositERCTable: new Table(
			'DepositERC.csv',
			{
				blockNumber: Column(Types.Numeric()),
				timestamp: Column(Types.DateTime()),
				contractAddress: Column(Types.String()),
				method: Column(Types.String()),
				amount: Column(Types.Numeric())				
			},
			{
				header: true
			}
		),
		OnrampTable: new Table(
			'Onramp.csv',
			{
				blockNumber: Column(Types.Numeric()),
				timestamp: Column(Types.DateTime()),
				contractAddress: Column(Types.String()),
				method: Column(Types.String()),
				recipient: Column(Types.String()),
				txId: Column(Types.String()),
				outputValueSat: Column(Types.Numeric()),
				feeSat: Column(Types.Numeric()),
				amountERC20: Column(Types.Numeric()),
				amountETH: Column(Types.Numeric()),
			},
			{
				header: true
			}
		),		
		WithdrawERC20Table: new Table(
			'WithdrawERC.csv',
			{
				blockNumber: Column(Types.Numeric()),
				timestamp: Column(Types.DateTime()),
				contractAddress: Column(Types.String()),
				method: Column(Types.String()),
				amount: Column(Types.Numeric())	
			},
			{
				header: true
			}
		),	
		WithdrawETHTable: new Table(
			'WithdrawETH.csv',
			{
				blockNumber: Column(Types.Numeric()),
				timestamp: Column(Types.DateTime()),
				contractAddress: Column(Types.String()),
				method: Column(Types.String()),
				amount: Column(Types.Numeric())	
			},
			{
				header: true
			}
		),
		GWRProveBtcTransferTable: new Table(
			'GWRProveBtcTransfer.csv',
			{
				blockNumber: Column(Types.Numeric()),
				timestamp: Column(Types.DateTime()),
				hash: Column(Types.String()),
				from: Column(Types.String()),
				// to: Column(Types.String()),
				sighash: Column(Types.String()),
				status: Column(Types.Numeric()),
				gateway: Column(Types.String()),
				strategy: Column(Types.String()),
				recipient: Column(Types.String())
			},
			{
				header: true
			}
		),							
	},
	dest: new LocalDest('./data'),
	// chunkSizeMb: 100,
	// Explicitly keeping the default value of syncIntervalBlocks (infinity).
	// Make sure to use a finite value here if your output data rate is low!
	// More details here:
	// https://docs.subsquid.io/store/file-store/overview/#filesystem-syncs-and-dataset-partitioning
	// syncIntervalBlocks: undefined
}

processor.run(new Database(dbOptions), async (ctx) => {
	for (let block of ctx.blocks) {
		for (let log of block.logs) {
			if (log.topics[0]===events.DepositERC20.topic) {
				let contractAddress = log.address
				let blockNumber = block.header.height
				let timestamp = new Date(block.header.timestamp)
				let method = "DepositERC20"
				let {amount} = events.DepositERC20.decode(log)
				console.log('log :>> ', log);
				ctx.store.DepositERCTable.write({blockNumber , timestamp, contractAddress, method, amount })
			}
			else if (log.topics[0]===events.ExecuteOnramp.topic) {
				let contractAddress = log.address
				let blockNumber = block.header.height
				let timestamp = new Date(block.header.timestamp)
				let method = "ExecuteOnramp"
				let {recipient, txId, outputValueSat, feeSat, amountERC20, amountETH} = events.ExecuteOnramp.decode(log)
				console.log('log :>> ', log);
				ctx.store.OnrampTable.write({blockNumber , timestamp, contractAddress, method,
					recipient, txId, outputValueSat, feeSat, amountERC20, amountETH })
			}			
			else if (log.topics[0]===events.WithdrawERC20.topic) {
				let contractAddress = log.address
				let blockNumber = block.header.height
				let timestamp = new Date(block.header.timestamp)
				let method = "WithdrawERC20"
				let {amount} = events.WithdrawERC20.decode(log)
				console.log('log :>> ', log);
				ctx.store.WithdrawERC20Table.write({blockNumber , timestamp, contractAddress, method, amount })
			}			
			else if (log.topics[0]===events.WithdrawETH.topic) {
				let contractAddress = log.address
				let blockNumber = block.header.height
				let timestamp = new Date(block.header.timestamp)
				let method = "WithdrawETH"
				let {amount} = events.WithdrawETH.decode(log)
				console.log('log :>> ', log);
				ctx.store.WithdrawETHTable.write({blockNumber , timestamp, contractAddress, method, amount })
			}				
			// if (log.address===contractAddress && log.topics[0]===events.DepositERC20.topic) {
			// 	let blockNumber = block.header.height
			// 	let timestamp = new Date(block.header.timestamp)
			// 	let method = "DepositERC20"
			// 	let {amount} = events.DepositERC20.decode(log)
			// 	console.log('log :>> ', log);
			// 	ctx.store.DepositERCTable.write({blockNumber , timestamp, contractAddress, method, amount })
			// }
			// else if (log.address===contractAddress && log.topics[0]===events.ExecuteOnramp.topic) {
			// 	let blockNumber = block.header.height
			// 	let timestamp = new Date(block.header.timestamp)
			// 	let method = "ExecuteOnramp"
			// 	let {recipient, txId, outputValueSat, feeSat, amountERC20, amountETH} = events.ExecuteOnramp.decode(log)
			// 	console.log('log :>> ', log);
			// 	ctx.store.OnrampTable.write({blockNumber , timestamp, contractAddress, method,
			// 		recipient, txId, outputValueSat, feeSat, amountERC20, amountETH })
			// }			
			// else if (log.address===contractAddress && log.topics[0]===events.WithdrawERC20.topic) {
			// 	let blockNumber = block.header.height
			// 	let timestamp = new Date(block.header.timestamp)
			// 	let method = "WithdrawERC20"
			// 	let {amount} = events.WithdrawERC20.decode(log)
			// 	console.log('log :>> ', log);
			// 	ctx.store.WithdrawERC20Table.write({blockNumber , timestamp, contractAddress, method, amount })
			// }			
			// else if (log.address===contractAddress && log.topics[0]===events.WithdrawETH.topic) {
			// 	let blockNumber = block.header.height
			// 	let timestamp = new Date(block.header.timestamp)
			// 	let method = "WithdrawETH"
			// 	let {amount} = events.WithdrawETH.decode(log)
			// 	console.log('log :>> ', log);
			// 	ctx.store.WithdrawETHTable.write({blockNumber , timestamp, contractAddress, method, amount })
			// }												
		}
		for (let txn of block.transactions) {
			console.log(txn)
			if (txn.sighash === '0xae87ba2a') { //proveBtcTransfer
				let blockNumber = block.header.height
				let timestamp = new Date(block.header.timestamp)
				let data = functions_reg.proveBtcTransfer.decode(txn.input)
				let hash = txn.hash
				let from = txn.from
				// let to = txn.to
				let sighash = txn.sighash
				let status = txn.status
				let gateway = data._proveBtcTransferArgs.gateway
				let strategy = data._proveBtcTransferArgs.strategy
				let recipient = data._proveBtcTransferArgs.recipient
				// let amount = data._proveBtcTransferArgs.txInfo
				// console.log('amount :>> ', amount);
				ctx.store.GWRProveBtcTransferTable.write({
					blockNumber , 
					timestamp,
					hash,
					from,
					// to,
					sighash,
					status,
					gateway,
					strategy,
					recipient



				})
				// console.log('data :>> ', data);
			}
			
			// if (txn.to === VITALIK_ETH || txn.from === VITALIK_ETH) {
			//   // just output the tx data to console
			//   ctx.log.info(txn, 'Tx:')
			// }
		  }		
		
	}
	ctx.store.setForceFlush(true);
	
})

