// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  
  /* Variable for password length */
  var length = parseInt(prompt("Enter the length of the password (must be between 8 and 128 characters):"));

  /* Check if length is a valid number (within the specified range) */
  if (isNaN(length) || length < 8 || length > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return;
}

  /* Asking user for character types */
  var includeLower = confirm("Include lowercase characters?");
  var includeUpper = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  /* Added to check if at least one character type is selected (and provide an alert, if not) */
  if (!includeLower && !includeUpper && !includeNumeric && !includeSpecial) {
    alert("Please select at least one character type.");
    return;
  }

/* Store user input in an object */
var passwordOptions = {
  length: length,
  includeLower: includeLower,
  includeUpper: includeUpper,
  includeNumeric: includeNumeric,
  includeSpecial: includeSpecial
};

return passwordOptions;

}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
  
  var options = getPasswordOptions();

  if (!options) {
    return; /* User canceled or provided invalid input. */
  }

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeLower) {
    possibleCharacters.push(...lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeUpper) {
    possibleCharacters.push(...upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  if (options.includeNumeric) {
    possibleCharacters.push(...numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.includeSpecial) {
    possibleCharacters.push(...specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  /* Needed to fill in enough characters to meet desired password length, after one of each specified character type has been used. */
  var remainingLength = options.length - guaranteedCharacters.length;

  for (var i = 0; i < remainingLength; i++) {
    var randomChar = getRandom(possibleCharacters);
    guaranteedCharacters.push(randomChar);
  }

  /* Shuffling the generated characters, to provide more randomised passwords. */
  guaranteedCharacters = guaranteedCharacters.sort(() => Math.random() - 0.5);

  return guaranteedCharacters.join('');

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);