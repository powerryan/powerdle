var colors = {"incorrect": "rgb(0, 0, 0)", "present": "rgb(222, 190, 0)", "correct": "rgb(40, 167, 69)"};
var keyColors = {"incorrect": "rgb(150, 150, 150)", "present": "rgb(222, 190, 0)", "correct": "rgb(40, 167, 69)"};
var letters = {"correct": [], "incorrect":[], "present":[]};
var correctPositions = {};
var presentPositions = {};
var taken = [];
var available = [];
var answers = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var possibleLetters = {0:alphabet,1:alphabet,2:alphabet,3:alphabet,4:alphabet};
var mustContain = [];
var containQuantity = {};
var numberOfGuesses = 0;
var gameSolution = "";
var greenLetters = {};
var lastGuess = [];
var wordNumber = 0;
// for (var i = 0; i < document.querySelectorAll(".letter").length; i++) {
//   document.querySelectorAll(".letter")[i].addEventListener("click", changeColor);
// }

function changeColor() {
  if (!this.style.borderColor || this.style.borderColor == colors["incorrect"]) {
    this.style.borderColor = colors["present"];
  }
  else if (this.style.borderColor == colors["present"]) {
    this.style.borderColor = colors["correct"];
  }
  else {
    this.style.borderColor = colors["incorrect"];
  }
}
function playGame() {
  if (document.querySelectorAll(".wordToGuess")[4].innerHTML == "") {
    return;
  }

  document.getElementById('play').style.display = "none";
  document.getElementById('board').style.display = "block";
}

function newGame() {
  document.getElementById('play').style.display = "block";
  document.getElementById('board').style.display = "none";
  gameSolution="";
  numberOfGuesses = 0;
  for (var i = document.querySelectorAll(".wordToGuess").length - 1; i > -1; i--) {
    var letter = document.querySelectorAll(".wordToGuess")[i].innerHTML;
    if (letter.length != 0) {
      document.querySelectorAll(".wordToGuess")[i].innerHTML = "";

    }
  }
  location.reload();
}

document.addEventListener("keyup", function(event) {
  var game = document.getElementById('board').style.display;
  var play = document.getElementById('play').style.display;
  if (play != "none" && game == "none") {
    getGameWord();
    console.log(gameSolution);
  }
  else if (game != "none") {
    for (var i = 0; i < document.querySelectorAll(".letter").length; i++) {
      var letter = document.querySelectorAll(".letter")[i].innerHTML;

      if (letter.length === 0 && event.keyCode >= 65 && event.keyCode <= 90) {
        if ((numberOfGuesses+1) * 5 <= i) {
          break;
        }
        if (i > 0 && (i+1) % 5 == 0) {
          var word = "";
          for (var j = i-4; j < i; j++) {
            word = word + document.querySelectorAll(".letter")[j].innerHTML;
          }
          if (isWord(word+event.key)) {
            document.querySelectorAll(".letter")[i].innerHTML = event.key.toUpperCase();
            break;
          }
          else {
            document.querySelectorAll(".letter")[i].innerHTML = event.key.toUpperCase();
            for (let z = i-4; z < i+1; z++) {
              deleteWord(z);
            }

            break;
          }
        }
        else {
          document.querySelectorAll(".letter")[i].innerHTML = event.key.toUpperCase();
          break;
        }
      }
      if (event.keyCode == 46 || event.keyCode == 8) {
        deleteLetter(".letter");
        break;
      }
    }
  }
})

