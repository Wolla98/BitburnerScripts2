// One-Stop for handling all things related to contracts

/** @param {NS} ns */
export async function main(ns) {

}

// Helper function. Used for testing scripts
/** @param {NS} ns */
function testContracts(ns, contractName, contractFunc, numContracts) {
  for (let i = 0; i < numContracts; ++i) {
    ns.codingcontract.createDummyContract(contractName)
  }

  let contracts = ns.ls("home", ".cct") 
  for (let file of contracts) {
    let data = ns.codingcontract.getData(file, "home")
    let answer = contractFunc(data)
    // ns.tprint(answer)
    let result = ns.codingcontract.attempt(answer, file, "home")
    ns.tprint("Result of attempt on " + file + ":\t" + result)
  }
}

// Helper function used for testing scripts
/** @param {NS} ns */
function deleteAllContracts(ns) {
  let files = ns.ls("home", ".cct")
  for (let file of files) {
    ns.rm(file, "home")
  }
}

// Encryption I: Caesar Cipher
// Inputs:
//    - Array With Two Elements
//      - [0] Plaintext
//      - [1] Left Shift Value
// Returns:
//    - [String] Ciphertext of the plaintext encoded using the Caesar Cipher. Spaces should be unchanged
function eccc(data) {
  const plaintext = data[0]
  const leftShift = data[1]

  let returnString = ""
  for (let i = 0; i < plaintext.length; ++i) {
    const plainTextKeyCode = plaintext.charCodeAt(i)

    // If the character is a space, adds it to the return string as is
    if (plainTextKeyCode == 32) {
      returnString = returnString + " "
    }

    // Else, shifts it as normal
    else {
      let newCharKeyCode = plainTextKeyCode - leftShift
      if (newCharKeyCode < 65) {
        newCharKeyCode = newCharKeyCode + 26
      }
      const newChar = String.fromCharCode(newCharKeyCode)
      returnString = returnString + newChar
    }
  }

  return returnString
}

// Encryption II: Vigenère Cipher
// Inputs:
//    - Array With Two Elements
//      - [0] Plaintext
//      - [1] Keyword
// Returns:
//      - [String] Ciphertext of the plaintext encoded in the keyword using the Vignere Ciphere. All Uppercase
function ecvc(data) {
  const plaintext = data[0]
  const keyword = data[1]

  let returnString = ""
  for (let i = 0; i < plaintext.length; ++i) {
    const plaintextKeyCode = plaintext.charCodeAt(i)
    const keywordCharIndex = i % keyword.length
    const keywordKeyCode = keyword.charCodeAt(keywordCharIndex)
    let newCharKeyCode = plaintextKeyCode + keywordKeyCode - 65

    // Creates the new character and wraps it around if needed
    if (newCharKeyCode > 90) {
      newCharKeyCode = newCharKeyCode - 26
    }
    const newChar = String.fromCharCode(newCharKeyCode)
    returnString = returnString + newChar
  }

  return returnString
}