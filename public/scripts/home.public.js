let isMouseDown = false;
function hold(category, direc) {
    isMouseDown = true;
    if(direc === 'leftbtn') {
        scrollLeft(category);
    } else if(direc === 'rightbtn') {
        scrollRight(category);
    }
}
function scrollLeft(category) {
    if(isMouseDown === true) {
        document.getElementById('prodsrow').querySelector(`#${category}`).scrollLeft -= 10;
        requestAnimationFrame(() => scrollLeft(category));
    }
}
function scrollRight(category) {
    console.log('e');
    if(isMouseDown === true) {
        document.getElementById('prodsrow').querySelector(`#${category}`).scrollLeft += 10;
        requestAnimationFrame(() => scrollRight(category));
    }
}
function notHolding() {
    isMouseDown = false;
}
function styleProdText(productDiv) {
   // document.getElementById(productDiv).querySelector('#prodImg').style.boxShadow = '5px 5px black';
    document.getElementById(productDiv).querySelector('#prodName').classList.add('text-red-600');
}
function removeProdTextStyle(productDiv) {
    document.getElementById(productDiv).querySelector('#prodName').classList.remove('text-red-600');
}