function disableLoader(){
    const loaderContainer = document.getElementById("loader");

    loaderContainer.classList.add("invisibility");
    setTimeout(() => {
        loaderContainer.style.display = "none";
    }, 500);
}
window.disableLoader = disableLoader;

function ableLoader(){
    const loaderContainer = document.getElementById("loader");

    loaderContainer.style.display = "";
    loaderContainer.classList.removeClass("invisibility");
}
window.ableLoader = ableLoader;
