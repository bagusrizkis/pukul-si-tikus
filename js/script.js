// variable -------
const lubang2 = document.getElementsByClassName('lubang')
let score = document.getElementById('score')
let hscore = document.getElementById('hscore')
let tikus = document.getElementsByClassName('tikus')
let lubangTerakhir;
let waktuSelesai = false;
let onGoing = false
let endscore = 0
let hightScore = 0
let minimalRand = 0
let maximalRand = 0

// audio
const terKlik = new Audio('../assets/sound/kena.mp3')
const selsaiMs = new Audio('../assets/sound/selesai.wav')
const munculMs = new Audio('../assets/sound/boink.mp3')

// bgMusic.play()
// console.log (lubang2, score, tikus)

// membuat waktu random untuk lama si tikus muncul
// satuan milisecond
function randWaktu (min, max) {
    const result = Math.round(Math.random() * (max - min) + min)
    return result
}

function playAudio (url, loop=false) {
    let audio = new Audio(url)
    audio.play()
}

// memilih lubang secara random
function randLubang (arr) {
    // console.log (arr.length)
    const i = Math.floor(Math.random() * arr.length)
    const lubang = arr[i]

    // jika anka random masih sama maka ulangi function agar tidak muncul di tempat yang sama
    if (lubang == lubangTerakhir) {
        return randLubang(arr)
    }

    // console.log (lubang)
    lubangTerakhir = lubang
    return lubang
}

// agar keluar si tikusnya
function popup () {
    let lubang = randLubang(lubang2)
    lubang.classList.add('up')
    munculMs.currentTime = 0
    munculMs.play()
    
    // mengulangi sampai time
    let time = randWaktu(minimalRand, maximalRand)
    setTimeout(function () {
        lubang.classList.remove('up')
        if (!waktuSelesai) popup()
    }, time)
}

function mulaiGame (min, max) {
    if (onGoing) return
    popup()
    score.textContent = 0
    endscore = 0
    waktuSelesai = false
    minimalRand = min
    maximalRand = max
    onGoing = true      // agar tidak start game doble-doble

    // berhenti
    setTimeout(function () {
        onGoing = false
        waktuSelesai = true
        selsaiMs.play()
        if (hightScore < endscore) hightScore = endscore
        hscore.textContent = hightScore
    }, 10000)
}

function kena (e) {
    console.log (e.target)
    if (e.isTrusted == false) return; // only trusted input
    else endscore++
    // console.log ('ahahah kena')
    terKlik.play()
    e.target.classList.add('scaleUp')

    setTimeout ( function () {
        e.target.classList.remove('scaleUp')
    }, 200)

    // langsung turun ketika ke kena
    this.classList.remove('up')

    // console.log (this)
    score.textContent = endscore
}

Array.from(tikus).forEach( function (e) {
    e.addEventListener('click', kena)
    // console.log (e.style)
})

// let objek = document.querySelectorAll('.obj')

// Array.from(objek).forEach(e => {
//     e.addEventListener('click', function () {
//         let newObj = e['dataset']['obj']
//         Array.from(tikus).forEach( function (e) {
//             e.removeAttribute('class')
//             e.classList.add(`${newObj}`)
//             console.log (e.classList)
//         })
//     })
// })