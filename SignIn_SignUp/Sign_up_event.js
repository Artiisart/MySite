
console.log("wow")/*
console.log(localStorage.getItem("myKey"))*/
/*let button = document.getElementsByClassName("btn")*/
/*import axios from "axios";*/

const form = document.querySelector('.plc')

const submitEvent = (event) => {
    event.preventDefault()

    const input = document.querySelector('.Name')
    console.log(input.value)
    const input1 = document.querySelector('.block2')
    console.log(input1.value)
    const input2 = document.querySelector('.block3')
    console.log(input2.value)
    const body = document.querySelector('.crea')
    axios.post('http://localhost:3000/signUp', {
        "name": input.value,
        'mail': input1.value,
        "password": input2.value
    }).then(res => {/*
        res.setHeader('Access Control-Allow-Origin', '*')*/
        const created = 'created'
        console.log(res.data)
        const texti = '<div class="createdEv">' + created + '</div>'
        body.innerHTML = texti + " " + res.data
        /*localStorage.setItem("myKey", JSON.stringify(res.data))*/
        window.location.href = 'sign_inghtml.html'
    })

    /*const created = 'created'
    const texti = '<div class="createdEv">' + created + '</div>'
    body.innerHTML = texti*/
}
form.addEventListener('submit', submitEvent)

/*  const result = document.createElement('div')
    result.innerText = "It created"
    document.body.append(result)
    result.className = "createdEv"*/