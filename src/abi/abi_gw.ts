import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    DepositERC20: event("0x48e22f5aadf4f31c380b4d2954a78a75cf9152922d1cda09ecbe914c7c0580d3", "DepositERC20(uint256)", {"amount": p.uint256}),
    EndUpdate: event("0x23c11e55f43ab7c5eb97bb54f54cf29a165e38df3b672745829ec47a3a5367c4", "EndUpdate(uint64)", {"timestamp": p.uint64}),
    EthSwapFailed: event("0xa7bd938c255aabd27b7caa1d2d9d53c29c276b89263b5878c7001d98bb9ad733", "EthSwapFailed()", {}),
    ExecuteOnramp: event("0xdccf9676747d0d9e8e6c169559f70fb636d07308afea2374fe18884e043f2877", "ExecuteOnramp(address,bytes32,uint256,uint256,uint256,uint256)", {"recipient": indexed(p.address), "txId": p.bytes32, "outputValueSat": p.uint256, "feeSat": p.uint256, "amountERC20": p.uint256, "amountETH": p.uint256}),
    OwnershipTransferStarted: event("0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700", "OwnershipTransferStarted(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    StartUpdate: event("0x7b267a8891ff4f55dad17521228bc705a7b95acb04787c1808b406d5e84baa72", "StartUpdate(uint64)", {"timestamp": p.uint64}),
    StrategyFailed: event("0xc7a3cffa9c9bdb71200ee50dbb621656ac1a8c105d6cf1d36b060e6f6f00a804", "StrategyFailed(address)", {"strategy": p.address}),
    UpdateDustThreshold: event("0x10627f1fc033bf9e37e887e304d56e50b2f65651b59efaffa710cf8f2c278634", "UpdateDustThreshold(uint64)", {"dustThreshold": p.uint64}),
    UpdateFeeRanges: event("0x83f581a97ef6e845c90d1152feb1b924be3b0639cd1546766f3476edbc60d66a", "UpdateFeeRanges((uint256,uint256)[])", {"feeRanges": p.array(p.struct({"scaledFeePercent": p.uint256, "amountLowerRange": p.uint256}))}),
    UpdateOutputScript: event("0x6a37a38294b1a110fbb2c300e266aedfb53b3552e7767e79ae8f57daf2f15337", "UpdateOutputScript(bytes)", {"outputScript": p.bytes}),
    WithdrawERC20: event("0xc82450a2de786f6e5ca1dc3755233aba938f1007a4824199fd09043c4e31d8d3", "WithdrawERC20(uint256)", {"amount": p.uint256}),
    WithdrawETH: event("0x94effa14ea3a1ef396fa2fd829336d1597f1d76b548c26bfa2332869706638af", "WithdrawETH(uint256)", {"amount": p.uint256}),
}

