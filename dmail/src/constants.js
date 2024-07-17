export const deployedAddress = "0x0cd1c3950bF2a9dA30C16810Eb044D5f521D88a8";
export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "adrs",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fromTo",
        type: "string",
      },
    ],
    name: "deleteMail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adrs",
        type: "address",
      },
    ],
    name: "getImportant",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "body",
            type: "string",
          },
          {
            internalType: "string",
            name: "attachment",
            type: "string",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "bool",
            name: "imp",
            type: "bool",
          },
        ],
        internalType: "struct DMail.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adrs",
        type: "address",
      },
    ],
    name: "getInbox",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "body",
            type: "string",
          },
          {
            internalType: "string",
            name: "attachment",
            type: "string",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "bool",
            name: "imp",
            type: "bool",
          },
        ],
        internalType: "struct DMail.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adrs",
        type: "address",
      },
    ],
    name: "getSent",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "subject",
            type: "string",
          },
          {
            internalType: "string",
            name: "body",
            type: "string",
          },
          {
            internalType: "string",
            name: "attachment",
            type: "string",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "bool",
            name: "imp",
            type: "bool",
          },
        ],
        internalType: "struct DMail.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "adrs",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fromTo",
        type: "string",
      },
    ],
    name: "markImp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "sub",
        type: "string",
      },
      {
        internalType: "string",
        name: "body",
        type: "string",
      },
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
