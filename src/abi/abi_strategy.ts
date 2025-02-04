import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    TokenOutput: event("0x0c7dc5ac7999dcaf43e15e5be6eb5a5e2ae426840df301ca0b6463a6d797988d", "TokenOutput(address,uint256)", {"tokenReceived": p.address, "amountOut": p.uint256}),
}

export const functions = {
    handleGatewayMessage: fun("0x50634c0e", "handleGatewayMessage(address,uint256,address,bytes)", {"tokenSent": p.address, "amountIn": p.uint256, "recipient": p.address, "message": p.bytes}, ),
    handleGatewayMessageWithSlippageArgs: fun("0x7f814f35", "handleGatewayMessageWithSlippageArgs(address,uint256,address,(uint256))", {"tokenSent": p.address, "amountIn": p.uint256, "recipient": p.address, "args": p.struct({"amountOutMin": p.uint256})}, ),
    seBep20: viewFun("0x1bf7df7b", "seBep20()", {}, p.address),
}

export class Contract extends ContractBase {

    seBep20() {
        return this.eth_call(functions.seBep20, {})
    }
}

/// Event types
export type TokenOutputEventArgs = EParams<typeof events.TokenOutput>

/// Function types
export type HandleGatewayMessageParams = FunctionArguments<typeof functions.handleGatewayMessage>
export type HandleGatewayMessageReturn = FunctionReturn<typeof functions.handleGatewayMessage>

export type HandleGatewayMessageWithSlippageArgsParams = FunctionArguments<typeof functions.handleGatewayMessageWithSlippageArgs>
export type HandleGatewayMessageWithSlippageArgsReturn = FunctionReturn<typeof functions.handleGatewayMessageWithSlippageArgs>

export type SeBep20Params = FunctionArguments<typeof functions.seBep20>
export type SeBep20Return = FunctionReturn<typeof functions.seBep20>

