let addButton = document.getElementById('addButton')
let englishWord = document.getElementById('englishWord')
let russianWord = document.getElementById('russianWord')
let datalist = document.getElementsByTagName('datalist')[0]

addButton.addEventListener('click', function () {
    let dictionary = JSON.parse(localStorage.getItem('dictionary'))
    dictionary[englishWord.value] = russianWord.value

    for (let key in dictionary){
        if (dictionary[key] === ''){
            delete dictionary[key]
        }
    }

    localStorage.setItem('dictionary', JSON.stringify(dictionary))
})

englishWord.addEventListener('input', function () {
    let englishValue = englishWord.value
    let dictionary_string = localStorage.getItem('dictionary')
    if (dictionary_string == null) {
        localStorage.setItem('dictionary', JSON.stringify({}))
    }
    let dictionary = JSON.parse(localStorage.getItem('dictionary'))
    let keys = Object.keys(dictionary)
    let flag = false
    let word
    let autocompleteWords = []
    keys.forEach(str => {
        if (str.startsWith(englishValue)) {
            if (str !== '') {
                autocompleteWords.push(str)
            }
            flag = true
            if (word === undefined || str.length < word.length) {
                word = str
            }
        }
    })
    datalist.innerHTML = ''
    let clearFlag = false
    autocompleteWords.forEach(autocompleteWord => {
        let newOption = `<option value="${autocompleteWord}"></option>`
        if (autocompleteWord !== englishValue){
            datalist.insertAdjacentHTML('afterbegin', newOption)
        } else {
            clearFlag = true
        }
    })
    if (clearFlag) {
        datalist.innerHTML = ''
    }
    if (flag && englishValue !== '') {
        russianWord.value = word + ' - ' + dictionary[word]
    } else {
        russianWord.value = ''
    }
})

function selectedOption(value) {
    let selected;
    datalist.childNodes.forEach(function(option) {
        if (option.value.toLowerCase() === value.toLowerCase())
            selected = option;
    });
    return selected;
}

englishWord.addEventListener('keypress', function(ev) {
    if (ev.key === 'Enter') {
        const text = englishWord.value;
        const selected = selectedOption(text);
        if (selected) {
            datalist.innerHTML = ''
            englishWord.value = selected.value;
            englishWord.blur();
        }
    }
});

russianWord.addEventListener('click', function () {
    russianWord.value = ''
})

