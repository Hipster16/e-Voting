// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "contracts/Groth16Verifier.sol";

struct Candidate {
    string name;
    string id;
    uint count;
}
struct Candidate_input {
    string name;
    string id;
}
contract ElectionContract {

    address public owner;
    string public name;
    string public desc;
    uint public voters_left;
    Candidate[] public candidates;
    uint[60] public hashArray;
    mapping(uint => uint) voted;
    bool public status;
    Groth16Verifier public verifier;

    constructor(string memory _name, string memory _desc, Candidate_input[] memory _candidates, uint _voters_left, uint[] memory _hashes, address _verifierAddress)
    {
        require(_voters_left == _hashes.length, "Invalid voter count");
        voters_left = _voters_left;
        verifier = Groth16Verifier(_verifierAddress);
        owner = msg.sender;
        name = _name;
        desc = _desc;
        for(uint i=0; i<60; i++){
            if(i<_hashes.length)
            {
                hashArray[i] = _hashes[i];
            }
            else
            {
                hashArray[i] = 0;
            }
        }
        status = true;
        
        for (uint i=0; i<_candidates.length; i++) 
        {
            candidates.push(Candidate({
                name:_candidates[i].name,
                id: _candidates[i].id,
                count: 0
            }));
        }
    }

    modifier admin_only()
    {
        require(msg.sender==owner, "only admin can perform this action");
        _;
    }

    function uint256ToAddress(uint256 input) public pure returns (address) {
    return address(uint160(input)); // Extracts the last 160 bits
}

function get_All_candidates() public view returns(Candidate[] memory)
{
    return candidates;
}

function checkStrings(string memory string1, string memory string2) private pure returns(bool) {
        return keccak256(abi.encodePacked(string1)) == keccak256(abi.encodePacked(string2));
    }

    function end_election() admin_only public {
        require(status == true, "The election has already ended");
        status = false;
    }
     event ProofValidity(bool validity);
     function vote(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[63] calldata _pubSignals, string calldata _candidateID) public
    {
        require(status==true, "the election has already ended");
        require(voted[_pubSignals[0]] == 0, "This person has already voted");
        bool validity = verifier.verifyProof(_pA, _pB, _pC, _pubSignals);
        emit ProofValidity(validity);
        bool data_correct = (_pubSignals[1] == 1 && uint256ToAddress(_pubSignals[62]) == address(this) );
        bool correct_hash_array = true;
        for(uint i=0; i<60; i++)
        {
            if(hashArray[i] != _pubSignals[i+2]){
                correct_hash_array = false;
                break;
            }
        }
        require(validity && data_correct && correct_hash_array, "The proof presented is not correct");
        bool exist=false;
        for(uint i = 0; i<candidates.length; i++)
        {
            if(checkStrings(candidates[i].id, _candidateID))
            {
                candidates[i].count++;
                exist = true;
                break;
            }
        }
        require(exist, "No such candidate exist");
        voted[_pubSignals[0]] = 1;
        voters_left--;
        if(voters_left == 0)
        {
            status = false;
        }
    }

    function get_hash_array() public view returns (uint[60] memory) {
        return hashArray;
    }
 }


