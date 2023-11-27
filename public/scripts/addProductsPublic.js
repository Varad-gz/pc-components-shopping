const API = 'http://localhost:3000/api/proxy'

function getThisSub(x, id) { //id is depth, x is category_id
    checkAndRemoveChild(id); //checks if child subcategories are present and removes them
    const api = `${API}/addprodgetcat?category_id=${x}`;
    fetch(api, {
        method : 'GET',
    })
    .then(res => res.json())
    .then(data => {
        let newSpan = document.createElement('span');
        if(data.id === 'subcategories') {
            newSpan.setAttribute('id', `thisis${data.depth}`);
            newSpan.innerHTML = data.htmlBody;
            document.getElementById(data.id).appendChild(newSpan);
        }
    })
    .catch(err => {throw err});
}

function checkAndRemoveChild(id) {
    let childId = parseInt(id) + 1;
    let childOfThis = document.getElementById(`thisis${childId}`);
    if(childOfThis) {
        checkAndRemoveChild(`${childId}`);
        childOfThis.remove();
    }
}

function resetSel() {
    checkAndRemoveChild(0);
}