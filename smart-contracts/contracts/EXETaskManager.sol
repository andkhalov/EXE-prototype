// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * EXETaskManager:
 *  - Creates tasks, assigns to performer, completes tasks, handles payment.
 *  - Emitted events can contain RDF data referencing the EXE ontology.
 */
contract EXETaskManager {
    event TaskCreated(
        uint256 indexed taskId,
        address indexed performer,
        uint256 price,
        string rdfData
    );

    event TaskCompleted(
        uint256 indexed taskId,
        string rdfData
    );

    struct Task {
        address creator;
        address performer;
        uint256 price;
        bool isCompleted;
    }

    IERC20 public token;
    uint256 public taskCounter;
    mapping(uint256 => Task) public tasks;

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    /**
     * Creates a new task, specifying performer, price, and RDF info.
     */
    function createTask(
        address performer,
        uint256 price,
        string calldata rdfData
    )
        external
        returns (uint256)
    {
        taskCounter++;
        tasks[taskCounter] = Task({
            creator: msg.sender,
            performer: performer,
            price: price,
            isCompleted: false
        });

        emit TaskCreated(taskCounter, performer, price, rdfData);
        return taskCounter;
    }

    /**
     * Completes a task, performer calls this, triggers payment.
     */
    function completeTask(
        uint256 taskId,
        string calldata rdfData
    )
        external
    {
        Task storage t = tasks[taskId];
        require(!t.isCompleted, "Task already completed");
        require(msg.sender == t.performer, "Only performer can complete");

        t.isCompleted = true;

        // Transfer payment from creator to performer
        bool success = token.transferFrom(t.creator, t.performer, t.price);
        require(success, "transferFrom failed");

        emit TaskCompleted(taskId, rdfData);
    }
}
