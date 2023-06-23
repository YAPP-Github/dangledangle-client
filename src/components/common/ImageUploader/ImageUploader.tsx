import Image from 'next/image';
import React, { useMemo, useState } from 'react';
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
  variant?: styles.ImageVariant;
  resizingOptions?: ResizingOptions;
  error?: { message?: string };
  onChange?: (event: any) => void;
}

export const ImageUploader = React.forwardRef<
  HTMLInputElement,
  ImageUploaderProps
>(
  (
    {
      name,
      imagePath,
      onChangeCallback,
      placeholder,
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
        return;
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

    const imageSrc = useMemo(() => {
      if (file) {
        return URL.createObjectURL(file);
      }
      return imagePath;
    }, [file, imagePath]);

    return (
      <div className={styles.container}>
        {imageSrc ? (
          <label className={styles.label} htmlFor={inputId}>
            <Image
              src={imageSrc}
              className={clsx([styles.imageCircle({ variant })])}
              alt={`${inputId}-preview`}
              width={100}
              height={100}
            />
          </label>
        ) : (
          <label
            htmlFor={inputId}
            className={clsx(styles.defaultCircle({ variant }), styles.label)}
          >
            {variant === 'square' && (
              <div
                className={styles.camera({
                  variant: 'square'
                })}
              >
                {variant === 'square' && !imageSrc && <GrayCamera />}
              </div>
            )}
            <Caption2 color="gray500">{placeholder}</Caption2>
          </label>
        )}

        <label
          className={clsx({
            [styles.camera({ variant: 'circle' })]: variant === 'circle'
          })}
          htmlFor={inputId}
        >
          {variant === 'circle' && <Camera />}
          <input
            id={inputId}
            name={name}
            ref={ref}
            onChange={handleChange}
            className={styles.fileInput}
            type="file"
            accept=".jpg, .jpeg, .png"
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
