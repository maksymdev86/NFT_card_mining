// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

interface IERC1155 {
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external;
}

interface INodeRunnersNFT {
    function getFighter(uint256 tokenId) external view returns (uint256, uint256, uint256, uint256, uint256, uint256);
}

contract Battle {
    IERC20 constant NDR = IERC20(0x739763a258640919981F9bA610AE65492455bE53);
    IERC1155 constant NFT = IERC1155(0x89eE76cC25Fcbf1714ed575FAa6A10202B71c26A);

    mapping(address => uint) public teamIdPerUser;
    mapping(uint => uint) public totalNDRAmountByTeam;
    mapping(uint => uint) public totalNFTStrengthByTeam;
    mapping(uint => uint) public totalHashByTeam;
    mapping(address => uint) public _NDRbalances;
    mapping(address => uint) public _NFTbalances;

    uint public periodBattle = 7 days;
    address public owner;
    bool public started;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "!owner");
        _;
    }

    modifier updateTeamHash() {
        _;
    }

    function getTeamNDRAmount(uint teamId) public view returns (uint) {
        return totalNDRAmountByTeam[teamId];
    }

    function setOwner(address _owner) public onlyOwner {
        owner = _owner;
    } 

    function selectTeam(uint teamId) public {
        teamIdPerUser[msg.sender] = teamId;
    }

    function stakeNFT(uint[] calldata tokenIds, uint[] calldata amounts) public {
        require(tokenIds.length == amounts.length, "TokenIds and amounts length should be the same");
        for (uint i = 0; i < tokenIds.length; i++) {
            // stakeInternal
        }
    }

    function stakeInternal(uint256 tokenId, uint256 amount) internal {
        
    }

    function stakeNDR(uint amount) public {
        require(amount > 0, "Cannot stake 0");
        require(teamIdPerUser[msg.sender] > 0, "Please select team before staking");
        uint teamId = teamIdPerUser[msg.sender];
        uint teamNDRAmount = totalNDRAmountByTeam[teamId];
        // TODO get teamHash
        NDR.transferFrom(msg.sender, address(this), amount);
        teamNDRAmount += amount;
        totalNDRAmountByTeam[teamId] = teamNDRAmount;
    }

    function buyNewNFT(uint tokenId) public updateTeamHash {

    }

}