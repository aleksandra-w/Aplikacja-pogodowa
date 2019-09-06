// sprawdzanie połączenia z internetem
const main = document.querySelector(".main");
const ifOffline = () => {
    if(!navigator.onLine) {
        const node = document.createElement("div");
        const textnode = document.createTextNode("brak dostępu do sieci");
        const child = document.querySelector(".main__box1"); 
        node.classList.add("no-connection") 
        node.appendChild(textnode);                        
        main.insertBefore(node, child); 
    }
}     
ifOffline(); //wywołuję tą funkcję tylko raz na początku aby sprawdzić czy jest offline aby dodać powiadomienie. W mojej przeglądarce listener nie obsługiwał tego na początku.
const ifonline = (() => {
    window.addEventListener("online",() => {
        const node = main.firstElementChild
        main.removeChild(node);
    })
    window.addEventListener("offline",() => {
        const node = document.createElement("div");
        const textnode = document.createTextNode("brak dostępu do sieci");
        const child = document.querySelector(".main__box1"); 
        node.classList.add("no-connection") 
        node.appendChild(textnode);                        
        main.insertBefore(node, child); 
    })
})();   
//sprawdzanie kolejnego problemu