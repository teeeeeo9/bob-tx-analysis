import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    OwnershipTransferStarted: event("0x38d16b8cac22d99fc7c124b9cd0de2d3fa1faef420bfe791d8c362d765e22700", "OwnershipTransferStarted(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    RegisterGateway: event("0x8557139ddc411803fa27a52f1fdbb1abf2e70c1d7fc99126eb9df1c4ea3a3cdd", "RegisterGateway(address,address,address)", {"_gateway": indexed(p.address), "_owner": indexed(p.address), "_token": indexed(p.address)}),
    RegisterStrategy: event("0x9b1e6489bbe7e87f838afab152632fd6b153ff75a65d7f82ce46ced8aaa8c756", "RegisterStrategy(address)", {"strategy": p.address}),
    SubmitterAuthorized: event("0xd53649b492f738bb59d6825099b5955073efda0bf9e3a7ad20da22e110122e29", "SubmitterAuthorized(address)", {"submitter": p.address}),
    SubmitterDeauthorized: event("0x7498b96beeabea5ad3139f1a2861a03e480034254e36b10aae2e6e42ad7b4b68", "SubmitterDeauthorized(address)", {"submitter": p.address}),
    UnregisterGateway: event("0xf25363d84d4ba8917b6a68d5a30b3512056ab7148499a9a77aae349f60d6db4c", "UnregisterGateway(address)", {"_gateway": indexed(p.address)}),
    UnregisterStrategy: event("0xbb31615d87aa1be2c30b70dd2fad33c42d1387f75c639e2cf55831b9e6a9f995", "UnregisterStrategy(address)", {"strategy": p.address}),
    UpdateTxProofDifficultyFactor: event("0x9d8fd430caffd1f529ae54211d19d7ee72e7048de93e837fee5c6f9e935ce8fc", "UpdateTxProofDifficultyFactor(uint64)", {"txProofDifficultyFactor": p.uint64}),
}

