
const shadow = " `.-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@"




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
            canvas.width = 300;
            canvas.height = (300/img.width)*img.height;
        }
        if(canvas.height>300)
        {
                canvas.height = 300;
                canvas.width = (300/img.height)*img.width;
        }

        var ctx = canvas.getContext("2d");
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'luminosity';
        ctx.drawImage(img, 0, 0);
        for(let y=0;y<img.height;y+=sh)
        {
            for(let x=0;x<img.width;x+=sw)
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
            asciiArt.innerText += '\n';
        }

    }
    img.src = src;
});
// lightdetect.addEventListener('change',()=>{input.value=input.value});

// range.addEventListener("change",()=>{input.value=input.value})
