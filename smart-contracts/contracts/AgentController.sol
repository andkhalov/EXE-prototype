// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * AgentController:
 *  - Manages agent registrations and roles. 
 *  - Example usage: registerAgent(“Validator”), etc.
 */
contract AgentController {
    event AgentRegistered(address indexed agent, string role);

    mapping(address => string) public agentRoles;

    function registerAgent(string calldata role) external {
        agentRoles[msg.sender] = role;
        emit AgentRegistered(msg.sender, role);
    }

    function getRole(address agent) external view returns (string memory) {
        return agentRoles[agent];
    }
}
