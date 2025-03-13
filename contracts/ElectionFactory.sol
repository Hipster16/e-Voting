// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "contracts/Groth16Verifier.sol";
import "contracts/ElectionContract.sol";

struct Election
{
    uint id;
    string name;
    string desc;
    string[] voters;
    address electionContractAddress;
}

struct Election_details {
    string name;
    string desc;
    address electionContractAddress;
}

contract ElectionFactory
{
    address public owner;
    uint next_election_id = 0;
    address public verifier;
    Election[] public elections;

    constructor(){
        owner = msg.sender;
        Groth16Verifier _verifier = new Groth16Verifier();
        verifier = address(_verifier);
    }

    modifier admin_only()
    {
        require(msg.sender == owner, "Only admin can perform this action");
        _;
    }
    function create_election(string calldata _name, string calldata _desc, Candidate_input[] calldata _candidates, uint _voter_no, string[] calldata _voters, uint[] calldata _hashes ) public admin_only {
        ElectionContract new_election = new ElectionContract(
            _name,
            _desc,
            _candidates,
            _voter_no,
            _hashes,
            verifier
        );
        elections.push(Election({
            id: next_election_id,
            name:_name,
            desc:_desc,
            electionContractAddress: address(new_election),
            voters: _voters
        }));
        next_election_id++;
    }

    function checkStrings(string storage string1, string calldata string2) private pure returns(bool) {
        return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
    }

    function get_elections(string calldata _name) public view returns(Election_details[] memory)  {
        Election_details[] memory userElection = new Election_details[](elections.length);
        uint index = 0;
        for(uint i=0; i<elections.length; i++)
        {
            for(uint j=0; j<elections[i].voters.length; j++)
            {
                if(checkStrings(elections[i].voters[j] ,_name)){
                userElection[index] = Election_details({
                    name: elections[i].name,
                    desc: elections[i].desc,
                    electionContractAddress: elections[i].electionContractAddress
                });
                index++;
                }
            }
        }
        return userElection;
    }

    function get_all_elections() public view  returns(Election_details[] memory) {
        uint index = 0;
        Election_details[] memory userElection = new Election_details[](elections.length);
        for(uint i=0; i<elections.length; i++)
        {
            userElection[index] = Election_details({
                    name: elections[i].name,
                    desc: elections[i].desc,
                    electionContractAddress: elections[i].electionContractAddress
                });
                index++;
        }
    return userElection;

    }

    function endElection(address _electionContractAddress) public admin_only
    {
        ElectionContract c = ElectionContract(_electionContractAddress);
        c.end_election();
    }
}