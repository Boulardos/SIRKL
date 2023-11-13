// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

error AlreadyWhitelisted();
error NotWhitelisted();
error ContractOutOfSFuel();
error TokenAlreadyClaimed();
error NoTokenToBurn();

contract SIRKLsbt is ERC1155, AccessControl, ReentrancyGuard {
bytes32 public MANAGER_ROLE = keccak256(abi.encodePacked("MANAGER_ROLE"));
bytes32 public WHITELIST_ROLE = keccak256(abi.encodePacked("WHITELIST_ROLE"));

string private _baseURI;
uint256 public _currentTokenID;
uint256 public distributionAmount;

event Mint(address indexed to, uint256 tokenId);
event Whitelist(address indexed to);
event UpdateCurrentTokenId(uint256 indexed tokenId);
event UpdateDistributionAmount(uint256 indexed amount);
event Burn(address indexed account, uint256 tokenId);

constructor(string memory baseURI_) ERC1155(baseURI_) {
_baseURI = baseURI_;
_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
_grantRole(MANAGER_ROLE, msg.sender);
distributionAmount = 0.00001 ether;
_currentTokenID = 0;
// ipfs://QmcMuXzFw4f1Qjizsxt17qqrYqQJduBzEwNdabPFxYGEFe
}

function supportsInterface(bytes4 interfaceId)
public
view
override(ERC1155, AccessControl)
returns (bool)
{
return super.supportsInterface(interfaceId);
}

function setBaseURI(string memory newBaseURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
_baseURI = newBaseURI;
_setURI(newBaseURI);
}

function whitelist(address to) external onlyRole(MANAGER_ROLE) {
if (hasRole(WHITELIST_ROLE, to)) revert AlreadyWhitelisted();
if (address(this).balance < distributionAmount) revert ContractOutOfSFuel();
_grantRole(WHITELIST_ROLE, to);
payable(to).transfer(distributionAmount);

emit Whitelist(to);
}

function mint() public onlyRole(WHITELIST_ROLE) nonReentrant {
if (balanceOf(msg.sender, _currentTokenID) > 0) revert TokenAlreadyClaimed();
_mint(msg.sender, _currentTokenID, 1, "");
_revokeRole(WHITELIST_ROLE, msg.sender);

emit Mint(msg.sender, _currentTokenID);
}

function burn(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
if (balanceOf(account, _currentTokenID) ==0) revert NoTokenToBurn();
_burn(account, _currentTokenID, 1);
emit Burn(account, _currentTokenID);
}

function updateDistributionAmount(uint256 newAmount) external onlyRole(MANAGER_ROLE) {
distributionAmount = newAmount;
emit UpdateDistributionAmount(newAmount);
}

function updateCurrentTokenId(uint256 newTokenId) external onlyRole(MANAGER_ROLE) {
_currentTokenID = newTokenId;
emit UpdateCurrentTokenId(newTokenId);
}


function safeTransferFrom(address, address, uint256, uint256, bytes memory) public virtual override {
revert("Transfers are disabled");
}

function safeBatchTransferFrom(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual override {
revert("Transfers are disabled");
}

function setApprovalForAll(address /* operator */, bool /* approved */) public virtual override {
revert("Approval is disabled");
}

receive()external payable {}

}
