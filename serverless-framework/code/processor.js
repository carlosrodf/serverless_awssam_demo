'use strict';
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = (event, context, callback) => {

  const DEST_BUCKET = process.env.DEST_BUCKET
  const IS_LOCAL = process.env.AWS_SAM_LOCAL

  if(IS_LOCAL==='true'){
    console.log('Is local environment...')
    console.log('Skipping copying of files.')
    return callback(null, '')
  }else{

  }

  for (let record of event.Records) {

    var params = {
     Bucket: DEST_BUCKET,
     CopySource: '/'+record.s3.bucket.name+'/'+record.s3.object.key,
     Key: record.s3.object.key+'.processed'
    }

    console.log('doing some processing...')
    // Fake processing happens...
    console.log('Fake processing complete...')

    s3.copyObject(params, function(err, data) {
      if (err){
        console.log(err)
      } else {
        console.log('Done processing!')
        callback(null, '')
      }
    })
  }
}
