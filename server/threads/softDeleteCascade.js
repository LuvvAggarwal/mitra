const { workerData, parentPort, isMainThread } = require("worker_threads");
const { updateMany } = require("../controllers/BaseController");

// if (!isMainThread) {
//     try {
//         parentPort.on("message", async (data) => {
//             const parsed = JSON.parse(data);
//             const records = deleteChilds(parsed.parent,parsed.children);
//             const message = {
//                 data : records
//             }
//             parentPort.postMessage(message);
//             console.log(message);
//             console.log(`${records.length} records are created.`);
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }

const deleteChildren = async (parent, children) => {
    const deleted = [];
    children.forEach(e => {
       const model = e.model ;
       const data = e.data ;
       const softDelete = updateMany({},model,data);
       const obj = {} ;
       obj[model] = `${softDelete.length} records updated.`
       deleted.push(obj)
    });
    return deleted
    
}

module.exports = {deleteChildren}