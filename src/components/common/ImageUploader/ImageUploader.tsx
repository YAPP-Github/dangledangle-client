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

interface ImageUploaderProps {
  /** input name */
  name: string;
  /** 수정 시 기존 imagePath */
  imagePath?: string;
  /** input callback */
  onChangeCallback?: (fileData?: File) => void;
  placeholder?: string;
  formContext?: UseFormReturn<FieldValues>;
  variant?: styles.ImageVariant;
  resizingOptions?: ResizingOptions;
  onUploaded?: (url?: string) => void;

  error?: { message?: string };
  onChange?: (...event: any[]) => void;
}

export const ImageUploader = React.forwardRef<
  HTMLInputElement,
  ImageUploaderProps
>(
  (
    {
      name,
      onUploaded,
      imagePath,
      onChangeCallback,
      placeholder,
      formContext,
      variant = 'circle',
      resizingOptions,

      error,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = `${name}-fileInput`;

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoadingOn, setLoadingOff] = useBooleanState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        !event?.currentTarget?.files ||
        event.currentTarget.files.length < 1
      ) {
        return setFile(null);
      }

      const selectedFile = event.currentTarget.files[0];
      setFile(selectedFile);

      onChangeCallback?.(selectedFile);
      if (onChange) upload(selectedFile);
    };

    const upload = (file: File) => {
      setLoadingOn();
      uploadImage(file, resizingOptions)
        .then(url => onChange?.({ target: { name, value: url } }))
        .finally(setLoadingOff);
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
              variant:
                variant === 'circle' ? 'circle' : !file ? 'square' : 'none'
            })
          ])}
          htmlFor={inputId}
        >
          {variant === 'circle' ? <Camera /> : <GrayCamera />}
          <input
            id={inputId}
            name={name}
            ref={ref}
            onChange={handleChange}
            className={styles.fileInput}
            type="file"
            accept=".jpg, .jpeg, .png"
            placeholder="vmfghfgmvjf"
            {...props}
          />
        </label>

        {error && (
          <Body3 color="error" style={{ textAlign: 'center' }}>
            {error?.message as never}
          </Body3>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = 'ImageUploader';
export default ImageUploader;
