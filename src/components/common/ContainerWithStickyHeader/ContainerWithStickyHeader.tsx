'use client';
import { UploadIcon } from '@/asset/icons';
import * as headerStyles from '@/components/common/Header/Header.css';
import useHeader, { UseHeaderProps } from '@/hooks/useHeader';
import useSnsShare from '@/hooks/useSnsShare';
import * as globalStyles from '@/styles/global.css';
import clsx from 'clsx';
import { useEffect } from 'react';
import { variants } from '../Typography/Typography.css';
import * as styles from './ContainerWithStickyHeader.css';
interface StickyTitleProps {
  headerProps: UseHeaderProps;
}

export default function ContainerWithStickyHeader({
  headerProps,
  children
}: React.PropsWithChildren<StickyTitleProps>) {
  const { handleSnsShare } = useSnsShare();

  const ShareButton = () => {
    return (
      <UploadIcon
        onClick={() => {
          handleSnsShare(`${headerProps.title}를 둘러보세요!`, location.href);
        }}
      />
    );
  };

  const setHeader = useHeader({
    ...headerProps,
    color: 'white',
    RightSideComponent: ShareButton
  });

  useEffect(() => {
    const headerElem = document.getElementsByClassName(
      headerStyles.container
    )[0];
    const titleElem = headerElem?.getElementsByClassName(variants.h4)[0];
    const containerElem = document.getElementsByClassName(styles.container)[0];

    if (!(headerElem && containerElem && titleElem)) {
      throw new Error(`정의되지 않은 html 엘리먼트가 있습니다.`);
    }

    /** header에 sticky 스타일 class 추가 */
    headerElem.classList.add(styles.sticky);

    /** container에 height가 있을때만 title hidden*/
    if (containerElem.getBoundingClientRect().height !== 0) {
      titleElem.classList.add(styles.hidden);
    }

    const titleFadeInteractionControl = () => {
      const containerRect = containerElem.getBoundingClientRect();

      if (containerRect.top <= 0) {
        titleElem.classList.add(styles.fadeIn);
        titleElem.classList.remove(styles.hidden);
      } else {
        titleElem.classList.remove(styles.fadeIn);
        titleElem.classList.add(styles.hidden);
      }
    };

    window.addEventListener('scroll', titleFadeInteractionControl);
    return () =>
      window.removeEventListener('scroll', titleFadeInteractionControl);
  }, [setHeader]);
  return (
    <div className={clsx([styles.container, globalStyles.expandGlobalPadding])}>
      {children}
    </div>
  );
}
