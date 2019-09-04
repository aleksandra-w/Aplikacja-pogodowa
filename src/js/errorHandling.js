// sprawdzanie połączenia z internetem
export function checkStatus() {
    if(!navigator.onLine) {
        const node = document.createElement("div");
        const textnode = document.createTextNode("brak dostępu do sieci"); 
        node.classList.add("no-connection") 
        node.appendChild(textnode);                        
        const main = document.querySelector(".main");
        const child = document.querySelector(".main__box1");
        main.insertBefore(node, child); 
    }
}
window.addEventListener("online", function() {
    checkStatus();
})
window.addEventListener("offline", function() {
    checkStatus();
})

//sprawdzanie kolejnego problemu