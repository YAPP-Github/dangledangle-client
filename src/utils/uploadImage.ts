import { Stage } from '@/types';
import ky from 'ky';
import { makeUrlSearchParams } from './url';

export interface ResizingOptions {
  width: number;
  height: number;
}

interface UploadImageParams {
  env: Stage;
  w?: string;
  h?: string;
}

type UploadResponse = {
  src: string;
};

export default async function uploadImage(
  file: File,
  options?: ResizingOptions
) {
  if (!file) return;

  const params: UploadImageParams = {
    env: process.env.NEXT_PUBLIC_STAGE as Stage,
    w: options?.width.toString(),
    h: options?.height.toString()
  };
  const search = makeUrlSearchParams(params as {});
  try {
    const response = await ky
      .post(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_ENDPOINT}?${search}`, {
        body: file,
        headers: {
          'content-type': file.type
        }
      })
      .then(res => res.json<UploadResponse>());
    return response.src;
  } catch (e) {
    console.error(JSON.stringify(e));
    throw e;
  }
}
