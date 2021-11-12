const { v4 } = require("uuid");
// const { filename } = require("winston-daily-rotate-file");
const { create } = require("../controllers/BaseController");
const fm = require("./fileManager");
const RequestHandler = require("./RequestHandler");



module.exports = {
    // createAttachments : (attachments,post_id,req)=>{
    // attachments.forEach(e => {
    //     //VERIFY FUNCTION

    //     const extension = e.split('.').pop() ;
    //     const type = "" ;
    //     if(extension === "jpg" || "jpeg" || "png"){
    //         type = "IMAGE"
    //     }else if (extension === "mp4" || "mkv"){
    //         type = "VIDEO"
    //     }else if (extension === "pdf"){
    //         type = "PDF"
    //     }else if (extension === "xls" || "xlsx" || "csv"){
    //         type = "EXCEL"
    //     }else if(extension === ".docx"){
    //         type = "DOC"
    //     }else{
    //         RequestHandler.throwError(400,"Bad Request","Post is created, but attachments are not valid")({post_id,attachment : e}) ;
    //     }

    //     const id = v4();
    //     const path = `../${type}/${id}-${new Date().getTime()}.${extension}`
    //     fm.wrf(path,e,"File and attachment record created");
    //     return createAttachmentRecord(id,post_id,type,path,req) ;
    // });
    // },  

    createAttachmentRecord: (post, req) => {
        const payload = [];
        req.files.forEach(e => {
            const url = e.path ;
            const id = e.filename.split("_")[0]
            const mime_type = e.mimetype;
            const result = await create(req, "atachment_post_map", {
                id, mime_type, post, url
            })
            payload.push(result);
        });
        return payload
    }
}