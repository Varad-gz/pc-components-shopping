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
            document.getElementById('nextpart').innerHTML = '<button class="style1button w-[100px] h-[40px]" onclick="showDetailMenu()" type="button">Continue</button>'
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
    let htmltext = `<div class="pt-[10px] border-t-[1px] border-gray-200">
    <div class="text-[20px]">Details</div>
    <div class="w-full flex flex-row my-[20px]">
        <div class="bordergradient w-full h-[43px] overflow-hidden">
            <input type="text" id="ph1" placeholder="Phone 1" name="ph1" class="formfield h-[40px]" required>
        </div>
        <div class="bordergradient w-full h-[43px] overflow-hidden ml-[10px]">
            <input type="text" id="ph2" placeholder="Phone 2" name="ph2" class="formfield h-[40px]">
        </div>
    </div>
    <div class="bordergradient w-full h-[83px] overflow-hidden my-[20px]">
        <textarea id="adl1" name="add1" placeholder="Address Line 1" class="formfield resize-none h-[80px]" required maxlength="150"></textarea>
    </div> 
    <div class="bordergradient w-full h-[83px] overflow-hidden my-[20px]">
        <textarea id="adl2" name="add2" placeholder="Address Line 2" class="formfield resize-none h-[80px]" maxlength="150"></textarea>
    </div> 
    <div class="w-full flex flex-row my-[20px]">
        <div class="bordergradient w-full h-[43px] overflow-hidden">
            <input type="text" id="state" placeholder="State" name="state" class="formfield h-[40px]" required>
        </div>
        <div class="bordergradient w-full h-[43px] overflow-hidden ml-[10px]">
            <input type="text" id="city" placeholder="City" name="city" class="formfield h-[40px]" required>
        </div>
        <div class="bordergradient w-full h-[43px] overflow-hidden ml-[10px]">
            <input type="text" id="zip" placeholder="Zip Code" name="zip" class="formfield h-[40px]" required>
        </div>
    </div>
    <div class="flex w-full mt-[20px] justify-center">
        <button type="button" onclick="clearAll()" class="style1button w-[100px] h-[40px] mr-[20px]">Clear</button>
        <button type="submit" class="style1button w-[100px] h-[40px]">Submit</button>
    </div>
    </div>`;

    document.getElementById('nextpart').innerHTML = htmltext;
}

function disableElements(elements) {
    elements.forEach(id => {
        let element = document.getElementById(id);
        element.style.pointerEvents = 'none';
        element.style.backgroundColor = '#DCE6F0';
    });
}

function enableElements(elements) {
    elements.forEach(id => {
        let element = document.getElementById(id);
        element.style.pointerEvents = 'auto';
        element.style.backgroundColor = '#F1F5F9';
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