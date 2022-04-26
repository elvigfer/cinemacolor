let db = new PouchDB('guardados');
let caja = document.getElementById("biblioteca")

renderUsers();

function renderUsers(){
    
    //Retrieving all the documents in PouchDB
    db.allDocs({include_docs: true}, function(err, docs) {
        if (err) {
            return console.log(err);
        } else {                
            colors = docs.rows;
        
            colors.forEach(element => {
                let color = `
                            <article>
                                <h2>${element.doc.title}</h2>
                                <div class= "grupo">
                                ${element.doc.hex}
                                ${element.doc.codes}</div>
                                <button class= "borrar">-</button>
                            </article>`;
                caja.innerHTML += color;
                let btnBorrar = document.getElementsByClassName("borrar");
                //El borrado solo funciona después de refrescar la base de datos y la página.
                function borrar(){
                    db.get(element.doc._id).then(function (doc) {
                        return db.remove(doc);
                      });
                }
                for (var i = 0; i < btnBorrar.length; i++) {
                    btnBorrar[i].addEventListener('click', borrar, false);
                }
                $(".grupo").click(function(){
                    if( $(this).find("ul").css('visibility') == 'hidden'){
                    $(this).find("ul").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 1000);}
                    else{$(this).find("ul").animate({opacity: 0}, 1000).css({visibility: "hidden"});}
                })
                
            });
            
        }
    });
    }

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