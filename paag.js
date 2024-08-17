
const shadow = "@&%QWNM0gB$#DR8mHXKAUbGOpV4d9h6PkqwSE2]ayjxY5Zoen[ult13If}C{iF|(7J)vTLs?z/*cr!+<>;=^,_:'-.` "




async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const input = document.querySelector('input');
const range = document.getElementsByClassName('slider')[0];
const lightdetect = document.getElementsByClassName('slider')[1];



input.addEventListener('change',async function draw() {
    const asciiArt = document.getElementById("ascii_art");
    // const sh = (101-range.value)*5
    // const sw = (101-range.value)*3
    const sh = 5
    const sw = 3
    const light = lightdetect.value
    const avg = lightdetect.value/shadow.length;
    asciiArt.innerText = ""
    const base64 = await toBase64(input.files[0]);
    const src = base64;

    var img = new Image();
    img.onload = function () {
        var canvas = document.querySelector("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        if(canvas.width>300)
        {
            canvas.height = (300/canvas.width)*canvas.height;
            canvas.width = 300;
        }
        if(canvas.height>300)
        {
                canvas.width = (300/canvas.height)*canvas.width;
                canvas.height = 300;
        }

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'luminosity';
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
        // asciiArt.style.width = canvas.width+' px';
        for(let y=0;y<canvas.height;y+=sh)
        {
            // asciiArt.innerHTML += "<pre>";
            for(let x=0;x<canvas.width;x+=sw)
            {
                var data = ctx.getImageData(x, y, sw, sh).data; 
                var color=0;
                for(let i=0;i<sh*sw;i++)
                {
                    color += data[i*4];
                }
                color = color/(sh*sw)|0;
                if(color<=light)
                {
                    asciiArt.innerText += shadow.charAt(color/avg|0);
                }
                else
                {
                    asciiArt.innerText += ' ';
                }
            }
            asciiArt.innerText += '\n'
            // asciiArt.innerHTML += '</pre.<br/>';
        }

    }
    img.src = src;
});
// lightdetect.addEventListener('change',()=>{input.value=input.value});

// range.addEventListener("change",()=>{input.value=input.value})
