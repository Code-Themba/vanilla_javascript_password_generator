const output = document.getElementById('password-output');
const clipboard= document.getElementById('clipboard');
const length = document.getElementById('range');
const lowercase= document.getElementById('lowercase');
const uppercase= document.getElementById('uppercase');
const numbers= document.getElementById('number');
const symbols= document.getElementById('symbol');
const generatePass = document.getElementById('generate-password');



// Functions To Generate Random Letters, Numbers and Symbols
const generateRandomLowerCaseLetter = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) +97)    
}
const generateRandomUpperCaseLetter = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const generateRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const generateRandomSymbols = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}


let randomFunc = {
    uppercase: generateRandomUpperCaseLetter,
    lowercase: generateRandomLowerCaseLetter,
    number: generateRandomNumber,
    symbol: generateRandomSymbols,
}

const generatePassword = (lowercase, number, symbol, uppercase, length) => {
    let generatedPass = '';

    const typesCount = lowercase + uppercase + number + symbol;

    const typesArr = [{ lowercase }, { uppercase }, { number }, { symbol }]
        .filter(item => Object.values(item)[0])

    if (typesCount === 0) { return ''; }

    for (let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPass += randomFunc[funcName]()
        })
    }

    return generatedPass.slice(0, length);
}




// Adding Event Handlers That Update The UI Output Upon Changing Of The Inputs
generatePass.addEventListener('click', () => {
    const _length = +length.value;
    const hasUpper = uppercase.checked;
    const hasLower = lowercase.checked;
    const hasNumber = numbers.checked;
    const hasSymbol = symbols.checked;
    
    output.innerText = generatePassword(
        hasLower,
        hasNumber,
        hasSymbol,
        hasUpper,
        _length);
});


clipboard.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = output.innerText;

    if (!password) return;

    textArea.value = password;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard!')
});