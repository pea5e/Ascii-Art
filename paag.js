


async function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

document.getElementsByTagName("pre")[0].innerText = `
           %                                                        2t                   (         
           Uk                                                       {%                    Q         
           Qi                                                       ug                    @         
          L@D                                                       0@=                   @         
          DL0'                               74    fd              7b19                   @         
         /m [E        zRItX|      <Pw=      __    z                B_ %      .            @?        
         #<  %       vm          }U  b}     .S    L1              (G  hC     O(-6dXl    [x%jv       
        TA   AxT     M          ;$          <D    3w              0.  r$v    9&o   (R_    $'        
        gaIhG9Q     Kv          $=          <D    3w             fB7ybP0[    9}           R<        
       QK/    g'    @   'lUBb  ;#           <D    3w            d@3'   }9    q3           Kc        
       N      1k    iOO27  Dr  x5           <D    3w            5]      %    wt           K/        
      oE       %          Xi   E1      >B   <D    3w            Q       wl   oo           4| (*     
      Q        9}   >4r!nm_     B/    ]p    <D    3w           we       -0   3E           :gam      
      -        >#     _;         vy9SI       :                 _         #>                         
                X                                                        ie                    `
const input = document.querySelector('input');
const range = document.getElementsByClassName('slider')[0];
const lightdetect = document.getElementsByClassName('slider')[1];

input.addEventListener('click',()=>{
    input.value = ""
})

input.addEventListener('change',async function draw() {
    const shadow = document.getElementById("ascii").value;
    const asciiArt = document.getElementById("ascii_art");
    const sh = (6-range.value)*5
    const sw = (6-range.value)*4
    // const sh = 5
    // const sw = 3
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