export const functions = {
    VERSION: viewFun("0xffa1ad74", "VERSION()", {}, p.uint16),
    acceptOwnership: fun("0x79ba5097", "acceptOwnership()", {}, ),
    allGateways: viewFun("0x7d4ef69a", "allGateways()", {}, p.array(p.address)),
    authorize: fun("0xb6a5d7de", "authorize(address)", {"submitter": p.address}, ),
    deauthorize: fun("0x27c97fa5", "deauthorize(address)", {"submitter": p.address}, ),
    getAllStrategies: viewFun("0xc3b28864", "getAllStrategies()", {}, p.array(p.address)),
    isAuthorized: viewFun("0xfe9fbb80", "isAuthorized(address)", {"_0": p.address}, p.bool),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pendingOwner: viewFun("0xe30c3978", "pendingOwner()", {}, p.address),
    proveBtcTransfer: fun("0xae87ba2a", "proveBtcTransfer(((bytes4,bytes,bytes,bytes4),(bytes,uint256,bytes),uint256,address,address,uint256,address,bytes,bytes))", {"_proveBtcTransferArgs": p.struct({"txInfo": p.struct({"version": p.bytes4, "inputVector": p.bytes, "outputVector": p.bytes, "locktime": p.bytes4}), "txProof": p.struct({"merkleProof": p.bytes, "txIndexInBlock": p.uint256, "bitcoinHeaders": p.bytes}), "ethTransferGasLimit": p.uint256, "gateway": p.address, "strategy": p.address, "satsToConvertToEth": p.uint256, "recipient": p.address, "gatewayExtraData": p.bytes, "strategyExtraData": p.bytes})}, ),
    registerGateway: fun("0xa197d002", "registerGateway(address)", {"_gateway": p.address}, ),
    registerStrategy: fun("0xf5c2c430", "registerStrategy(address)", {"_strategy": p.address}, ),
    relay: viewFun("0xb59589d1", "relay()", {}, p.address),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setTxProofDifficultyFactor: fun("0x788dadbe", "setTxProofDifficultyFactor(uint64)", {"_txProofDifficultyFactor": p.uint64}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    txProofDifficultyFactor: viewFun("0x2bb818c2", "txProofDifficultyFactor()", {}, p.uint64),
    unregisterGateway: fun("0x63ac0b8f", "unregisterGateway(address)", {"_gateway": p.address}, ),
    unregisterStrategy: fun("0xcf569b2f", "unregisterStrategy(address)", {"_strategy": p.address}, ),
}

export class Contract extends ContractBase {

    VERSION() {
        return this.eth_call(functions.VERSION, {})
    }

    allGateways() {
        return this.eth_call(functions.allGateways, {})
    }

    getAllStrategies() {
        return this.eth_call(functions.getAllStrategies, {})
    }

    isAuthorized(_0: IsAuthorizedParams["_0"]) {
        return this.eth_call(functions.isAuthorized, {_0})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingOwner() {
        return this.eth_call(functions.pendingOwner, {})
    }

    relay() {
        return this.eth_call(functions.relay, {})
    }

    txProofDifficultyFactor() {
        return this.eth_call(functions.txProofDifficultyFactor, {})
    }
}

/// Event types
export type OwnershipTransferStartedEventArgs = EParams<typeof events.OwnershipTransferStarted>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type RegisterGatewayEventArgs = EParams<typeof events.RegisterGateway>
export type RegisterStrategyEventArgs = EParams<typeof events.RegisterStrategy>
export type SubmitterAuthorizedEventArgs = EParams<typeof events.SubmitterAuthorized>
export type SubmitterDeauthorizedEventArgs = EParams<typeof events.SubmitterDeauthorized>
export type UnregisterGatewayEventArgs = EParams<typeof events.UnregisterGateway>
export type UnregisterStrategyEventArgs = EParams<typeof events.UnregisterStrategy>
export type UpdateTxProofDifficultyFactorEventArgs = EParams<typeof events.UpdateTxProofDifficultyFactor>

/// Function types
export type VERSIONParams = FunctionArguments<typeof functions.VERSION>
export type VERSIONReturn = FunctionReturn<typeof functions.VERSION>

export type AcceptOwnershipParams = FunctionArguments<typeof functions.acceptOwnership>
export type AcceptOwnershipReturn = FunctionReturn<typeof functions.acceptOwnership>

export type AllGatewaysParams = FunctionArguments<typeof functions.allGateways>
export type AllGatewaysReturn = FunctionReturn<typeof functions.allGateways>

export type AuthorizeParams = FunctionArguments<typeof functions.authorize>
export type AuthorizeReturn = FunctionReturn<typeof functions.authorize>

export type DeauthorizeParams = FunctionArguments<typeof functions.deauthorize>
export type DeauthorizeReturn = FunctionReturn<typeof functions.deauthorize>

export type GetAllStrategiesParams = FunctionArguments<typeof functions.getAllStrategies>
export type GetAllStrategiesReturn = FunctionReturn<typeof functions.getAllStrategies>

export type IsAuthorizedParams = FunctionArguments<typeof functions.isAuthorized>
export type IsAuthorizedReturn = FunctionReturn<typeof functions.isAuthorized>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingOwnerParams = FunctionArguments<typeof functions.pendingOwner>
export type PendingOwnerReturn = FunctionReturn<typeof functions.pendingOwner>

export type ProveBtcTransferParams = FunctionArguments<typeof functions.proveBtcTransfer>
export type ProveBtcTransferReturn = FunctionReturn<typeof functions.proveBtcTransfer>

export type RegisterGatewayParams = FunctionArguments<typeof functions.registerGateway>
export type RegisterGatewayReturn = FunctionReturn<typeof functions.registerGateway>

export type RegisterStrategyParams = FunctionArguments<typeof functions.registerStrategy>
export type RegisterStrategyReturn = FunctionReturn<typeof functions.registerStrategy>

export type RelayParams = FunctionArguments<typeof functions.relay>
export type RelayReturn = FunctionReturn<typeof functions.relay>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetTxProofDifficultyFactorParams = FunctionArguments<typeof functions.setTxProofDifficultyFactor>
export type SetTxProofDifficultyFactorReturn = FunctionReturn<typeof functions.setTxProofDifficultyFactor>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TxProofDifficultyFactorParams = FunctionArguments<typeof functions.txProofDifficultyFactor>
export type TxProofDifficultyFactorReturn = FunctionReturn<typeof functions.txProofDifficultyFactor>

export type UnregisterGatewayParams = FunctionArguments<typeof functions.unregisterGateway>
export type UnregisterGatewayReturn = FunctionReturn<typeof functions.unregisterGateway>

export type UnregisterStrategyParams = FunctionArguments<typeof functions.unregisterStrategy>
export type UnregisterStrategyReturn = FunctionReturn<typeof functions.unregisterStrategy>

