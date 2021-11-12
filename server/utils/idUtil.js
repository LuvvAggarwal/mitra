module.exports = {
    createId: (name) => {
        const newName = name.indexOf(" ") > -1 ? name.replace(/ /g,"_") : name ;
        return newName + '_' + Math.random().toString(36).substr(2, 9);
    }
}