function getGameWord() {
  for (var i = 0; i < document.querySelectorAll(".wordToGuess").length; i++) {
    var letter = document.querySelectorAll(".wordToGuess")[i].innerHTML;
    console.log(event.key)
    if (letter.length === 0 && event.keyCode >= 65 && event.keyCode <= 90) {
      if (i > 0 && (i+1) % 5 == 0) {
        if (isWord(gameSolution+event.key)) {
          document.querySelectorAll(".wordToGuess")[i].innerHTML = "*";
          gameSolution = gameSolution + event.key.toLowerCase();
          break;
        }
        else {
          document.querySelectorAll(".wordToGuess")[i].innerHTML = "*";
          gameSolution="";
          for (let z = i-4; z < i+1; z++) {
            document.querySelectorAll(".wordToGuess")[z].innerHTML = "";
          }
          break;
        }
      }
      else {
        document.querySelectorAll(".wordToGuess")[i].innerHTML = "*";
        gameSolution = gameSolution + event.key.toLowerCase();
        break;
      }
    }
    if (event.keyCode == 46 || event.keyCode == 8) {
      deleteLetter(".wordToGuess");
      if (gameSolution.length > 0) {
        gameSolution = gameSolution.slice(0, -1);
      }
      break;
    }
  }
}

function deleteWord(z) {
  document.querySelectorAll(".letter")[z].innerHTML = "";
}

function deleteLetter(id) {
  for (var i = document.querySelectorAll(id).length - 1; i > -1; i--) {
    var letter = document.querySelectorAll(id)[i].innerHTML;
    if (letter.length != 0 && i >= numberOfGuesses * 5) {
      document.querySelectorAll(id)[i].innerHTML = "";
      break;
    }
    // if () {
    //   break;
    // }
  }
}

function isWord(line) {
  var line = line.toLowerCase();
  for (word in words) {
    if (line == words[word]) {
      return true;
    }
  }
  return false;
}

function guessWord() {
  console.log("GUESS IS A FUNCTION");
  if (document.querySelectorAll(".letter")[4].innerHTML == "") {
    console.log(document.querySelectorAll(".letter")[4].innerHTML);
    return
  }
  for (var i = 5; i > -1; i--) {
    if (document.querySelectorAll(".letter")[(i * 5) + 4].innerHTML != "") {
      console.log("checking for correct letters");
      if (i >= numberOfGuesses) {
        checkGuess(i*5);
      }
      break;
    }
  }
}

function checkGuess(num) {
  guess = [];
  for (let i = num; i < num+5; i++) {
    guess.push(document.querySelectorAll(".letter")[i].innerHTML.toLowerCase());
  }
  if (lastGuess.length == 0) {
    lastGuess = guess;
    console.log("lastguess is empty");
  }
  else if (lastGuess.join("") === guess.join("")) {
    console.log("guesses are same");
    for (let z = num+4; z >= num; z--) {
      deleteWord(z);
    }
    return;
  }
  lastGuess = guess;
  numberOfGuesses = numberOfGuesses + 1;
  if (guess.length == 5) {
    console.log(guess);
    console.log(num);
    checkCorrect(guess, num);
    checkPresent(guess, num);
    //checkIncorrect(guess, num);
  }
}

function checkCorrect(guess, num) {
  gameSolution.split("");
  for (let l = 0; l < 5; l++) {
    greenLetters[gameSolution[l]] = 0;
  }
  for (let l = 0; l < 5; l++) {
    if (gameSolution[l] == guess[l]) {
      document.querySelectorAll(".letter")[num+l].style.borderColor = colors["correct"];
      document.querySelectorAll(".letter")[num+l].style.color = colors["correct"];
      document.getElementById(guess[l].toUpperCase()).style.backgroundColor = colors["correct"];
      greenLetters[gameSolution[l]] = greenLetters[gameSolution[l]] + 1;
    }
  }
}


