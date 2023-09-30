let addButton = document.getElementById('addButton')
let englishWord = document.getElementById('englishWord')
let russianWord = document.getElementById('russianWord')

addButton.addEventListener('click', function () {
    let dictionary = JSON.parse(localStorage.getItem('dictionary'))
    console.log(dictionary)
    dictionary[englishWord.value] = russianWord.value
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
    keys.forEach(str => {
        if (str.startsWith(englishValue)) {
            flag = true
            if (word === undefined || str.length < word.length){
                word = str
            }
        }


    })

    if (flag && englishValue !== '') {
        russianWord.value = word + ' - ' + dictionary[word]
    } else {
        russianWord.value = ''
    }
    checkRussianWordValue()

})

russianWord.addEventListener('click', function () {
    russianWord.value = ''
})

function checkRussianWordValue() {
    // let value = russianWord.value
    // if (value === '') {
    //     addButton.classList.remove('notVisible')
    //     addButton.classList.add('visible')
    // } else {
    //     addButton.classList.remove('visible')
    //     addButton.classList.add('notVisible')
    // }
}