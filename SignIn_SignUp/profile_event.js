const usdata = JSON.parse(localStorage.getItem("userdata"))
console.log(usdata[0].name)
if(usdata.name !== 'null') {
    axios.post('http://localhost:3000/signIn', {
        "name": usdata[0].name,
        "password": usdata[0].password
    }).then(res => {
        if (res.data !== "error") {
            const body = document.querySelector('.imge')
            body.src = 'http://localhost:3000/us_ava'
            /*const usname = document.querySelector('.usname')
            const uspass = document.querySelector('.uspass')
            usname.value = usdata[0].name
            usname.value = usdata[0].password*/
            /*
            body.innerHTML = '<div>Found</div>'*/

        } else {/*
            const body = document.querySelector(".inpErr")
            body.innerHTML = "<div>Check name/mail</div>"*/
            window.location.href = 'sign_inghtml.html'
        }
    })
}
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData(formElem)/*
    formdata.alt = usdata[0].name + "|" + usdata[0].password*/ //an idea for my project
    formdata.append("name", usdata[0].name)
    formdata.append("password", usdata[0].password)
    let response = await fetch('http://localhost:3000/newUsAva', {
        method: 'POST',
        body: new FormData(formElem)/*new FormData(formElem)*/,
    });

    const result = await response/*.json()*/;

    alert(result.data);
}

