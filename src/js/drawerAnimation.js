const closeBtn = document.getElementsByClassName("closebtn")[0];
const openBtn = document.getElementsByClassName("openbtn")[0]
const drawer = document.getElementsByClassName("leftAsideBox")[0]
const phoneBreakpoint = 870;
const drawerVisible = '0';;
const drawerNotVisible = '-325px';

window.addEventListener('resize', function () {
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	if (viewportWidth > phoneBreakpoint) {
		drawer.style.marginLeft = drawerVisible;
    } else {
        drawer.style.marginLeft = drawerNotVisible;
    }
}, false);

closeBtn.addEventListener("click", () => {
    drawer.style.marginLeft = drawerNotVisible;         
})

openBtn.addEventListener("click", () => {
    drawer.style.marginLeft = drawerVisible;    
})
