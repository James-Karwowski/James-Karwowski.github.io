// JavaScript code for password generation
document.getElementById('generate-password').addEventListener('click', function() {
    const animal = document.getElementById('animal').value;
    const vehicle = document.getElementById('vehicle').value;
    const person = document.getElementById('person').value;
    const number = document.getElementById('number').value;
    const character = document.getElementById('character').value;
    const game = document.getElementById('game').value;
    const length = parseInt(document.getElementById('length').value, 10);

    function getRandomLatinCharacter() {
        const latinAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÄÖÜäöüÀÁÂÃÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕØÙÚÛÜÝÞßàáâãåæçèéêëìíîïðñòóôõøùúûüýþÿ";
        const randomIndex = Math.floor(Math.random() * latinAlphabet.length);
        return latinAlphabet[randomIndex];
    }

    const randomCharacter1 = getRandomLatinCharacter();
    const randomCharacter2 = getRandomLatinCharacter();
    const randomCharacter3 = getRandomLatinCharacter();
    const randomCharacter4 = getRandomLatinCharacter();
    // Simple password generation logic
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let password = '';

    if (randomNumber === 1) {
        password = `${game}${character}${randomCharacter4}${randomCharacter2}${randomCharacter3}${randomCharacter1}${randomCharacter3}${randomCharacter2}_${character}${animal}${number}${character}${vehicle}${person}${character}${number}`;
    } else if (randomNumber === 2) {
        password = `${game}${character}${randomCharacter4}${randomCharacter3}${randomCharacter2}${randomCharacter3}${randomCharacter1}${randomCharacter2}-${person}${character}${vehicle}${number}${character}${animal}${character}${number}`;
    } else if (randomNumber === 3) {
        password = `${game}${character}${randomCharacter4}${randomCharacter2}${randomCharacter3}${randomCharacter3}${randomCharacter1}${randomCharacter2}_${number}${character}${person}${vehicle}${character}${animal}${character}${number}`;
    } else if (randomNumber === 4) {
        password = `${game}${character}${randomCharacter4}${randomCharacter3}${randomCharacter2}${randomCharacter1}${randomCharacter2}${randomCharacter3}-${character}${number}${animal}${character}${person}${vehicle}${character}${number}`;
    } else if (randomNumber === 5) {
        password = `${game}${character}${randomCharacter4}${randomCharacter2}${randomCharacter3}${randomCharacter1}${randomCharacter2}${randomCharacter3}_${vehicle}${character}${person}${number}${character}${animal}${character}${number}`;
    } else if (randomNumber === 6) {
        password = `${randomCharacter1}${randomCharacter4}${randomCharacter3}${randomCharacter3}${randomCharacter1}${randomCharacter2}-${number}${character}${vehicle}${person}${character}${animal}${character}${number}${game}${character}`;
    } else if (randomNumber === 7) {
        password = `${randomCharacter1}${randomCharacter4}${randomCharacter3}${randomCharacter3}${randomCharacter1}${randomCharacter2}_${character}${vehicle}${number}${character}${person}${animal}${character}${number}${game}${character}`;
    } else if (randomNumber === 8) {
        password = `${randomCharacter1}${randomCharacter4}${randomCharacter3}${randomCharacter1}${randomCharacter3}${randomCharacter2}-${animal}${character}${person}${number}${character}${vehicle}${character}${number}${game}${character}`;
    } else if (randomNumber === 9) {
        password = `${randomCharacter1}${randomCharacter4}${randomCharacter3}${randomCharacter1}${randomCharacter3}${randomCharacter2}_${number}${character}${animal}${person}${character}${vehicle}${character}${number}${game}${character}`;
    } else {
        password = `${randomCharacter1}${randomCharacter4}${randomCharacter3}${randomCharacter1}${randomCharacter2}${randomCharacter3}-${character}${person}${vehicle}${number}${character}${animal}${character}${number}${game}${character}`;
    }

    if (password.length > length) {
        password = password.slice(0, length);
    }

    document.getElementById('generated-password').value = password;
});