// go through guess letters
// is letter in word?
// is letter in same spot, move on
// is it in word, different spot
// need dictionary with letter counts of answer
// add count to dict of guess each time we make it yellow
// if counts in both dicts equal, letter will be grey if seen again
function checkPresent(guess, num) {
  gameSolution.split("");
  solutionCount = {};
  guessCount = {};
  possible = [];
  for (let i = 0; i < 5; i++) {
    guessCount[guess[i]] = 0;
    solutionCount[gameSolution[i]] = solutionCount[gameSolution[i]] + 1 || 1;
  }

  for (let l = 0; l < 5; l++) {
    if (gameSolution.includes(guess[l])) {
      if (gameSolution[l] != guess[l]) {
        if (guessCount[guess[l]] + greenLetters[guess[l]] < solutionCount[guess[l]]) {
          guessCount[guess[l]] = guessCount[guess[l]] + 1;
          document.querySelectorAll(".letter")[num+l].style.borderColor = colors["present"];
          document.querySelectorAll(".letter")[num+l].style.color = colors["present"];
          document.getElementById(guess[l].toUpperCase()).style.backgroundColor = colors["present"];
        } else {
          document.querySelectorAll(".letter")[num+l].style.borderColor = colors["incorrect"];
          document.querySelectorAll(".letter")[num+l].style.color = colors["incorrect"];
          document.getElementById(guess[l].toUpperCase()).style.backgroundColor = keyColors["incorrect"];
        }
      }
    } else {
      document.querySelectorAll(".letter")[num+l].style.borderColor = colors["incorrect"];
      document.querySelectorAll(".letter")[num+l].style.color = colors["incorrect"];
      document.getElementById(guess[l].toUpperCase()).style.backgroundColor = keyColors["incorrect"];
    }

  }
}

function nextWord(num) {
  var added = {};
  for (var i = 0; i < 5; i++) {
    var letter = document.querySelectorAll(".letter")[num+i].innerHTML.toLowerCase();
    var color = document.querySelectorAll(".letter")[num+i].style.borderColor;
    if (!letter.length) {
      break;
    }
    // add to incorrect letter
    if (colors["incorrect"] == color || !color) {
      if (!letters["incorrect"].includes(letter)) {
        letters["incorrect"].push(letter);
      }
      else if (presentPositions[letter] && !presentPositions[letter].include(i%5)) {
        presentPositions[letter].push(i%5);
      }
    }
    // add to correct letter
    else if (colors["correct"] == color) {
      if (!letters["correct"].includes(letter)) {
        letters["correct"].push(letter);
        if (!added[letter] && letters["present"].includes(letter)) {
          letters["present"].splice(letters["present"].indexOf(letter), 1);
        }
      }
      else if (!added[letter] && letters["present"].includes(letter)) {
        letters["present"].splice(letters["present"].indexOf(letter), 1);
      }
      if (!correctPositions[letter]) {
        correctPositions[letter] = [i%5];
        taken.push(letter);
      }
      else if (!correctPositions[letter].includes(i%5)) {
        correctPositions[letter].push(i%5);
        taken.push(letter);
      }
    }
    else if (colors["present"] == color) {
      if (!added[letter]) {
        added[letter] = 1;
      }
      else {
        added[letter] += 1;
      }
      if (!letters["present"].includes(letter)) {
        letters["present"].push(letter);
      }
      else if (letters["present"].filter(x => x == letter).length < added[letter]) {
        letters["present"].push(letter);
      }
      if (!presentPositions[letter]) {
        presentPositions[letter] = [i%5];
      }
      else if (!presentPositions[letter].includes(i%5)) {
        presentPositions[letter].push(i%5);
      }
    }

  }
}

function getSame(word) {
  let sorted_arr = word.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      if (!results.includes(sorted_arr[i])) {
        results.push(sorted_arr[i]);
      }
    }
  }
  return results;
}

function getEverySame(word) {
  let sorted_arr = word.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
    }
  }
  return results;
}

// same color
function removeLetters(word, color) {
  // if all grey, remove every letter from every position
  var same = getSame(word);

  if (color[0] == "") {
    for (var l = 0; l < 5; l++) {
      for (var e = 0; e < 5; e++) {
        possibleLetters[e] = possibleLetters[e].replaceAll(word[l], "");
      }
    }
  }
  // if all yellow, remove letter only from current position
  else if (color[0] == colors["present"]) {
    for (var l = 0; l < 5; l++) {
      possibleLetters[l] = word.join().replaceAll(word[l], "");
      if (!mustContain.includes(word[l])) {
        mustContain.push(word[l]);
        containQuantity[word[l]] = 1;
      }
      else if (same.includes(word[l])) {
        var number = word.filter(x => x == word[l]).length;
        if (number > containQuantity[word[l]]) {
          containQuantity[word[l]] = number;
        }
      }
    }
  }
  // if all green, remove every letter except correct letter
  else {
    for (var l = 0; l < 5; l++) {
      possibleLetters[l] = word[l];
    }
  }
}

