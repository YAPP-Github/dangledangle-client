import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import * as styles from './ImageUploader.css';
import { Camera } from '@/asset/icons';
import { GrayCamera } from '@/asset/icons';
import { Body3, Caption2 } from '../Typography';
import clsx from 'clsx';
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
  placeholder?: string;
  formContext?: UseFormReturn<FieldValues>;
  variant?: styles.ImageVariant;
  resizingOptions?: ResizingOptions;
  onUploaded?: (url?: string) => void;
}

export default function ImageUploader({
  name,
  onChangeCallback,
  onUploaded,
  imagePath,
  help = false,
  placeholder,
  formContext,
  variant = 'circle',
  resizingOptions,
  ...props
}: ImageUploaderProps) {
  const inputId = `${name}-fileInput`;

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
    <>
      <label htmlFor={inputId}>
        <Image
          src={url}
          className={clsx([styles.imageCircle({ variant })])}
          alt={`${inputId}-preview`}
          width={100}
          height={100}
        />
      </label>
    </>
  );

  const imageSrc = file
    ? URL.createObjectURL(file)
    : !file && imagePath && imagePath.length
    ? `${process.env.HOST}${imagePath}`
    : '';

  return (
    <div className={styles.container}>
      {imageSrc ? (
        renderImage(imageSrc)
      ) : (
        <div className={clsx([styles.defaultCircle({ variant })])}>
          <Caption2 color="gray500">{placeholder}</Caption2>
        </div>
      )}

      <label
        className={clsx([
          styles.camera({
            variant: variant === 'circle' ? 'circle' : !file ? 'square' : 'none'
          })
        ])}
        htmlFor={inputId}
      >
        {variant === 'circle' ? <Camera /> : <GrayCamera />}
        <input
          {...formContext?.register(name)}
          className={styles.fileInput}
          id={inputId}
          onChange={handleChange}
          type="file"
          accept=".jpg, .jpeg, .png"
          placeholder="vmfghfgmvjf"
          {...props}
        />
      </label>

      {help && formContext?.formState.errors[name] && (
        <Body3 color="error" style={{ textAlign: 'center' }}>
          {formContext.formState.errors[name]?.message as never}
        </Body3>
      )}
    </div>
  );
}
