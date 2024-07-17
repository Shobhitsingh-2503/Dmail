// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DMail {
    struct Message{
        string subject;
        string body;
        string attachment;
        address from;
        bool imp;
    }

    mapping(address => Message[]) private inbox;
    mapping(address => Message[]) private sent;
    mapping(address => Message[]) private important;

    function send(string memory sub,string memory body,string memory url,address to) external {
        Message memory newMail = Message(sub,body,url,msg.sender,false);
        Message memory newMailCopy = Message(sub,body,url,to,false);
        inbox[to].push(newMail);
        sent[msg.sender].push(newMailCopy);
    } 

    function getInbox(address adrs) external view returns(Message[] memory) {
        return inbox[adrs];
    }

    function getSent(address adrs) external view returns(Message[] memory){
        return sent[adrs];
    } 

    function getImportant(address adrs) external view returns(Message[] memory){
        return important[adrs];
    }

    function deleteMail(address adrs,uint256 index,string memory fromTo) external{
        if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("to"))){
            for(uint i=index;i<sent[adrs].length-1;i++){
                Message memory temp = sent[adrs][i];
                sent[adrs][i] = sent[adrs][i+1];
                sent[adrs][i+1] = temp;
            }
            sent[adrs].pop();
        }
        else if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("from"))){
            for(uint i=index;i<inbox[adrs].length-1;i++){
                Message memory temp = inbox[adrs][i];
                inbox[adrs][i] = inbox[adrs][i+1];
                inbox[adrs][i+1] = temp;
            }
            inbox[adrs].pop();
        }
        else if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("recievedFrom"))){
            for(uint i=0;i<important[adrs].length;i++){
                Message memory temp = important[adrs][i];
                important[adrs][i] = important[adrs][i+1];
                important[adrs][i+1] = temp;
            }
            important[adrs].pop();
         }

    } 

    function markImp(address adrs,uint index,string memory fromTo) external {
       if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("from"))){
            if(inbox[adrs][index].imp){
                inbox[adrs][index].imp = false;
                for(uint i=index;i<important[adrs].length-1;i++){
                    Message memory temp = important[adrs][i];
                    important[adrs][i] = important[adrs][i+1];
                    important[adrs][i+1] = temp;
                }
                important[adrs].pop();
            }
            else{
                inbox[adrs][index].imp = true;
                important[adrs].push(inbox[adrs][index]);
            }
       }
       else if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("to"))){
            if(sent[adrs][index].imp){
                sent[adrs][index].imp = false;
                for(uint i=index;i<important[adrs].length-1;i++){
                    Message memory temp = important[adrs][i];
                    important[adrs][i] = important[adrs][i+1];
                    important[adrs][i+1] = temp;
                }
                important[adrs].pop();
            }
            else{
                sent[adrs][index].imp = true;
                important[adrs].push(sent[adrs][index]);
            }
       }
       else if(keccak256(abi.encodePacked(fromTo)) == keccak256(abi.encodePacked("recievedFrom"))){
            if(important[adrs][index].imp){
                inbox[adrs][index].imp = false;
                for(uint i=index;i<important[adrs].length-1;i++){
                    Message memory temp = important[adrs][i];
                    important[adrs][i] = important[adrs][i+1];
                    important[adrs][i+1] = temp;
                }
                important[adrs].pop();
            }
       }
    }


}