export const functions = {
    SCALED_MAX_FEE: viewFun("0xf5d6d203", "SCALED_MAX_FEE()", {}, p.uint256),
    UPDATE_DELAY: viewFun("0xecf25e0f", "UPDATE_DELAY()", {}, p.uint64),
    acceptOwnership: fun("0x79ba5097", "acceptOwnership()", {}, ),
    availableLiquidity: viewFun("0x74375359", "availableLiquidity()", {}, p.uint256),
    calculateFee: viewFun("0x9c631405", "calculateFee(uint256,(uint256,uint256)[])", {"_amount": p.uint256, "_feeRanges": p.array(p.struct({"scaledFeePercent": p.uint256, "amountLowerRange": p.uint256}))}, p.uint256),
    depositERC20: fun("0xb79092fd", "depositERC20(uint256)", {"amount": p.uint256}, ),
    dustThreshold: viewFun("0xe8462e8f", "dustThreshold()", {}, p.uint64),
    endUpdate: fun("0x11053318", "endUpdate()", {}, ),
    feeRanges: viewFun("0xb72c6d24", "feeRanges(uint256)", {"_0": p.uint256}, {"scaledFeePercent": p.uint256, "amountLowerRange": p.uint256}),
    getFeeRanges: viewFun("0x342b9140", "getFeeRanges()", {}, p.array(p.struct({"scaledFeePercent": p.uint256, "amountLowerRange": p.uint256}))),
    multiplier: viewFun("0x1b3ed722", "multiplier()", {}, p.uint256),
    outputScript: viewFun("0x14de98dd", "outputScript()", {}, p.bytes),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pendingOwner: viewFun("0xe30c3978", "pendingOwner()", {}, p.address),
    registry: viewFun("0x7b103999", "registry()", {}, p.address),
    releaseFundsAndInvest: fun("0xcafeabde", "releaseFundsAndInvest(bytes32,uint256,((bytes4,bytes,bytes,bytes4),(bytes,uint256,bytes),uint256,address,address,uint256,address,bytes,bytes))", {"_txHash": p.bytes32, "_outputValueSat": p.uint256, "_proveBtcTransferArgs": p.struct({"txInfo": p.struct({"version": p.bytes4, "inputVector": p.bytes, "outputVector": p.bytes, "locktime": p.bytes4}), "txProof": p.struct({"merkleProof": p.bytes, "txIndexInBlock": p.uint256, "bitcoinHeaders": p.bytes}), "ethTransferGasLimit": p.uint256, "gateway": p.address, "strategy": p.address, "satsToConvertToEth": p.uint256, "recipient": p.address, "gatewayExtraData": p.bytes, "strategyExtraData": p.bytes})}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    scriptPubKeyHash: viewFun("0x3ecbace0", "scriptPubKeyHash()", {}, p.bytes32),
    setDustThreshold: fun("0xcaa1647b", "setDustThreshold(uint64)", {"_dustThreshold": p.uint64}, ),
    setFeeRanges: fun("0x53a6dbc9", "setFeeRanges((uint256,uint256)[])", {"_feeRanges": p.array(p.struct({"scaledFeePercent": p.uint256, "amountLowerRange": p.uint256}))}, ),
    setOutputScript: fun("0x36702812", "setOutputScript(bytes)", {"_outputScript": p.bytes}, ),
    spent: viewFun("0xae20bed3", "spent(bytes32)", {"_0": p.bytes32}, p.bool),
    startUpdate: fun("0x83d6e51b", "startUpdate()", {}, ),
    swapper: viewFun("0x2b3297f9", "swapper()", {}, p.address),
    token: viewFun("0xfc0c546a", "token()", {}, p.address),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    updateStart: viewFun("0xe320bee5", "updateStart()", {}, p.uint64),
    withdrawERC20: fun("0xd78276c6", "withdrawERC20(uint256)", {"amount": p.uint256}, ),
    withdrawETH: fun("0xf14210a6", "withdrawETH(uint256)", {"amount": p.uint256}, ),
}

export class Contract extends ContractBase {

    SCALED_MAX_FEE() {
        return this.eth_call(functions.SCALED_MAX_FEE, {})
    }

    UPDATE_DELAY() {
        return this.eth_call(functions.UPDATE_DELAY, {})
    }

    availableLiquidity() {
        return this.eth_call(functions.availableLiquidity, {})
    }

    calculateFee(_amount: CalculateFeeParams["_amount"], _feeRanges: CalculateFeeParams["_feeRanges"]) {
        return this.eth_call(functions.calculateFee, {_amount, _feeRanges})
    }

    dustThreshold() {
        return this.eth_call(functions.dustThreshold, {})
    }

    feeRanges(_0: FeeRangesParams["_0"]) {
        return this.eth_call(functions.feeRanges, {_0})
    }

    getFeeRanges() {
        return this.eth_call(functions.getFeeRanges, {})
    }

    multiplier() {
        return this.eth_call(functions.multiplier, {})
    }

    outputScript() {
        return this.eth_call(functions.outputScript, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    registry() {
        return this.eth_call(functions.registry, {})
    }

    scriptPubKeyHash() {
        return this.eth_call(functions.scriptPubKeyHash, {})
    }

    spent(_0: SpentParams["_0"]) {
        return this.eth_call(functions.spent, {_0})
    }

    swapper() {
        return this.eth_call(functions.swapper, {})
    }

    token() {
        return this.eth_call(functions.token, {})
    }

    updateStart() {
        return this.eth_call(functions.updateStart, {})
    }
}

/// Event types
export type DepositERC20EventArgs = EParams<typeof events.DepositERC20>
export type EndUpdateEventArgs = EParams<typeof events.EndUpdate>
export type EthSwapFailedEventArgs = EParams<typeof events.EthSwapFailed>
export type ExecuteOnrampEventArgs = EParams<typeof events.ExecuteOnramp>
export type OwnershipTransferStartedEventArgs = EParams<typeof events.OwnershipTransferStarted>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type StartUpdateEventArgs = EParams<typeof events.StartUpdate>
export type StrategyFailedEventArgs = EParams<typeof events.StrategyFailed>
export type UpdateDustThresholdEventArgs = EParams<typeof events.UpdateDustThreshold>
export type UpdateFeeRangesEventArgs = EParams<typeof events.UpdateFeeRanges>
export type UpdateOutputScriptEventArgs = EParams<typeof events.UpdateOutputScript>
export type WithdrawERC20EventArgs = EParams<typeof events.WithdrawERC20>
export type WithdrawETHEventArgs = EParams<typeof events.WithdrawETH>

/// Function types
export type SCALED_MAX_FEEParams = FunctionArguments<typeof functions.SCALED_MAX_FEE>
export type SCALED_MAX_FEEReturn = FunctionReturn<typeof functions.SCALED_MAX_FEE>

export type UPDATE_DELAYParams = FunctionArguments<typeof functions.UPDATE_DELAY>
export type UPDATE_DELAYReturn = FunctionReturn<typeof functions.UPDATE_DELAY>

export type AcceptOwnershipParams = FunctionArguments<typeof functions.acceptOwnership>
export type AcceptOwnershipReturn = FunctionReturn<typeof functions.acceptOwnership>

export type AvailableLiquidityParams = FunctionArguments<typeof functions.availableLiquidity>
export type AvailableLiquidityReturn = FunctionReturn<typeof functions.availableLiquidity>

export type CalculateFeeParams = FunctionArguments<typeof functions.calculateFee>
export type CalculateFeeReturn = FunctionReturn<typeof functions.calculateFee>

export type DepositERC20Params = FunctionArguments<typeof functions.depositERC20>
export type DepositERC20Return = FunctionReturn<typeof functions.depositERC20>

export type DustThresholdParams = FunctionArguments<typeof functions.dustThreshold>
export type DustThresholdReturn = FunctionReturn<typeof functions.dustThreshold>

export type EndUpdateParams = FunctionArguments<typeof functions.endUpdate>
export type EndUpdateReturn = FunctionReturn<typeof functions.endUpdate>

export type FeeRangesParams = FunctionArguments<typeof functions.feeRanges>
export type FeeRangesReturn = FunctionReturn<typeof functions.feeRanges>

export type GetFeeRangesParams = FunctionArguments<typeof functions.getFeeRanges>
export type GetFeeRangesReturn = FunctionReturn<typeof functions.getFeeRanges>

export type MultiplierParams = FunctionArguments<typeof functions.multiplier>
export type MultiplierReturn = FunctionReturn<typeof functions.multiplier>

export type OutputScriptParams = FunctionArguments<typeof functions.outputScript>
export type OutputScriptReturn = FunctionReturn<typeof functions.outputScript>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type RegistryParams = FunctionArguments<typeof functions.registry>
export type RegistryReturn = FunctionReturn<typeof functions.registry>

export type ReleaseFundsAndInvestParams = FunctionArguments<typeof functions.releaseFundsAndInvest>
export type ReleaseFundsAndInvestReturn = FunctionReturn<typeof functions.releaseFundsAndInvest>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type ScriptPubKeyHashParams = FunctionArguments<typeof functions.scriptPubKeyHash>
export type ScriptPubKeyHashReturn = FunctionReturn<typeof functions.scriptPubKeyHash>

export type SetDustThresholdParams = FunctionArguments<typeof functions.setDustThreshold>
export type SetDustThresholdReturn = FunctionReturn<typeof functions.setDustThreshold>

export type SetFeeRangesParams = FunctionArguments<typeof functions.setFeeRanges>
export type SetFeeRangesReturn = FunctionReturn<typeof functions.setFeeRanges>

export type SetOutputScriptParams = FunctionArguments<typeof functions.setOutputScript>
export type SetOutputScriptReturn = FunctionReturn<typeof functions.setOutputScript>

export type SpentParams = FunctionArguments<typeof functions.spent>
export type SpentReturn = FunctionReturn<typeof functions.spent>

export type StartUpdateParams = FunctionArguments<typeof functions.startUpdate>
export type StartUpdateReturn = FunctionReturn<typeof functions.startUpdate>

export type SwapperParams = FunctionArguments<typeof functions.swapper>
export type SwapperReturn = FunctionReturn<typeof functions.swapper>

export type TokenParams = FunctionArguments<typeof functions.token>
export type TokenReturn = FunctionReturn<typeof functions.token>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpdateStartParams = FunctionArguments<typeof functions.updateStart>
export type UpdateStartReturn = FunctionReturn<typeof functions.updateStart>

export type WithdrawERC20Params = FunctionArguments<typeof functions.withdrawERC20>
export type WithdrawERC20Return = FunctionReturn<typeof functions.withdrawERC20>

export type WithdrawETHParams = FunctionArguments<typeof functions.withdrawETH>
export type WithdrawETHReturn = FunctionReturn<typeof functions.withdrawETH>

