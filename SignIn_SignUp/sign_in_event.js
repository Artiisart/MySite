const inform = document.querySelector('.plc')
const sign_in= (signIn) => {
    const input = document.querySelector('.Name')
    const input1 = document.querySelector('.passw')
    axios.post('http://localhost:3000/signIn',{
        "name": input.value,
        "password": input1.value
    }).then(res=>{
        if(res.data !== "error"){
            localStorage.setItem("userdata", JSON.stringify([{"name":input.value, "password": input1.value}]))/*
            console.log(localStorage.getItem('userdata'))*/
            const body = document.querySelector('body')
            body.innerHTML = '<div>Found</div>'
            window.location.href = 'Profile_HTML.html'
        }
        else {
            const body = document.querySelector(".inpErr")
            body.innerHTML = "<div>Check name/mail</div>"
        }
    })
}
inform.addEventListener('submit', sign_in)