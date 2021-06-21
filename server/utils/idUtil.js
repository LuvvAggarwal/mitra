module.exports = {
    createId: (name) => {
        const newName = name.replace(/ /g,"_")
        return newName + '_' + Math.random().toString(36).substr(2, 9);
    }
}