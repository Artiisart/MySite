axios.post('http://localhost:3000/allPosts', {
}).then(res => {
    if (res.data !== "error") {

        const body = document.querySelector('.post')
        for(let i = res.data.length - 1; i >= 0;i--){
            body.innerHTML += '<div class="aPost">\n' +
                '        <div class="akPost">\n' +
                '            <img src="image%204.png" class="mAva" alt="image">\n' +
                '            ' + res.data[i].username +
                '        </div>\n' +
                '        <div style="margin: 5px 20px">\n' +
                '            ' + res.data[i].postName +
                '        </div>\n' +
                '        <div style="margin: 5px 20px">\n' +
                '            ' + res.data[i].postText +
                '        </div>\n' +
                '        <div class="postPic">\n' +
                '            <img src="image%204.png" style="height: 90%;width: 20%" alt="image">\n' +
                '        </div>\n' +
                '    </div>'
        }
    }
    else {
    }
})