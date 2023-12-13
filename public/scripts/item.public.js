document.addEventListener('DOMContentLoaded', () => {
    let quantity = document.getElementById('quantity');
    document.getElementById('quantminus').addEventListener('click', () => {
        if(parseInt(quantity.value) > 1) {
            quantity.value = parseInt(quantity.value) - 1
        }
    })
    document.getElementById('quantadd').addEventListener('click', () => {
        if(parseInt(quantity.value) < parseInt(document.getElementById('stock').value)) {
            quantity.value = parseInt(quantity.value) + 1
        }
    })
})