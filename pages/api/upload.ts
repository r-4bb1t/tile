import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};

export default async function Upload(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    let { name, type } = JSON.parse(req.body);
    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: name,
      ContentType: type,
      ACL: "public-read",
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    res.status(200).json({ url });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Unknown error" });
  }
}