// yellow and green
function saveLetters(word, color) {
  var same = getSame(word);
  var presentLetters = "";
  // all green letters saved
  for (var l = 0; l < 5; l++) {
    if (color[l] == colors["correct"]) {
      possibleLetters[l] = word[l];
    }
    else {
      presentLetters += word[l];
    }
  }
  // all yellow letters stored except current positions
  for (var l = 0; l < 5; l++) {
    if (color[l] == colors["present"]) {
      possibleLetters[l] = presentLetters.replaceAll(word[l], "");
      if (!mustContain.includes(word[l])) {
        mustContain.push(word[l]);
        containQuantity[word[l]] = word.filter(x => x == word[l]).length;
      }
      else {
        var number = word.filter(x => x == word[l]).length;
        if (number > containQuantity[word[l]]) {
          containQuantity[word[l]] = number;
        }
      }
    }
  }
}

// grey and green
function eliminateLetters(word, color) {
  var eliminated = "";
  // all greens kept
  for (var l = 0; l < 5; l++) {
    if (color[l] == colors["correct"]) {
      possibleLetters[l] = word[l];
    }
    else {
      eliminated += word[l];
    }
  }
  // all greys eliminated
  for (var l = 0; l < 5; l++) {
    if (color[l] == "") {
      for (var e = 0; e < eliminated.length; e++) {
        possibleLetters[l] = possibleLetters[l].replaceAll(eliminated[e], "");
      }
    }
  }
}

// yellow and grey
function compareLetters(word, color) {
  var yellows = "";
  var greyOnly = "";
  for (var l = 0; l < 5; l++) {
    if (color[l] == colors["present"]) {
      yellows += word[l];
    }
    else {
      greyOnly += word[l];
    }
  }
  var same = getEverySame(yellows.split(""));
  var allGreys = greyOnly;
  greyOnly = greyOnly.split("").filter(x => !yellows.includes(x))
  greyOnly = greyOnly.join();
  for (var l = 0; l < 5; l++) {
    for (var e = 0; e < greyOnly.length; e++) {
      if (possibleLetters[l].includes(word[l])) {
        possibleLetters[l] = possibleLetters[l].replaceAll(word[l], "");
      }
      possibleLetters[l] = possibleLetters[l].replaceAll(greyOnly[e], "");
      if (color[l] == colors["present"] && !mustContain.includes(word[l])) {
        mustContain.push(word[l]);
        if (allGreys.includes(word[l])) {
          containQuantity[word[l]] = same.filter(x => x == word[l]).length + 1;
        }
        else {
          containQuantity[word[l]] = (same.filter(x => x == word[l]).length + 1) * -1;
        }
      }
      else if (color[l] == colors["present"]) {
        if (allGreys.includes(word[l])) {
          containQuantity[word[l]] = same.filter(x => x == word[l]).length + 1;
        }
        else {
          containQuantity[word[l]] = (same.filter(x => x == word[l]).length + 1) * -1;
        }
      }
    }
  }
}

