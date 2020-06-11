const parseBool = (boolString) => {
  const res = boolString.toLowerCase()
  if (boolString !== 'y' && boolString !== 'n') throw new Error("Expected 'y' or 'n'")
  
  return res === 'y'
}

const parseNum = (intString) => {
  const res = Number(intString)

  if (isNaN(intString)) throw new Error("Expected number, got " + intString)
  return res
}

const parseSats = (intString) => {
  return (Math.round(parseNum(intString)*10000000000))/100
}

const parseObj = (objString) => {
  let obj = {}

  objString.split('|').map(param => {
    const paramArr = param.split('=')

    obj[paramArr[0]] = isNaN(paramArr[1]) ? paramArr[1] : Number(paramArr[1])
  })

  return obj
}

const parseArr = (arrString) => {
  return arrString.split('|')
}

module.exports = {
  parseBool,
  parseNum,
  parseObj,
  parseArr,
  parseSats
}