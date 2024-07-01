// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 < 0.9.0;

contract Evoting {
    struct Election {
        uint electionid;
        string election_name;
        string election_desc;
        uint endDate;
        bool status;
        string[] candidateNames;
        uint[] votes;
        uint maxvotes;
    }

    uint256 private id=1;
    address public admin;

    mapping (uint => Election) public elections;
    mapping(uint256 => mapping(address => bool)) private voted;
    mapping (uint => address payable[]) private wallet;
    mapping (uint => bytes32[]) private uids;
    mapping(uint256 => mapping(bytes32 => bool)) private votedUid;

    event CreateEvent(uint256 _id, address creator, string msg);
    event VoteEvent(uint _electionid, address voter, string msg);

    modifier owner() {
        require(msg.sender == admin, "Only owner can perform this action");
        _;
    }
    modifier votable(uint256 _electionid, string memory _uid) {
        require(msg.sender != admin, "Admin cannot participate in the election");
        require(!voted[_electionid][msg.sender] && !votedUid[_electionid][keccak256(abi.encodePacked(_uid))], "You have already voted");
        bool flag1 = false;
        bool flag2 = false;
        for(uint i=0; i<wallet[_electionid].length; i++) {
            if(msg.sender == wallet[_electionid][i]){
                flag1 = true;
                break;
            }
        } 
        for(uint i=0; i<uids[_electionid].length; i++) {
            if(keccak256(abi.encodePacked(_uid)) == uids[_electionid][i]){
                flag2 = true;
                break;
            }
        } 
        require(flag1 && flag2, "This acccount is not allowed to vote in current election");
        _;
    }

    modifier electionExist(uint _electionid) {
        require(!compareStrings("", elections[_electionid].election_name), "No such election exist");
        _;
    }

    constructor () {
        admin = msg.sender;
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
        string memory _electionDesc,
        string[] memory _candidatelist,
        address payable[] memory _wallets,
        string[] memory _uid
    ) public payable owner {
        uint256[] memory _votes = new uint256[](_candidatelist.length);
        for (uint256 i = 0; i < _candidatelist.length; i++) {
            _votes[i] = 0;
        }
        elections[id] = Election({
                electionid: id,
                election_name: _electionname,
                election_desc: _electionDesc,
                status: true,
                endDate: block.timestamp + 100 weeks,
                candidateNames: _candidatelist,
                votes: _votes,
                maxvotes: _wallets.length
            });
           uint amount = msg.value/_wallets.length;
        for(uint i=0; i<_wallets.length; i++){
            _wallets[i].transfer(amount);
            wallet[id].push(_wallets[i]);
        }
        for(uint i=0; i<_uid.length; i++){
            uids[id].push(keccak256(abi.encodePacked(_uid[i])));
        }
        voted[id][msg.sender] = true;
        emit CreateEvent(id, msg.sender, "The election has been created successfully");
        id++;
    }

    function getElection(uint256 _electionid) public view electionExist(_electionid) returns (Election memory) {
        return elections[_electionid];
    }

    function getAllElection() public view returns(Election[] memory) {
        Election[] memory _elections = new Election[](id);
        for(uint i=1; i<=id; i++){
            _elections[i-1] = elections[i];
        }
        return _elections;
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

    function vote(string memory _uid, uint _electionid, string memory _candidateName) public votable(_electionid, _uid) electionExist(_electionid)  {
        require(elections[_electionid].status && elections[_electionid].endDate>block.timestamp, "The election has already ended");
        bool _flag = false;
        for(uint i=0; i<elections[_electionid].candidateNames.length; i++){
            if(compareStrings(_candidateName, elections[_electionid].candidateNames[i])){
                elections[_electionid].votes[i]++;
                voted[_electionid][msg.sender] = true;
                votedUid[_electionid][keccak256(abi.encodePacked(_uid))] = true;
                _flag = true;
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
        require(elections[_electionid].endDate>block.timestamp, "Election has already ended");
        elections[_electionid].status = false;
    }

    function getResults(uint _electionid) public view electionExist(_electionid) returns(string[] memory, uint[] memory) {
        require(!elections[_electionid].status || elections[_electionid].endDate<block.timestamp, "The election is still ongoing.");
        return (elections[_electionid].candidateNames, elections[_electionid].votes);
    }

    function sendGas(address payable recipient) public payable owner{
        require(msg.value==1 ether);
         recipient.transfer(msg.value);
    }
}