// yellow, green, grey
function decipherLetters(word, color) {
  var yellows = "";
  var greyOnly = "";
  var greenandyellow = "";
  for (var l = 0; l < 5; l++) {
    if (color[l] == colors["correct"]) {
      possibleLetters[l] = word[l];
      greenandyellow += word[l];
    }
    else if (color[l] == colors["present"]) {
      yellows += word[l];
      greenandyellow += word[l];
    }
    else {
      greyOnly += word[l];
    }
  }
  var allGreys = greyOnly;
  greyOnly = greyOnly.split("").filter(x => !yellows.includes(x))
  greyOnly = greyOnly.join();
  var same = getEverySame(greenandyellow.split(""));
  for (var l = 0; l < 5; l++) {
    for (var e = 0; e < greyOnly.length; e++) {
      if (color[l] != colors["correct"]) {
        if (possibleLetters[l].includes(word[l])) {
          possibleLetters[l] = possibleLetters[l].replaceAll(word[l], "");
        }
        possibleLetters[l] = possibleLetters[l].replaceAll(greyOnly[e], "");
      }
      if (color[l] == colors["present"] && !mustContain.includes(word[l])) {
        mustContain.push(word[l]);
        if (allGreys.includes(word[l])) {
          containQuantity[word[l]] = same.filter(x => x == word[l]).length + 1;
        }
        else {
          containQuantity[word[l]] = (same.filter(x => x == word[l]).length + 1) * -1;
        }
      }
      else if (color[l] == colors["present"]) {
        if (allGreys.includes(word[l])) {
          containQuantity[word[l]] = same.filter(x => x == word[l]).length + 1;
        }
        else {
          containQuantity[word[l]] = (same.filter(x => x == word[l]).length + 1) * -1;
        }
      }
    }
  }
}

function processWord(num) {
  var wordLetters = [];
  var wordColors = [];
  for (var i = 0; i < 5; i++) {
    wordLetters.push(document.querySelectorAll(".letter")[num+i].innerHTML.toLowerCase());
    wordColors.push(document.querySelectorAll(".letter")[num+i].style.borderColor);
    if (!wordLetters[wordLetters.length-1].length) {
      break;
    }
  }
  // all letters share same status
  if (wordColors.filter(x => x == wordColors[0]).length == 5) {

    removeLetters(wordLetters, wordColors);
  }
  // letters are both correct and present
  else if ((wordColors.filter(x => x == colors["correct"]).length +
            wordColors.filter(x => x == colors["present"]).length) == 5) {
    saveLetters(wordLetters, wordColors);
  }
  // letters are correct and incorrect
  else if ((wordColors.filter(x => x == colors["correct"]).length +
            wordColors.filter(x => x == "").length) == 5) {
    eliminateLetters(wordLetters, wordColors);
  }
  // letters are present or incorrect
  else if ((wordColors.filter(x => x == "").length +
            wordColors.filter(x => x == colors["present"]).length) == 5) {
    compareLetters(wordLetters, wordColors);
  }
  // letters are all three colors
  else {
    decipherLetters(wordLetters, wordColors);
  }
}

function generateGuesses() {
  mustContain = [];
  containQuantity = {};
  possibleLetters = {0:alphabet,1:alphabet,2:alphabet,3:alphabet,4:alphabet};
  answers = [];
  if (!document.querySelectorAll(".letter")[4].innerHTML) {
    document.querySelector(".output").style.visibility = "visible";
    return
  }
  for (var i = 0; i < 6; i++) {
    if (document.querySelectorAll(".letter")[(i * 5) + 4].innerHTML) {
      processWord(i*5);
    }
  }
  var solution;
  for (var i = 0; i < words.length; i ++) {
    solution = true;
    for (var l = 0; l < mustContain.length; l++) {
      word = words[i].split("");
      //if (word.filter(x => mustContain.includes(x)).length >= mustContain.length) {
      if (containQuantity[mustContain[l]] < 0) {
        if (word.filter(x => x == mustContain[l]).length < containQuantity[mustContain[l]] * -1) {
          solution = false;
          break;
        }
      }
      else {
        if (!(word.filter(x => x == mustContain[l]).length == containQuantity[mustContain[l]])) {
          solution = false;
          break;
        }
      }
    }
  //}
    if (solution) {
      for (var e = 0; e < 5; e++) {
        if (!possibleLetters[e].includes(words[i][e])) {
          solution = false;
          break;
        }
      }
    }
    if (solution) {
      answers.push(words[i]);
    }
  }

  document.querySelector(".output").innerHTML = "";
  for (var el = 0; el < answers.length - 1; el++) {
    document.querySelector(".output").innerHTML += answers[el].toUpperCase() + ", ";
  }
  if (answers.length) {
    document.querySelector(".output").innerHTML += answers[answers.length -1].toUpperCase();
  }
  document.querySelector(".output").style.visibility = "visible";

}

