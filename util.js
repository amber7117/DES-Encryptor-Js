let PC1 = [57, 49, 41, 33, 25, 17, 9,
    1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15,
    7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29,
    21, 13, 5, 28, 20, 12, 4];

let PC2 = [14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32];

//  Table of Position of 64 bits at initial level: Initial Permutation Table
let initial_permutation_table = [58, 50, 42, 34, 26, 18, 10, 2,
                60, 52, 44, 36, 28, 20, 12, 4,
                62, 54, 46, 38, 30, 22, 14, 6,
                64, 56, 48, 40, 32, 24, 16, 8,
                57, 49, 41, 33, 25, 17, 9, 1,
                59, 51, 43, 35, 27, 19, 11, 3,
                61, 53, 45, 37, 29, 21, 13, 5,
                63, 55, 47, 39, 31, 23, 15, 7];

// # S-box Table
let sbox = [[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
         [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
         [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
         [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]],
 
        [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
         [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
         [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
         [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]],
 
        [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
         [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
         [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
         [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]],
 
        [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
         [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
         [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
         [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]],
 
        [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
         [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
         [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
         [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]],
 
        [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
         [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
         [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
         [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]],
 
        [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
         [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
         [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
         [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]],
 
        [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
         [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
         [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
         [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]]];

// Expansion D-box Table
let exp_d = [32, 1, 2, 3, 4, 5, 4, 5,
         6, 7, 8, 9, 8, 9, 10, 11,
         12, 13, 12, 13, 14, 15, 16, 17,
         16, 17, 18, 19, 20, 21, 20, 21,
         22, 23, 24, 25, 24, 25, 26, 27,
         28, 29, 28, 29, 30, 31, 32, 1];

// # Straight Permutation Table
let P_box = [16,  7, 20, 21,
       29, 12, 28, 17,
       1, 15, 23, 26,
       5, 18, 31, 10,
       2,  8, 24, 14,
       32, 27,  3,  9,
       19, 13, 30,  6,
       22, 11,  4, 25];



// # Final Permutation Table (Inverse Permutation)
let final_perm = [40, 8, 48, 16, 56, 24, 64, 32,
              39, 7, 47, 15, 55, 23, 63, 31,
              38, 6, 46, 14, 54, 22, 62, 30,
              37, 5, 45, 13, 53, 21, 61, 29,
              36, 4, 44, 12, 52, 20, 60, 28,
              35, 3, 43, 11, 51, 19, 59, 27,
              34, 2, 42, 10, 50, 18, 58, 26,
              33, 1, 41, 9, 49, 17, 57, 25]

//  Left sift by n
function leftShift(str, n)
{
    let shiftChars = "";
    let rightHalf = "";
    // console.log(str[0].charCodeAt(0).toString(2))

    for (let index = 0; index < n; index++) {
        shiftChars += str[index]
    }

    for (let index = n; index < str.length; index++) {
        rightHalf += str[index]
    }
    return rightHalf + shiftChars 
}              
//  Left Right by n
function RightShift(str, n)
{
    let shiftChars = "";
    let rightHalf = "";
    // console.log(str[0].charCodeAt(0).toString(2))

    for (let index = 0; index < n; index++) {
        shiftChars += str[index]
    }

    for (let index = n; index < str.length; index++) {
        rightHalf += str[index]
    }
    return rightHalf + shiftChars 
}              
// Add Parity bit and Convert To Binary
var testBitsStrings;
testBitsStrings = "";

function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    return ("000000000" + n.toString(2)).substr(-8)
  }

function Add_Parity(stream) {
  var binaryBits, bitStream, shiftedBits;
  bitStream = "";

  for (var i = 0;i < stream.length; i++) {
    binaryBits = byteString(stream[i].charCodeAt(0));
    testBitsStrings = binaryBits;
    shiftedBits = leftShift(binaryBits, 1);
    bitStream += shiftedBits;
  }

  return bitStream;
}
function SimpleBits(stream) {
  var binaryBits, bitStream, shiftedBits;
  bitStream = "";

  for (var i = 0;i < stream.length; i++) {
    binaryBits = byteString(stream[i].charCodeAt(0));
    // testBitsStrings = binaryBits;
    // shiftedBits = leftShift(binaryBits, 1);
    bitStream += binaryBits;
  }

  return bitStream;
}
   
function ConvertToBinary(stream)
{
    var binaryBits, bitStream;
    bitStream = "";

    for (var i = 0;i < stream.length; i++) {
        binaryBits = byteString(stream[i].charCodeAt(0));
        bitStream += binaryBits;
    }
    return bitStream;

}
// Pass into a table


function PassToTable(Stream, Table)
{
    let Ko = "", j;

    for (let i = 0; i < Table.length; i += 1) {
        j = Table[i];
        Ko += Stream[j - 1];
    }
    return Ko;
}

// Generate Subkeys

var SubKeys = [];

function generate_Subkey(X) {
  var SubKey;
  SubKey = "";

  for (var i, _pj_c = 0, _pj_a = PC2, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];
    SubKey += X[i - 1];
  }

  return SubKey;
}


// Subkeys
function ReturnSubkeys(Co, Do)
{
    var _pj;
    var C, D, Shifted_C, Shifted_D, Subkey, X;

    function _pj_snippets(container) {
    function in_es6(left, right) {
        if (right instanceof Array || typeof right === "string") {
        return right.indexOf(left) > -1;
        } else {
        if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
            return right.has(left);
        } else {
            return left in right;
        }
        }
    }

    container["in_es6"] = in_es6;
    return container;
    }

    _pj = {};

    _pj_snippets(_pj);

    C = Co;
    D = Do;

    for (var i = 0, _pj_a = 16; i < _pj_a; i += 1) {
    Shifted_C = "";
    Shifted_D = "";

    if (_pj.in_es6(i + 1, [1, 2, 9, 16])) {
        Shifted_C = leftShift(C, 1);
        Shifted_D = leftShift(D, 1);
    } else {
        Shifted_C = leftShift(C, 2);
        Shifted_D = leftShift(D, 2);
    }

    X = Shifted_C + Shifted_D;
    Subkey = generate_Subkey(X);
    
    let data = {
        C: Shifted_C,
        D: Shifted_D,
        Key: Subkey
    };

    SubKeys.push(data);
    C = Shifted_C;
    D = Shifted_D;
    }

    return SubKeys;

}
function ReturnDecrypTionSubkeys(Co, Do)
{
    var _pj;
    var C, D, Shifted_C, Shifted_D, Subkey, X;

    function _pj_snippets(container) {
    function in_es6(left, right) {
        if (right instanceof Array || typeof right === "string") {
        return right.indexOf(left) > -1;
        } else {
        if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
            return right.has(left);
        } else {
            return left in right;
        }
        }
    }

    container["in_es6"] = in_es6;
    return container;
    }

    _pj = {};

    _pj_snippets(_pj);

    C = Co;
    D = Do;

    for (var i = 0, _pj_a = 16; i < _pj_a; i += 1) {
    Shifted_C = "";
    Shifted_D = "";

    if (_pj.in_es6(i + 1, [1, 2, 9, 16])) {
        Shifted_C = leftShift(C, 1);
        Shifted_D = leftShift(D, 1);
    } else {
        Shifted_C = leftShift(C, 2);
        Shifted_D = leftShift(D, 2);
    }

    X = Shifted_C + Shifted_D;
    Subkey = generate_Subkey(X);
    
    let data = {
        C: Shifted_C,
        D: Shifted_D,
        Key: Subkey
    };

    SubKeys.push(data);
    C = Shifted_C;
    D = Shifted_D;
    }

    return SubKeys;

}

function splitToHalves(text)
{
    var left, right, textHalf;
    textHalf = Number.parseInt(text.length / 2);
    left = text.slice(0, textHalf);
    right = text.slice(textHalf);
    return {left, right}
}

// Text Processing
function xor(a, b) {
    var ans;
    ans = "";
  
    for (var i = 0, _pj_a = a.length; i < _pj_a; i += 1) {
      if (a[i] === b[i]) {
        ans = ans + "0";
      } else {
        ans = ans + "1";
      }
    }
  
    return ans;
  }


function Create_Blocks_6bits(xor_x) {
    var blocks, itr, register;
    blocks = [];
    itr = 1;
    register = "";
  
    for (var i = 0, _pj_a = xor_x.length; i < _pj_a; i += 1) {
      if (itr <= 6) {
        register += xor_x[i];
        itr += 1;
      } else {
        blocks.push(register);
        register = xor_x[i];
        itr = 2;
      }
    }
  
    blocks.push(register);
    return blocks;
  }
  
function binaryToDecimal(binary)
{
    return parseInt(binary, 2);
}

function decimalToBinary(decimal)
{
    let result = ("0000" + Number(decimal).toString(2)).substr(-4)
    return result;
}

function Create_blocks_4bits(blocks_6bits) {
    var blocks_4bits, i, itr, j;
    blocks_4bits = [];
    itr = 0;
  
    for (var b, _pj_c = 0, _pj_a = blocks_6bits, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      b = _pj_a[_pj_c];
      i = binaryToDecimal(Number.parseInt(b[0] + b[5]));
      j = binaryToDecimal(Number.parseInt(b[1] + b[2] + b[3] + b[4]));

      blocks_4bits.push(decimalToBinary(sbox[itr][i][j]));
      itr += 1;
    }
  
    return blocks_4bits;
}


function f(Ro, Ko) {
    var P_box_Z, Ro_48_bits, SZ, blocks, blocks_4bits, xor_x;
    Ro_48_bits = PassToTable(Ro, exp_d);
    xor_x = xor(Ro_48_bits, Ko);
    blocks = Create_Blocks_6bits(xor_x);

    blocks_4bits = Create_blocks_4bits(blocks);

    SZ = blocks_4bits.join("");
    // console.log("S(Z): " + SZ);
    P_box_Z = "";
  
    for (var i, _pj_c = 0, _pj_a = P_box, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      P_box_Z += SZ[i - 1];
    }
  
    // console.log("f(Lo, K1): " + P_box_Z);
    return P_box_Z;
  }
  
function do_rounds(Lo, Ro, SubKeys)
{
    let L, L1, P_box_Z, R, R1;
    R = Ro;
    L = Lo;
    // console.log("Lo: ", Lo);
    // console.log("Ro: ", Ro);
    let roundsOutput = []
    for (var i = 0, _pj_a = 16; i < _pj_a; i += 1) {
        // console.log(`---------------------------Iteration: ${i + 1}-----------------------------`);
        P_box_Z = f(R, SubKeys[i].Key);
        // console.log("Pbox_Z: ", P_box_Z)
        
        R1 = xor(L, P_box_Z);
        L1 = R;
        L = L1;
        R = R1;
        roundsOutput.push({
            L: L1,
            R: R1
        });

        // console.log(`L${i + 1}: ` + L1);
        // console.log(`R${i + 1} : ` + R1);
        // console.log(`--------------------------------------------------------------------`);
    }

    return roundsOutput;
}
function binToHex(n)
{
    let hexa = BigInt('0b' + n).toString(16).toUpperCase();
    return hexa;
}
// function hex2bin(hexSource) {
//     var bin = '';
//     for (var i=0;i<hexSource.length;i=i+2) {
//         bin += String.fromCharCode(hexdec(hexSource.substr(i,2)));
//     }
//     console.log("hex-to -bin-> ", bin);
//     return bin;
// }


function hex2bin(hex){
    return ( (BigInt('0x' + hex)).toString(2).substring(-8));
}
function generateEncryptedText(str) {
    var decimal_data, str_data, temp_data;
    str_data = " ";
  
    for (var i = 0, _pj_a = str.length; i < _pj_a; i += 7) {
      temp_data = Number.parseInt(str.slice(i, i + 7));
      decimal_data = binaryToDecimal(temp_data);
      str_data = str_data + String.fromCharCode(decimal_data);
    }
    return str_data;
  
  }

const decode = (input) => {
    
    let result = "";
    let arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;

};
export {PC1,
    initial_permutation_table,
    final_perm, 
    leftShift, 
    Add_Parity, 
    SimpleBits,
    PassToTable, 
    ReturnSubkeys,
    ConvertToBinary,
    splitToHalves,
    f,
    do_rounds,
    binToHex,
    hex2bin,
    generateEncryptedText,
    decode
}
