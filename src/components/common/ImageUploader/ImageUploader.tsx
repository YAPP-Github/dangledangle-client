import React, { useMemo, useState } from 'react';
import * as styles from './ImageUploader.css';
import { Camera } from '@/asset/icons';
import { Body1 } from '../Typography';
import uploadImage, { ResizingOptions } from '@/utils/uploadImage';
import Avartar, { AvartarProps } from '../Avartar/Avartar';
import LoadingIndicator from '../Button/LoadingIndicator';
import clsx from 'clsx';

interface ImageUploaderProps extends AvartarProps {
  /** input name */
  name: string;
  /** 수정 시 기존 imagePath */
  imagePath?: string;
  /** input callback */
  onChangeCallback?: (fileData?: File) => void;
  resizingOptions?: ResizingOptions;
  error?: boolean;
  loading?: boolean;
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
      resizingOptions,
      error,
      loading,
      onChange,
      shape,
      defaultImage,
      size,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = `${name}-fileInput`;

    const [file, setFile] = useState<File | null>(null);

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
      uploadImage(file, resizingOptions).then(url =>
        onChange?.({ target: { name, value: url } })
      );
    };

    const imageSrc = useMemo(() => {
      if (file) {
        return URL.createObjectURL(file);
      }
      return imagePath;
    }, [file, imagePath]);

    return (
      <div className={clsx(styles.container, className)} style={style}>
        <label htmlFor={inputId}>
          <Avartar
            className={styles.avartar}
            size={size}
            shape={shape}
            defaultImage={defaultImage}
            imagePath={imageSrc}
          >
            <div className={styles.camera({ square: shape === 'square' })}>
              <Camera />
            </div>
            {(loading || error) && (
              <div className={styles.loadingMask}>
                {(loading && <LoadingIndicator color="primary" />) ||
                  (error && <Body1 color="error">실패⚠️</Body1>)}
              </div>
            )}
          </Avartar>
        </label>
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
      </div>
    );
  }
);

ImageUploader.displayName = 'ImageUploader';
export default ImageUploader;
