import { useCallback, useState } from 'react';
import useBooleanState from './useBooleanState';
import uploadImage from '@/utils/uploadImage';

export default function useImageUploader() {
  const [src, setSrc] = useState<string>();
  const [isUploading, startUploading, finishUploading] = useBooleanState();

  const onChangeImage = useCallback(
    (file?: File, onUploaded?: (url?: string) => Promise<void>) => {
      if (!file) return;

      startUploading();
      return uploadImage(file)
        .then(async url => {
          setSrc(url);
          onUploaded && (await onUploaded(url));
          return url;
        })
        .catch(() => setSrc(undefined))
        .finally(finishUploading);
    },
    [finishUploading, startUploading]
  );

  return { src, setSrc, isUploading, onChangeImage };
}
