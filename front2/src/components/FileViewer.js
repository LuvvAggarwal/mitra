import React from 'react'
import { Player, BigPlayButton, ForwardControl, ReplayControl, ControlBar } from 'video-react';
import img_url from '../utils/imgURL';

const FileViewer = ({ attachment, title, viewtype, css }) => {
    const renderAttachment = (attachment, title) => {
        // console.log(attachment);
        // console.log(title);
        const getType = (e) => {
            // console.log(e);
            var ext = e.url.split('.').pop()
            if (ext) return ext;
            else return "";
        }
        const attachment_url = img_url(attachment.url)
        const extension = getType(attachment);
        const mime = attachment.mime_type;
        const regex = /application\/pdf|image|video|text|application/;// excel or doc mime type is text
        const type = regex.exec(mime)[0];
        // console.log(type);
        // let markup;
        if(viewtype == "postView"){
            switch (type) {
                case "application/pdf":
                    return <a href={`${attachment_url}`} download={extension ? title + "." + extension : attachment.url} className="btn btn-danger">Download PDF</a>;
                case "text": return <a href={`${attachment_url}`} download={title + "." + extension} className="btn btn-primary">Download Document</a>;
                case "application": return <a href={`${attachment_url}`} download={title + "." + extension} className="btn btn-primary">Download Document</a>;
                case "image":
                    return <img className={`rounded-3 ${css}`} src={`${attachment_url}`} alt={title} />;
                case "video":
                    return <Player className={css} src={`${attachment_url}`}>
                        <ControlBar autoHide={true}>
                            <BigPlayButton position="center"></BigPlayButton>
                            <ReplayControl seconds={5} order={2.1} />
                            <ForwardControl seconds={5} order={3.1} />
                        </ControlBar>
                    </Player>;
            }
        }else if(viewtype == "createPost"){
            switch (type) {
                case "application/pdf":
                    return <a href={attachment.url} download={extension ? title + "." + extension : attachment.url} className="btn btn-danger">Download PDF</a>;
                case "text": return <a href={attachment.url} download={title + "." + extension} className="btn btn-primary">Download Document</a>;
                case "application": return <a href={attachment.url} download={title + "." + extension} className="btn btn-primary">Download Document</a>;
                case "image":
                    return <img src={attachment.url} className={`rounded-3 ${css}`} alt={title} />;
                case "video":
                    return <Player className={css} src={attachment.url}>
                        <ControlBar autoHide={true}>
                            <BigPlayButton position="center"></BigPlayButton>
                            <ReplayControl seconds={5} order={2.1} />
                            <ForwardControl seconds={5} order={3.1} />
                        </ControlBar>
                    </Player>;
            }
        }

        // console.log(markup);
        // return markup;
    }

    return (
        <div className="card-body d-block p-0 mb-3">
            <div className="row ps-2 pe-2">
                <div className="col-sm-12 p-1">
                    {renderAttachment(attachment, title)}
                </div>
            </div>
        </div>
    )
}

export default FileViewer
