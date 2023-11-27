const API = 'http://localhost:3000/api/proxy'

// Validate category
function displaythisval(x) {
    if(x === "") {
        document.getElementById("sub").style.display = 'none';
    }
    const api = `http://localhost:3000/vendor-dashboard/add-products/${x}`;
    fetch(api, {method : 'GET'})
    .then(res => res.json())
    .then(data => {
        let valueDiv = document.getElementById("sub");
        valueDiv.innerHTML = createSelect(data);
        valueDiv.style.display = 'block';
    })
    .catch(err => console.log(err));
}
  
function createSelect(obj) {
    var s = "<select name=\"prodSub\" class=\"formfield h-[45px]\">\n<option value=\"\">Select a Subcategory</option>";
    const o = obj.map(element => {
      return `<option value="${element.sub_category_id}">${element.sub_alt_name}</option>\n`; 
    }).join('');
    s += o + "</select>";
    return s;
}

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