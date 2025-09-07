import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: process.env.S3_SIGNATURE_VERSION || 'v4',
  s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
});

export const getPresignedUrl = async (req, res) => {
  const bucket = "aprix-storage";
  const { key } = req.query;
  const keyUnique = `aprix-${nanoid(8)}_${key}`;
  const params = {
    Bucket: bucket,
    Key: keyUnique,
  };

  function getPublicFileUrl(bucket, key, projectId) {
    const template = process.env.S3_PUBLIC_URL_TEMPLATE;
    return template
      .replace("{bucket}", bucket)
      .replace("{key}", key)
      .replace("{projectId}", projectId || "");
  }

  const signedUrl = await s3.getSignedUrlPromise("putObject", params);
  const fileUrl = getPublicFileUrl(bucket, keyUnique, projectId);
  res.json({ signedUrl, fileUrl });
}
