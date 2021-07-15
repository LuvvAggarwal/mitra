'use strict'

const WorkerPool = require('workerpool');
const { createAttachmentRecord } = require('../threads/createAttachment');
const { sendEmail } = require('../threads/mailServer');
const { deleteChildren } = require('../threads/softDeleteCascade');



const createAttachments = async (post, attachments) => {
  return await createAttachmentRecord(post, attachments)
}

const deleteChilds = async (parent, children) => {
  return await deleteChildren(parent,children) ;
}

const sendVerifyEmail = (mailOptions, msg) => {
  return sendEmail(mailOptions, msg);
}

// CREATE WORKERS
WorkerPool.worker({
  createAttachments, deleteChilds, sendVerifyEmail
})