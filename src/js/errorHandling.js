// sprawdzanie połączenia z internetem
const main = document.querySelector(".main");
window.addEventListener("online", function() {
    const node = main.firstElementChild
    main.removeChild(node);
})
window.addEventListener("offline", function() {
    const node = document.createElement("div");
    const textnode = document.createTextNode("brak dostępu do sieci");
    const child = document.querySelector(".main__box1"); 
    node.classList.add("no-connection") 
    node.appendChild(textnode);                        
    main.insertBefore(node, child); 
})

//sprawdzanie kolejnego problemu