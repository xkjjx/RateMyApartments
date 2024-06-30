const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

function getApartmentPhoto(req, res){
    let key = 'apartments/' + req.params.id + '.jpeg';
    
    try {
        const url = s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Expires: 60 * 60, // URL expiration time in seconds
        });
    
        res.status(200).json({ url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not fetch photo' });
    }
}

module.exports = { getApartmentPhoto };