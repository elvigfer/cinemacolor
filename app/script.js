
    
    //Obtener una película aleatoria al día de la api
    const peliculas = ["tt4925292", "tt0377092", "tt0107688", "tt1748122", "tt0335266", "tt0159097", "tt0468569", "tt5726616", "tt11271038", "tt0422720", "tt12618926", "tt0947798", "tt1798709", "tt0266697", "tt0467406", "tt0449059", "tt1605783", "tt0497465", "tt0441909", "tt0211915", "tt8772262", "tt1014759", "tt0121164", "tt2953050", "tt0795421", "tt0137523", "tt0096283", "tt3890160", "tt0117008", "tt1099212", "tt0332280", "tt5592248", ""];
    //let pelicula = peliculas[Math.floor(Math.random()*peliculas.length)];
   let fecha = new Date();
   let indice = (fecha.getFullYear() * fecha.getDate() * (fecha.getMonth() + 1)) % peliculas.length;
   
   console.log(indice);
    let pelicula = peliculas[indice];
console.log(pelicula);
fetch(`https://imdb-api.com/en/API/Title/k_2s605stf/${pelicula}`)
    .then(response => response.json())
    .then(data => {
      let imagen = document.getElementById("poster");
      let poster = data.image;
      let h1 = document.getElementById("titulo");
      let titulo = data.title;
      imagen.src = poster;
    //imagen.src = "https://picsum.photos/seed/picsum/200/300";
      imagen.alt = titulo;
      h1.innerHTML = titulo;
      //Obtener la paleta de colores
      let url = `https://api.imagga.com/v2/colors?image_url=${poster}`;
      let credentials = "acc_30997a2eab12466:0777d8441f5f5a2d03d748d3a4cffeeb";
      return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        agent: null,
        headers: {
            "Content-Type": "text/plain",
            'Authorization': 'Basic ' + btoa(credentials),
        },
        timeout: 5000
      })
      .then(res => res.json())
    .then(res => {
        console.log(res);

        let caja = document.querySelector("#paleta");
        let info = document.querySelector("#datoscolor")
        let colors = res.result.colors.image_colors;
        //let colors = res.result.colors.background_colors;
        //let colors = res.result.colors.foreground_colors;

        let content = `<div class="container">`;
        let datos = `<ul class= "codigos">`;
        colors.forEach(color => {
            content+=`<div class="color" style="background-color: ${color.html_code}"></div>`
            datos+= `<li> <h4>${color.closest_palette_color}</h4><p>HEX: ${color.html_code}</p><p>RGB: ${color.r}, ${color.g}, ${color.b}</p></li>`
        });

        caja.innerHTML=`${content}</div>`;
        info.innerHTML= `${datos}</ul>`
    })
    
});
    //Crear base de datos y guardar
    let db = new PouchDB('guardados');
    let btn = document.getElementById("guardar");
     function guardar(){
         
        db.put({
            //_id: pelicula,
            _id: String(Math.floor(Math.random()*100)),
            title: document.getElementById("titulo").innerHTML,
            codes: document.getElementById("datoscolor").innerHTML,
            hex: document.getElementById("paleta").innerHTML
        })
        }
    btn.addEventListener("click", guardar); 
    
    const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburguesa");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}
hamburger.addEventListener("click", toggleMenu);
menuItems.forEach( 
    function(menuItem) { 
      menuItem.addEventListener("click", toggleMenu);
    }
  )

