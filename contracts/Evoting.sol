// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Evoting is ERC20{
    struct Election {
        string election_name;
        string election_desc;
        uint endDate;
        bool status;
        string[] candidateNames;
        uint[] votes;
        uint maxvotes;
    }

    uint256 public  id=1;
    address public admin;

    mapping (uint => Election) public elections;
    mapping(uint => mapping(address => bool)) private voted;

    event CreateEvent(uint256 _id, address creator, string msg);
    event VoteEvent(uint _electionid, address voter, string msg);

    modifier owner() {
        require(msg.sender == admin, "Only owner can perform this action");
        _;
    }
    modifier votable(uint256 _electionid) {
        require(msg.sender != admin, "Admin cannot participate in the election");
        require(balanceOf(msg.sender) == 1, "You do not have token to vote");
        require(!voted[_electionid][msg.sender], "You have already voted");
        _;
    }

    modifier electionExist(uint _electionid) {
        require(!compareStrings("", elections[_electionid].election_name), "No such election exist");
        _;
    }

    constructor () ERC20("Electoken", "ELT") {
        admin = msg.sender;
    }

    function transfer(address to, uint256 value) public virtual override  returns (bool) {
        address owneraddr = _msgSender();
        require(owneraddr==admin, "only owner can transfer tokens");
        _transfer(owneraddr, to, value);
        return true;
    }

    function initializeVote(string[] memory _candidatelist)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory _votes ;
        for (uint256 i = 0; i < _candidatelist.length; i++) {
            _votes[i] = 0;
        }
        return _votes;
    }

    function createElection(
        string memory _electionname,
        string memory _desc,
        uint256 _endDate,
        string[] memory _candidatelist,
        address[] memory _wallets
    ) public owner {
        uint256[] memory _votes = new uint256[](_candidatelist.length);
        for (uint256 i = 0; i < _candidatelist.length; i++) {
            _votes[i] = 0;
        }
        elections[id] = Election({
                election_name: _electionname,
                election_desc: _desc,
                status: true,
                endDate: _endDate,
                candidateNames: _candidatelist,
                votes: _votes,
                maxvotes: _wallets.length
            });
        _mint(admin, _wallets.length);
        for(uint i=0; i<_wallets.length; i++){
            transfer(_wallets[i], 1);
        }
        voted[id][msg.sender] = true;
        emit CreateEvent(id, msg.sender, "The election has been created successfully");
        id++;
    }

    function getElection(uint256 _electionid) public view electionExist(_electionid) returns (Election memory) {
        return elections[_electionid];
    }

    function compareStrings(string memory _a, string memory _b) private pure returns(bool) {
        return keccak256(abi.encodePacked(_a)) == keccak256(abi.encodePacked(_b));
    }

    function totalVotes(uint[] memory _votes) private pure returns(uint){
        uint sum=0;
        for(uint i=0; i<_votes.length; i++){
            sum+=_votes[i];
        }
        return sum;
    }

    function vote(uint _electionid, string memory _candidateName) public votable(_electionid) electionExist(_electionid)  {
        require(elections[_electionid].status && elections[_electionid].endDate>block.timestamp, "The election has already ended");
        bool _flag = false;
        for(uint i=0; i<elections[_electionid].candidateNames.length; i++){
            if(compareStrings(_candidateName, elections[_electionid].candidateNames[i])){
                elections[_electionid].votes[i]++;
                voted[_electionid][msg.sender] = true;
                _flag = true;
                _burn(msg.sender, 1);
                emit VoteEvent(_electionid, msg.sender, "The vote has been succesfully registered");
                break;
            }
        }
        require(_flag, "No such candidate exist for this election");
        if(totalVotes(elections[_electionid].votes) == elections[_electionid].maxvotes){
            elections[_electionid].status = false;
        }
    }
    
    function endElection(uint _electionid) public electionExist(_electionid) owner {
        require(elections[_electionid].endDate<block.timestamp, "Election has already ended");
        elections[_electionid].status = false;
    }

    function getResults(uint _electionid) public view electionExist(_electionid) returns(string[] memory, uint[] memory) {
        require(!elections[_electionid].status || elections[_electionid].endDate<block.timestamp, "The election is still ongoing.");
        return (elections[_electionid].candidateNames, elections[_electionid].votes);
    }

}