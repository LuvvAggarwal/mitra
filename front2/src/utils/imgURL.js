const img_url = (url) => {
    console.log(url);
    if (url.indexOf("blob") <= -1 && url.indexOf("https") <= -1) {
        const uArr = url.split("files\\");
        console.log(uArr);
        url = uArr[1];
        return "/files/" + url
    }
    else
        return url
}

module.exports = img_url