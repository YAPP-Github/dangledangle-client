import Image from 'next/image';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as styles from './ImageUploader.css';
import { Camera } from '@/asset/icons';
import { Body3 } from '../Typography';
import uploadImage, { ResizingOptions } from '@/utils/uploadImage';
import useBooleanState from '@/hooks/useBooleanState';

interface ImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** input name */
  name: string;
  /** 수정 시 기존 imagePath */
  imagePath?: string;
  /** input callback */
  onChangeCallback?: (fileData?: File) => void;
  /** 에러 메세지 표출 여부 */
  help?: boolean;
  resizingOptions?: ResizingOptions;
  onUploaded?: (url?: string) => void;
}

export default function ImageUploader({
  name,
  onChangeCallback,
  onUploaded,
  imagePath,
  help = false,
  resizingOptions,
  ...props
}: ImageUploaderProps) {
  const inputId = `${name}-fileInput`;
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoadingOn, setLoadingOff] = useBooleanState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.files || event.currentTarget.files.length < 1) {
      return setFile(null);
    }

    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile);

    onChangeCallback?.(selectedFile);
    if (onUploaded) upload(selectedFile);
  };

  const upload = (file: File) => {
    setLoadingOn();
    uploadImage(file, resizingOptions).then(onUploaded).finally(setLoadingOff);
  };

  const renderImage = (url: string) => (
    <Image
      src={url}
      className={styles.imageCircle}
      alt={`${inputId}-preview`}
      width={100}
      height={100}
    />
  );

  const imageSrc = file
    ? URL.createObjectURL(file)
    : !file && imagePath && imagePath.length
    ? `${process.env.HOST}${imagePath}`
    : '';

  return (
    <div>
      {imageSrc ? (
        renderImage(imageSrc)
      ) : (
        <div className={styles.defaultCircle} />
      )}

      <label className={styles.camera} htmlFor={inputId}>
        <Camera />
        <input
          {...register(name)}
          className={styles.fileInput}
          id={inputId}
          onChange={handleChange}
          type="file"
          accept=".jpg, .jpeg, .png"
          {...props}
        />
      </label>

      {help && errors[name] && (
        <Body3 color="error" style={{ textAlign: 'center' }}>
          {errors[name]?.message as never}
        </Body3>
      )}
    </div>
  );
}
