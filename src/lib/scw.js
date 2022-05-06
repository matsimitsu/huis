import AWS from "aws-sdk";
import mime from "mime";

const scw = new AWS.S3({
  endpoint: "s3.nl-ams.scw.cloud",
  region: "nl-ams",
  accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
  secretAccessKey: process.env.SCALEWAY_ACCESS_SECRET,
  signatureVersion: "v4",
  params: { Bucket: "matsimitsu-travel-cdn" },
});

export async function upload(key, data) {
  const params = {
    ACL: "public-read",
    Key: key,
    Body: data,
    ContentType: mime.getType(key)
  };
  return scw.upload(params).promise()
}

export async function download(key) {
  return scw.getObject({ Key: key }).promise()
}

export async function exists(key) {
  return scw.headObject({ Key: key })
    .promise()
    .then(
      () => true,
      err => {
        if (err.code === 'NotFound') {
          return false;
        }
        throw err;
      }
    );
}
