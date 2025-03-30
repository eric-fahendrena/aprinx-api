import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const s3 = new AWS.S3({
  endpoint: "https://gateway.storjshare.io",
  accessKeyId: "jw75qos2eqqnxybxpoy6fabydkfq",
  secretAccessKey: "j2iii225euzce324kbcxvdsiyz4sb2ijb2w5ebzychn6ie2npzcok",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});

export const getPresignedUrl = async (req, res) => {
  const bucket = "aprix-storage";
  const { key } = req.query;
  const keyUnique = `aprix-${nanoid(8)}_${key}`;
  const params = {
    Bucket: bucket,
    Key: keyUnique,
  };

  const signedUrl = await s3.getSignedUrlPromise("putObject", params);
  const fileUrl = `https://link.storjshare.io/raw/jvdu5csishntpzqqyf7f7tozmdnq/${bucket}/${keyUnique}`;
  res.json({ signedUrl, fileUrl });
}
