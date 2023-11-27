const path = require('path');
const fs = require('fs');
const dateObj = new Date();

//get datetime in mysql format
const getDatetime = () => {
    const day = ('0' + dateObj.getDate()).slice(-2)
    const month = ('0' + dateObj.getMonth()).slice(-2)
    const year = dateObj.getFullYear() 
    const hours = dateObj.getHours() 
    const minutes = dateObj.getMinutes() 
    const seconds = dateObj.getSeconds() 
    const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return date
}

// copy image to the products folder
const copyImage = (image) => {
    const imageS = path.join('c:/Users/varad/Downloads/', image);
    const imageD = path.join('public/images/products/', image);
    fs.copyFile(imageS, imageD, (err) => {if(err) throw err})
    return path.join('/images/products/', image);
}

module.exports = {
    getDatetime,
    copyImage
}