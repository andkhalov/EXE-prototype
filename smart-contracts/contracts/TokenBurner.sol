// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * TokenBurner:
 *  - Burns tokens by sending them to 0xdead, 
 *    or if token supports a burn function, we could call that.
 */
contract TokenBurner {
    event TokensBurned(address indexed user, address indexed token, uint256 amount);

    function burnTokens(address tokenAddress, uint256 amount) external {
        require(amount > 0, "Cannot burn zero");

        IERC20 token = IERC20(tokenAddress);
        // TransferFrom sender -> 0xdead
        bool success = token.transferFrom(msg.sender, address(0xdead), amount);
        require(success, "Transfer failed");

        emit TokensBurned(msg.sender, tokenAddress, amount);
    }
}
