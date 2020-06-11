module.exports = {
  general_questions: [
    {
      question: "What is the ticker symbol of your coin? (e.g. VRSC): ",
      key: "id",
      options: { required: true, default_ans: null, type: "string" },
    },
    {
      question: "What is the name you want displayed in the wallet for your coin? (e.g. Verus, for VRSC): ",
      key: "name",
      options: { required: true, default_ans: null, type: "string" },
    },
    {
      question: "What is the smallest amount (dust threshold) of your coin that can be sent in a transaction? (e.g. 0.00001): ",
      key: "dustThreshold",
      options: { required: false, default_ans: '0.00001', type: "sats" },
    },
    {
      question: "Enter the hex color code that you want your coin to be shown with in Verus Desktop (e.g. #FF0000): ",
      key: "themeColor",
      options: { required: true, default_ans: null, type: "string" },
    },
    {
      question: "Is your coin a Komodo asset chain? (y/n): ",
      key: "isAc",
      options: {
        required: false,
        default_ans: false,
        type: "bool",
        jumps: [{
          condition: (ans) => ans,
          type: "general_questions",
          key: 'native'
        },
        {
          condition: (ans) => !ans,
          type: "general_questions",
          key: 'isPbaasChain'
        }],
      },
    },
    {
      question: "Is your coin a Verus PBaaS chain? (y/n): ",
      key: "isPbaasChain",
      options: {
        required: false,
        default_ans: 'n',
        type: "bool",
        jumps: [{
          condition: (ans) => !ans,
          type: 'end',
          key: 'fail'
        }],
      },
    },
    {
      question: "Should your coin include a native wallet (running from a blockchain daemon)? (y/n): ",
      key: "native",
      options: {
        required: true,
        default_ans: 'n',
        type: "bool",
        jumps: [{
          condition: (ans) => ans,
          type: "native_questions",
          key: 'startupParams'
        }],
      },
    },
    {
      question: "Do you want to allow users to run your coin with electrum servers? (y/n): ",
      key: "electrum",
      options: {
        required: true,
        default_ans: 'n',
        type: "bool",
        jumps: [{
          condition: (ans) => ans,
          type: "electrum_questions",
          key: 'txFee'
        },
        {
          condition: (ans) => !ans,
          type: "end",
          key: 'success'
        },],
      },
    },
  ],
  native_questions: [
    {
      question: "Enter all of your chains native parameters, delimited by '|'. (e.g. -ac_name=VRSC|-ac_supply=0|-ac_reward=0,38400000000,2400000000): ",
      key: "startupParams",
      options: {
        required: true,
        default_ans: null,
        type: "string",
      },
    },
    {
      question: "Enter the RPC port that your coin daemon will use to connect to Verus Desktop: ",
      key: "rpcPort",
      options: {
        required: true,
        default_ans: null,
        type: "number",
      },
    },
    {
      question: "Enter the directory where the data for your coin is stored on MacOS, relative to the Application Support folder (e.g. Komodo/VRSC): ",
      key: "osxDir",
      options: {
        required: true,
        default_ans: null,
        type: "string",
      },
    },
    {
      question: "Enter the directory where the data for your coin is stored on Windows, relative to the AppData folder (e.g. Komodo/VRSC): ",
      key: "winDir",
      options: {
        required: true,
        default_ans: null,
        type: "string",
      },
    },
    {
      question: "Enter the directory where the data for your coin is stored on Linux, relative to the home folder (e.g. .komodo/VRSC): ",
      key: "linuxDir",
      options: {
        required: true,
        default_ans: null,
        type: "string",
      },
    },
    {
      question: "Does your chain support zero-knowledge transactions? (y/n): ",
      key: "isPrivate",
      options: {
        required: true,
        default_ans: null,
        type: "bool",
        jumps: [{
          condition: (ans) => !ans,
          type: "general_questions",
          key: 'electrum'
        }],
      },
    },
    {
      question: "Does your chain support zero-knowledge sapling transactions? (y/n): ",
      key: "sapling",
      options: {
        required: true,
        default_ans: null,
        type: "bool",
      },
    },
    {
      question: "Does your chain support ONLY zero-knowledge transactions? (y/n): ",
      key: "zOnly",
      options: {
        required: true,
        default_ans: null,
        type: "bool",
        jumps: [{
          condition: () => true,
          type: "general_questions",
          key: 'electrum'
        }],
      },
    },
  ],
  electrum_questions: [
    {
      question: "Enter the standard network transaction fee for your coin (e.g. 0.0001 on Verus): ",
      key: "txFee",
      options: {
        required: true,
        default_ans: null,
        type: "sats",
      },
    },
    {
      question: "Enter at least two electrum servers that can be used to connect to your coin in ip:port:protocol format, delimited by '|' (e.g. el0.veruscoin.io:17485:tcp|el1.veruscoin.io:17485:tcp): ",
      key: "electrumServers",
      options: {
        required: true,
        default_ans: null,
        type: "string",
        jumps: [{
          condition: () => true,
          type: "end",
          key: 'success'
        }],
      },
    },
  ]
};