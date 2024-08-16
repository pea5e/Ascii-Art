
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

input.addEventListener('change',async () => {
    

    const base64 = await toBase64(input.files[0]);
    const src = base64;

    var img = new Image();
    img.onload = function () {
        var canvas = document.querySelector("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        // ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'luminosity';
        ctx.drawImage(img, 0, 0);
        console.log(ctx.getImageData(100, 100, 1, 1).data);
        console.log(ctx.getImageData(120, 120, 1, 1).data);

    }
    img.src = src;
});


range.addEventListener("change",()=>{
    var p = document.querySelector("p");
    p.innerHTML = "size of ASCII Art is "+range.value+'%';
})
