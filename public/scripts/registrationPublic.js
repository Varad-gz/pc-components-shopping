function passwordRetype(){
    let paswdval = document.getElementById('password');
    let retype = document.getElementById('rpassword');

    document.getElementById('nextpart').innerHTML = '';
    if(document.getElementById('retypeState')){
        document.getElementById('retypeState').remove();
    }

    if(retype.value != ''){
        let newDiv = document.createElement('div');
        newDiv.className = "ml-[10px] mt-[10px]";
        newDiv.setAttribute('id', "retypeState");
        if(paswdval.value === retype.value){
            newDiv.innerHTML = '<span style="color:green;">Passwords match</span>'
            document.getElementById('retype').appendChild(newDiv);
            document.getElementById('nextpart').innerHTML = '<div class="w-full text-center"><button class="bg-red-700 hover:bg-red-800 w-[50%] h-[35px]" onclick="showDetailMenu()" type="button">Continue</button></div>'
        } else {
            newDiv.innerHTML = '<span style="color:red;">Passwords do not match</span>'
            document.getElementById('retype').appendChild(newDiv);
        }
    }


}

function showDetailMenu(){
    if(checkIfFilled() === false){
        return false;
    }
    let htmltext = `<div class="pt-[10px] border-t-[1px] border-[#2d2a2a]">
    <div class="text-[20px] w-full text-center">Details</div>
    <div class="w-full flex flex-row my-[10px]">
        <input type="text" id="ph1" placeholder="Phone 1" name="ph1" class="w-full mr-[10px] h-[40px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none pl-[10px] placeholder:text-[#aeacac]" required>
        <input type="text" id="ph2" placeholder="Phone 2" name="ph2" class="w-full h-[40px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none pl-[10px] placeholder:text-[#aeacac]">
    </div>
    <textarea id="adl1" name="add1" placeholder="Address Line 1" class="w-full my-[10px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none p-[10px] placeholder:text-[#aeacac] resize-none h-[80px]" required maxlength="150"></textarea>
    <textarea id="adl2" name="add2" placeholder="Address Line 2" class="w-full my-[10px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none p-[10px] placeholder:text-[#aeacac] resize-none h-[80px]" maxlength="150"></textarea>
    <div class="w-full flex flex-row my-[10px]">
        <input type="text" id="state" placeholder="State" name="state" class="w-full mr-[10px] h-[40px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none pl-[10px] placeholder:text-[#aeacac]" required>
        <input type="text" id="city" placeholder="City" name="city" class="w-full mr-[10px] h-[40px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none pl-[10px] placeholder:text-[#aeacac]" required>
        <input type="text" id="zip" placeholder="Zip Code" name="zip" class="w-full h-[40px] bg-[#312f2f] focus:bg-[#424040] focus:outline-none pl-[10px] placeholder:text-[#aeacac]" required>
    </div>
    <div class="flex w-full mt-[20px] justify-center">
        <button type="button" onclick="clearAll()" class="bg-red-700 hover:bg-red-800 w-full h-[35px] mr-[20px]">Clear</button>
        <button type="submit" class="bg-red-700 hover:bg-red-800 w-full h-[35px]">Submit</button>
    </div>
    </div>`;

    document.getElementById('nextpart').innerHTML = htmltext;
}

function disableElements(elements) {
    elements.forEach(id => {
        let element = document.getElementById(id);
        element.style.pointerEvents = 'none';
        element.style.backgroundColor = '#4e4b4b';
    });
}

function enableElements(elements) {
    elements.forEach(id => {
        let element = document.getElementById(id);
        element.style.pointerEvents = 'auto';
        element.style.backgroundColor = '#312f2f';
    });
}


function clearAll(){
    document.getElementById('nextpart').innerHTML = '';
    if(document.getElementById('orgName')){
        enableElements(['orgName', 'password', 'rpassword', 'email']);
    } else {
        enableElements(['fname', 'lname', 'password', 'rpassword', 'email']);
    }
    document.getElementById('form').reset();
    document.getElementById('retypeState').remove();
}

function checkIfFilled(){
    if(document.getElementById('email').value === ''){
        return false;
    }
    if(document.getElementById('orgName')){
        if(document.getElementById('orgName').value === ''){
            return false;
        }
        disableElements(['orgName', 'password', 'rpassword', 'email']);
    } else {
        if(document.getElementById('fname').value === '' || document.getElementById('lname').value === ''){
            return false;
        }
        disableElements(['fname', 'lname', 'password', 'rpassword', 'email']);
    }
    return true;
}