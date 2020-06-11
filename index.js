const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const questions = require('./questions')
const createCoinObj = require('./coinObj')
const { parseNum, parseBool, parseObj, parseArr, parseSats } = require('./answers')
const fs = require('fs');
const VerusZkedidUtils = require('verus-zkedid-utils')

let answers = {}

const ask_question = (type, key) => {
  if (type === 'end') {
    if (key === 'success') {
      try {
        const coinObj = createCoinObj(answers)

        const import_ = VerusZkedidUtils.StructuredCurrencyImport.writeImport([
          VerusZkedidUtils.PresetObjects.CoinObj.create(coinObj),
        ]);

        console.log('\n')
        console.log("Coin object created! (txFee and dustThreshold converted to Satoshis):")
        console.log(coinObj)
        console.log('\n')

        const path = `${answers.id}_import.txt`
  
        fs.writeFileSync(path, import_);
        console.log(`Import file saved at ${path}!`)
      } catch(e) {
        console.log("Failed to save file:")
        console.log(e)
      }
    }

    process.exit(key === 'success' ? 0 : 1)
  }

  const index = questions[type].findIndex(q => q.key === key)
  const { question, options } = questions[type][index]
  const { jumps } = options

  rl.question(question, function(input) {
    let result;

    try {
      if (input.length == 0) {
        if (options.required) throw new Error("This is a required field, please enter an answer.")
        else if (options.default_ans) result = options.default_ans
      }

      switch (options.type) {
        case "number":
          result = parseNum(input)
          break;
        case "object":
          result = parseObj(input)
          break;
        case "sats":
          result = parseSats(input)
          break;
        case "bool":
          result = parseBool(input)
          break;
        case "array":
          result = parseArr(input)
          break;
        default:
          result = input
          break;
      }
    } catch(e) {
      console.log(e.message);
      return ask_question(type, key)
    }
    
    answers[key] = result

    if (jumps != null) {
      for (let i = 0; i < jumps.length; i++) {
        const jump = jumps[i]

        if (jump.condition(result)) {
          return ask_question(jump.type, jump.key)
        }
      }
    }

    return ask_question(type, questions[type][index + 1].key)
  });
}

ask_question("general_questions", "id")