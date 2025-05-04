const btn = document.getElementById("modeBtn");
btn.addEventListener("click", ()=>{
    const link = document.getElementById("mode");
    const cur = link.getAttribute("href");
    if(cur.includes("style/lightmode.css")){
        link.setAttribute("href", "style/darkmode.css");
        btn.textContent = "Toggle lightmode";
    } else {
        link.setAttribute("href", "style/lightmode.css");
        btn.textContent = "Toggle darkmode";
    }
});