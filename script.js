import {
    PC1,
    initial_permutation_table,
    final_perm,
    leftShift,
    Add_Parity,
    PassToTable,
    SimpleBits,
    ReturnSubkeys,
    ConvertToBinary,
    splitToHalves,
    binToHex,
    hex2bin,
    f,
    do_rounds,
    generateEncryptedText,
    decode
} from '/main.js';

let alertElement = document.getElementById("alert");
let keyBody = document.getElementById("keyBody");
let decryptionKeyBody = document.getElementById("decryptionKeyBody");

let roundBody = document.getElementById("roundBody");
let decryptionRoundBody = document.getElementById("decryptionRoundBody");
let keyElement = document.getElementById("keyText");
let plainTextShow = document.getElementById("plainTextShow");
let keyTextShow = document.getElementById("keyTextShow");
let encrypTedTextShow = document.getElementById("encrypTedTextShow");
let decodedTextShow = document.getElementById("decodedTextShow");
let textElement = document.getElementById("plainText");
let keyValidaterElement = document.getElementById("keyValidater");
let keyValidaterColor = keyValidaterElement.style.color;

let form = document.getElementById("form");

form.addEventListener('submit', Encrypt);
keyElement.addEventListener('click', enterText);

// alertElement.style.display = "none";

function Encrypt(e) {
    e.preventDefault();
    let key = keyElement.value;
    let text = textElement.value;

    if (key.length !== 8) {
        keyValidaterElement.style.color = 'red';
        return;
    }

    keyTextShow.innerText = key;
    plainTextShow.innerText = text;

    encryptANDDecrypt(key, text);
}
function enterText() { keyValidaterElement.style.color = keyValidaterColor; }

function encryptANDDecrypt(key, text) {

    let shiftedBinary = Add_Parity(key);

    let Ko = PassToTable(shiftedBinary, PC1);

    let keyHalves = splitToHalves(Ko);

    let Subkeys = ReturnSubkeys(keyHalves.left, keyHalves.right);
    Subkeys.map((key, index) => {
        keyBody.innerHTML +=
            `<tr>
    <th scope="row">${index + 1}</th>
    <td>${key.C}</td>
    <td>${key.D}</td>
    <td style="font-weight: 700; color: green;">${key.Key}</td>
  </tr>`;
    })

    let textBinary = ConvertToBinary(text);
    let initial_permuted_text = PassToTable(textBinary, initial_permutation_table);

    // halves
    let halves = splitToHalves(initial_permuted_text)
    let rounds = do_rounds(halves.left, halves.right, Subkeys)
    rounds.map((round, index) => {
        roundBody.innerHTML +=
            `<tr>
                <th scope="row">${index + 1}</th>
                <td>${round.L}</td>
                <td>${round.R}</td>
            </tr>`;
    })

    // finally
    let x = rounds[15].R + rounds[15].L;
    let final_permuted_text = PassToTable(x, final_perm)
    let encryptedText = binToHex(final_permuted_text)

    encrypTedTextShow.innerText = encryptedText;
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Decryption
    let revertKeys = (Subkeys.map((x) => x)).reverse();
    revertKeys.map((key, index) => {
        decryptionKeyBody.innerHTML +=
            `<tr>
                <th scope="row">${index + 1}</th>
                <td>${key.C}</td>
                <td>${key.D}</td>
                <td style="font-weight: 700; color: green;">${key.Key}</td>
            </tr>`;
    })

    let encryptedtextBinary = final_permuted_text;
    let encryptedinitial_permuted_text = PassToTable(encryptedtextBinary, initial_permutation_table);
    let encrypted_halves = splitToHalves(encryptedinitial_permuted_text)
    let encrypted_rounds = do_rounds(encrypted_halves.left, encrypted_halves.right, revertKeys)
    encrypted_rounds.map((round, index) => {
        decryptionRoundBody.innerHTML +=
            `<tr>
                <th scope="row">${index + 1}</th>
                <td>${round.L}</td>
                <td>${round.R}</td>
            </tr>`;
    })

    let encrypted_x = encrypted_rounds[15].R + encrypted_rounds[15].L
    let encrypted_final_permuted_text = PassToTable(encrypted_x, final_perm)

    decodedTextShow.innerText = decode(encrypted_final_permuted_text);

}