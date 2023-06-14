import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import * as styles from './ImageUploader.css';
import { Camera } from '@/asset/icons';
import { Body3, Caption2 } from '../Typography';

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
}

export default function ImageUploader({
  name,
  onChangeCallback,
  imagePath,
  help = false,
  placeholder,
  formContext,
  ...props
}: ImageUploaderProps) {
  const inputId = `${name}-fileInput`;

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.currentTarget?.files || event.currentTarget.files.length < 1) {
      return setFile(null);
    }

    const selectedFile = event.currentTarget.files[0];
    setFile(selectedFile);

    /** FIXME: url 업로드 함수로 변경 필요 */
    onChangeCallback?.(selectedFile);
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
        <div className={styles.defaultCircle}>
          <Caption2 color="gray500">{placeholder}</Caption2>
        </div>
      )}

      <label className={styles.camera} htmlFor={inputId}>
        <Camera />
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
