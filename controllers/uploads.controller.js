import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
});

export const getPresignedUrl = async (req, res) => {
  const bucket = "aprix-storage";
  const { key } = req.query;
  const keyUnique = `aprix-${nanoid(8)}_${key}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: keyUnique,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  function getPublicFileUrl(bucket, key, projectId) {
    const template = process.env.S3_PUBLIC_URL_TEMPLATE;
    return template
      .replace("{bucket}", bucket)
      .replace("{key}", key)
      .replace("{projectId}", projectId || "");
  }

  const fileUrl = getPublicFileUrl(bucket, keyUnique, req.query.projectId);
  res.json({ signedUrl, fileUrl });
};
