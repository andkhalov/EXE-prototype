// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * dAppProxyModule:
 *  - Simplifies external dApp's usage of EXE-protocol. 
 *  - Here, we'll just store a reference, or do a pass-through call.
 */
interface IEXETaskManager {
    function createTask(address performer, uint256 price, string calldata rdfData) external returns(uint256);
}

contract dAppProxyModule {
    event ProxyCall(address indexed dapp, address indexed target, bool success);

    /**
     * example pass-through call
     */
    function proxyCreateTask(
        address taskManagerAddress,
        address performer,
        uint256 price,
        string calldata rdfData
    ) external {
        bool success;
        bytes memory data;

        (success, data) = taskManagerAddress.call(
            abi.encodeWithSelector(
                IEXETaskManager.createTask.selector,
                performer,
                price,
                rdfData
            )
        );

        emit ProxyCall(msg.sender, taskManagerAddress, success);
        require(success, "createTask call failed");
    }
}
