document.addEventListener('DOMContentLoaded', () => {
    const quantity = document.getElementById('quantity');
    const submitButton = document.getElementById('submitbtn');
    const quantityMinusButton = document.getElementById('quantminus');
    const quantityAddButton = document.getElementById('quantadd');
    const totalStock = parseInt(document.getElementById('stock').value)

    disabledCheckStyle();

    quantityMinusButton.addEventListener('click', () => {
        if(parseInt(quantity.value) > 0) {
            const value = parseInt(quantity.value) - 1;
            quantity.value = value;
            if(value === 0){
                submitButton.disabled = true;
            }
        }
        disabledCheckStyle();
    });

    quantityAddButton.addEventListener('click', () => {
        if(parseInt(quantity.value) < totalStock) {
            quantity.value = parseInt(quantity.value) + 1;
            if(submitButton.disabled === true) {
                submitButton.disabled = false;
            }
        }
        disabledCheckStyle();
    });

    function disabledCheckStyle() {
        if(submitButton.disabled === true) submitButton.setAttribute('style', 'background-color: #671717;');
        else submitButton.removeAttribute('style');
    }

    document.getElementById('gobck').addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    })
})