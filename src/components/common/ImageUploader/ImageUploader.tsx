import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  camera,
  defaultCircle,
  fileInput,
  imageCircle
} from './ImageUploader.css';
import Image from 'next/image';
import Camera from 'public/icons/Camera.svg';

interface ImageUploaderProps {
  /** input name */
  name: string;
  /** 수정 시 기존 imagePath */
  imagePath?: string;
  /** input callback */
  onChangeCallback?: (fileData?: File) => void;
}

export default function ImageUploader({
  name,
  onChangeCallback,
  imagePath
}: ImageUploaderProps) {
  const inputId = `${name}-fileInput`;
  const { register } = useFormContext();

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.files || event.currentTarget.files.length < 1)
      return;

    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile);

    /** FIXME: url 업로드 함수로 변경 필요 */
    onChangeCallback?.(selectedFile);
  };

  const renderImage = (url: string, alt: string) => (
    <Image
      src={url}
      className={imageCircle}
      alt={alt}
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
        renderImage(imageSrc, 'input-image')
      ) : (
        <div className={defaultCircle} />
      )}

      <label className={camera} htmlFor={inputId}>
        <Image src={Camera} alt="camera" />
      </label>

      <input
        {...register(name)}
        className={fileInput}
        id={inputId}
        onChange={handleChange}
        type="file"
        accept=".jpg, .jpeg, .png"
      />
    </div>
  );
}
