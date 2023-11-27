const API = 'http://localhost:3000/api/proxy';

function getThisSub(x, id) { //id is depth, x is category_id
    checkAndRemoveChild(id); //checks if child subcategories are present and removes them
    if(document.getElementById('addproduct')){document.getElementById('addproduct').remove()}
    document.getElementById(`${id}change`).setAttribute('value', x); //sets button values to category id on change
    document.getElementById(`${id}delete`).href = `/api/proxy/catman/del?category_id=${x}`; 
    if(x === 'new') {
        addThisCategory(getParentCat(id), id)
    }
    const api = `${API}/catman?category_id=${x}`;
    fetch(api, {
        method : 'GET',
        credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
        let newSpan = document.createElement('span');
        if(data.id === 'subcategories') {
            newSpan.setAttribute('id', `thisis${data.depth}`);
            newSpan.innerHTML = data.htmlBody;
            document.getElementById(data.id).appendChild(newSpan);
        } else if(data.id === 'cat') {
            if(id < 6) {
                newSpan.setAttribute('id', 'addproduct');
                newSpan.innerHTML = createAddSpan(x, parseInt(id));
                document.getElementById(data.id).appendChild(newSpan);
            }
        }
    })
    .catch(err => {throw err});
}


function createNewSubOption(data) {
    let newSpan = document.createElement('span');
    newSpan.setAttribute('id', `thisis${data[0].category_depth}`);
    newSpan.innerHTML = newSelect;

    return newSpan;
}

function checkAndRemoveChild(id) {
    let childId = parseInt(id) + 1;
    let childOfThis = document.getElementById(`thisis${childId}`);
    if(childOfThis) {
        checkAndRemoveChild(`${childId}`);
        childOfThis.remove();
    }
}

function hasChild(id){
    let childId = parseInt(id) + 1;
    let childOfThis = document.getElementById(`thisis${childId}`);
    if(childOfThis) {
        return true;
    }
    return false;
}

/*function deleteThisCategory(category_id) {
    const api = `${API}/catman/delete`;
    console.log(api)
    fetch(api, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category_id: category_id
        }),
        credentials: 'include'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch(err => console.log(err));
}*/

function editThisCategory(category_id) {
    if(category_id === "") {
        return false;
    }
    const url = `${API}/catman/change?category_id=${category_id}`;
    fetch(url, {
        method : 'GET',
        credentials: "include"
    })
    .then(res => res.text())
    .then(data => {
        let newSpan = document.createElement('span');
        newSpan.setAttribute('style', "position: fixed; top: 0px; left: 0px; bottom: 0px; right: 0px; display: flex; justify-content: center; height: 100vh;")
        document.body.style.overflow = "hidden";
        newSpan.innerHTML = data;
        document.body.appendChild(newSpan);
    })
    .catch(err => console.log(err));
}

function addThisCategory(parentCatId) {
    const api = `${API}/catman/add?category_id=${parentCatId}`;
    fetch(api, {
        method : 'GET',
        credentials: "include"
    })
    .then(res => res.text())
    .then(data => {
        let newSpan = document.createElement('span');
        newSpan.setAttribute('style', "position: fixed; top: 0px; left: 0px; bottom: 0px; right: 0px; display: flex; justify-content: center; height: 100vh;")
        document.body.style.overflow = "hidden";
        newSpan.innerHTML = data;
        document.body.appendChild(newSpan);
    })
    .catch(err => console.log(err));
}

function getParentCat(depth) {
    if(depth != 0) {
        return document.getElementById(depth-1).value;
    } else {
        return 0;
    }
}

function createAddSpan(id, depth){
    return `
        <div class="border-t-[1px] border-gray-300 mt-[10px] pt-[10px]">
            <form action="/api/proxy/catman/add" method="post">
                <div class="flex justify-center text-[20px]">Add Category</div>
                <div class="flex justify-center flex-col">
                    <input type="hidden" name="depth" value="${(depth+1)}">
                    <input type="hidden" name="ref" value="${id}">
                    <div class="w-full flex flex-row mt-[20px]">
                        <div class="w-full">
                            <label for="catname">Category Name</label>
                            <div class="bordergradient h-[45px] my-[5px]">
                                <input type="text" id="catname" name="catName" placeholder="Enter the Category Name..." class="formfield h-[40px]" required>
                            </div>
                        </div>
                        <div class="w-full ml-[20px]">
                            <label for="altname">Alternative Name</label>
                            <div class="bordergradient h-[45px] my-[5px]">
                                <input type="text" id="altname" name="altName" placeholder="Enter the Alternative Category Name..." class="formfield h-[40px]" required>
                            </div>
                        </div>
                    </div>
                    <label for="catdesc" class="mt-[10px]">Product Description</label>
                    <div class="bordergradient w-full h-[105px] my-[5px]">
                        <textarea id="catdesc" name="catDesc" placeholder="Enter the Category Description..." class="formfield h-[100px] resize-none" required></textarea>
                    </div>
                    <div class="flex w-full h-[45px] my-[10px]">
                        <button id="btnstyle1" type="reset" class="style1button w-full h-[40px] mr-[20px]">Clear</button>
                        <button id="btnstyle1" type="submit" class="style1button w-full h-[40px]">Submit</button>
                    </div> 
                </div>
            </form>
        </div>
    `;
}