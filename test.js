// const randomchar = () => {
//     const chars = 'abcdefghijklmnopqrstuvwxyz';
//     return chars[Math.floor(Math.random() * chars.length)];
//   };
  
// const getRandomStrings = (length = 6) => {
//     const generateString = (length) => {
//         let str = '';
//         do {
//             str = ''
//             for (let i = 0; i < length; i++) {
//                 let char = '';
//                 do {
//                     char = randomchar();
//                 } while (char === 'r' || char === 's' || char === 'R' || char === 'S'); // Handling'r' and 's'
//                 str += char; // Adding character to the string
//             }
//         } while (str.includes('th'))
//         return str;
//     };

//     return Array.from({ length: 20 }, () => generateString(length)); // Generating 20 random strings of the given length
// };

// console.log(getRandomStrings(6));


const isNumeric = (str) => /^[0-9]+$/.test(str);

class RandomStringGenerator {
  constructor() {
    this.chars = 'abcdefghijklmnopqrstuvwxyz0123456789'; // a-z and 0-9
  }

  randomchar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  // Generate numbers string
  getNumericString(length = 6) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let char;
      do {
        char = this.randomchar();
      } while (!isNumeric(char)); // should be numeric
      str += char; // Add numeric character to the string
    }
    return str;
  }

  // Generate letters string (only lowercase letters)
  getLettersString(length = 6) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let char;
      do {
        char = this.randomchar();
      } while (!char.match(/[a-z]/)); // Should be a letter
      str += char; // Add letter character to the string
    }
    return str;
  }

  // Generate alphanumeric string (letters and digits, length 10)
  getAlphaNumericString(length = 10) {
    let str = '';
    for (let i = 0; i < length; i++) {
      let char = this.randomchar();
      str += char; // Add alphanumeric character to the string
    }
    return str;
  }

  // Generating 20 strings of a given type
  getRandomStrings(type) {
    let length = 6;
    if (type === 'alphanumeric') {
      length = 10; // Alphanumeric strings of length 10
    }
    const generate = {
        numbers: this.getNumericString.bind(this),
        letters: this.getLettersString.bind(this),
        alphanumeric: this.getAlphaNumericString.bind(this),
    };

    return Array.from({ length: 20 }, () => generate[type](length));
  }
}

const generator = new RandomStringGenerator();

// Generating 20 numeric strings of length 6
console.log('Numbers')
console.log(generator.getRandomStrings('numbers'));

// Generating 20 alphabetic strings of length 6
console.log('Letters')
console.log(generator.getRandomStrings('letters'));

// Generating 20 alphanumeric strings of length 10
console.log('Alphanumeric')
console.log(generator.getRandomStrings('alphanumeric'));