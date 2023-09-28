const usdata = JSON.parse(localStorage.getItem("userdata"))
console.log(usdata[0].name)
const inform = document.querySelector('.nPost_create')
const sign_in= (signIn) => {
    const input = document.querySelector('.postName')
    const input1 = document.querySelector('.postText')
    axios.post('http://localhost:3000/newPost',{
        "name": usdata[0].name,
        "password": usdata[0].password,
        "postName": input.value,
        "postText": input1.value
    }).then(res=>{
        if(res.data !== "error"){
            const body = document.querySelector('.nPostBl')
            body.innerHTML += '<div>Created</div>'
        }
        else {
            const body = document.querySelector(".nPostBl")
            body.innerHTML = "<div>Error</div>"
        }
    })
}
inform.addEventListener('submit', sign_in)