const container = document.getElementById('graph-dates-container');

let lastYear = 2004;
let lastYearPosition = 0;
const space = 100; 

let icon = "<img src='../img/icons/circle.svg' alt='Circle' class='icon'/>";

function checkScroll() {
    let scrollRight = container.scrollLeft + container.clientWidth;

    while (lastYearPosition * space < scrollRight) {
        const posX = lastYearPosition * space;
        displayYear(lastYear, posX);
        lastYear++;
        lastYearPosition++;
    }
}

function displayYear(year, posX) {
    const span = document.createElement('span');
    span.textContent = year;
    span.style.position = 'absolute';
    span.style.left = posX + 'px';
    container.appendChild(span);
}

container.addEventListener('scroll', checkScroll);
checkScroll();