function generateGuesses1() {
  letters = {"correct": [], "incorrect":[], "present":[]};
  correctPositions = {};
  presentPositions = {};
  taken = [];
  answers = [];
  if (!document.querySelectorAll(".letter")[4].innerHTML) {
    document.querySelector(".output").style.visibility = "visible";
    return
  }
  for (var i = 0; i < 6; i++) {
    if (document.querySelectorAll(".letter")[(i * 5) + 4].innerHTML) {
      nextWord(i*5);

    }
  }
  for (var i = 0; i < words.length; i ++) {
    var correctLetters = 0;
    var incorrect = false;

    // check for incorrect letters
    for (var x = 0; x < 5; x++) {
      for (var y = 0; y < letters["incorrect"].length; y++) {
        if (words[i][x] == letters["incorrect"][y] && !isCorrect(words[i][x], x)) {
          incorrect = true;
        }
      }
    }
    // check for correct letters
    if (!incorrect) {
      for (var j = 0; j < taken.length; j++) {
        var count = 0;
        for (var pos = 0; pos < correctPositions[taken[j]].length; pos++) {
          if (words[i][correctPositions[taken[j]][pos]] == taken[j]) {
            count++;
          }
        }
        if (count == correctPositions[taken[j]].length) {
          correctLetters++;
        }
      }
    }
    // check for present letters
    if (!incorrect && correctLetters == taken.length) {

      var allPresent = true;
      if (!containsLetter(words[i], letters["present"])) {
        allPresent = false;
      }
      else {
        for (var letter = 0; letter < letters["present"].length; letter++) {
          // ensure all present letters in word

          // ensure present letters in possible positions
          if (!possiblePosition(words[i], letters["present"][letter])) {

            allPresent = false;
          }
        }
      }
      if (allPresent) {
        answers.push(words[i]);
      }
    }
  }

  document.querySelector(".output").innerHTML = "";
  for (var el = 0; el < answers.length - 1; el++) {
    document.querySelector(".output").innerHTML += answers[el].toUpperCase() + ", ";
  }
  if (answers.length) {
    document.querySelector(".output").innerHTML += answers[answers.length -1].toUpperCase();
  }
  document.querySelector(".output").style.visibility = "visible";
}

function isCorrect(letter, position) {
  for (var l = 0; l < taken.length; l++) {
    if (letter == taken[l]) {
      // if letter is not in any of letter's correct spots
      if (!correctPositions[letter].includes(position)) {
        // if letter not present or is in present letters and in eliminated spots
        if (!presentPositions[letter] || (presentPositions[letter] && presentPositions[letter].includes(position))) {
          return false;
        }
      }
      return true;
    }
  }
  if (presentPositions[letter] && !presentPositions[letter].includes(position)) {
      if (!correctPositions[letter] || !correctPositions[letter].includes(position)) {
        return true;
      }
    }
  return false;
}

function containsLetter(word, presentLetters) {
  var count = 0;
  var inWord;
  for (var l = 0; l < presentLetters.length; l++) {
    inWord = 0;
    count = presentLetters.filter(x => x == presentLetters[l]).length;
    for (var e = 0; e < 5; e++) {
      if (word[e] == presentLetters[l]) {
        inWord++;
      }
    }
    if (inWord < count) {
      return false;
    }
  }
  return true;
}

function possiblePosition(word, letter) {
  var possible = false;
  for (var l = 0; l < 5; l++) {
    if (word[l] == letter) {
      if (presentPositions[letter].includes(l)) {
        return false;
      }
      else if (correctPositions[letter]) {
        if (!correctPositions[letter].includes(l)) {
          possible = true;
        }
      }
      else if (!correctPositions[letter]) {
        possible = true;
      }
    }
  }
  return possible;
}
