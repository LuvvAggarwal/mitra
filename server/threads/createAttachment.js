const { workerData, parentPort, isMainThread } = require("worker_threads");
const { createMany } = require("../controllers/BaseController");

// if (!isMainThread) {
//     try {
//         parentPort.on("message", async (data) => {
//             const parsed = JSON.parse(data);
//             const records = createAttachmentRecord(parsed.post, parsed.req);
//             const message = {
//                 msg: `${records.length} records are created.`,
//                 records: records
//             }
//             parentPort.postMessage(message);
//             console.log(`${records.length} records are created.`);
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }

const createAttachmentRecord = async (post, attachments) => {
    const data = [];
    attachments.forEach(e => {
        let url = e.path;
        let id = e.filename.split("_")[0]
        let mime_type = e.mimetype;
        let record = {
            post: post,
            mime_type: mime_type,
            url: url,
            id: id
        }
        data.push(record)
    });
    return createMany(attachments, "atachment_post_map", data);
}

module.exports = {createAttachmentRecord}