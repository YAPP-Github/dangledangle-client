'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as styles from './Carousel.css';
import { debounce } from 'lodash';
import { GLOBAL_PADDING_X } from '@/styles/global.css';

interface CarouselProps extends React.PropsWithChildren {}

// 0 < SENSITIVITY <= 1. 값이 작을수록 인덱스가 쉽게 변경됨
const SENSITIVITY = 0.4;
// 0 < WHEEL_SPEED <= 1 값이 클수록 휠 한 번에 스크롤되는 양이 많아짐
const WHEEL_SPEED = 0.5;

const Carousel: React.FC<CarouselProps> = props => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function adjustWidth() {
      if (itemsWrapperRef.current?.children[0]) {
        const itemWidth = itemsWrapperRef.current.children[0]?.clientWidth;
        setItemWidth(itemWidth);
      }
      if (containerRef.current) {
        const containerWidth = document.body.clientWidth - GLOBAL_PADDING_X;
        containerRef.current.style.width = `${containerWidth}px`;
      }
    }
    adjustWidth();
    window.addEventListener('resize', adjustWidth);
    return () => {
      window.removeEventListener('resize', adjustWidth);
    };
  }, []);

  const paginate = useCallback(() => {
    if (!containerRef.current || !itemsWrapperRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const childCount = itemsWrapperRef.current.childElementCount - 1;
    const currentScrollLeft = containerRef.current.scrollLeft;

    const offsetX = (containerWidth - itemWidth) / 2 - GLOBAL_PADDING_X; // 가운데 정렬을 위한 오프셋

    const rightThreshold = itemWidth * (index + SENSITIVITY);
    const leftThreshold = itemWidth * (index - SENSITIVITY);

    let newIndex = index;
    if (currentScrollLeft > rightThreshold) {
      newIndex = index + 1;
    } else if (currentScrollLeft < leftThreshold) {
      newIndex = index - 1;
    }

    newIndex = Math.min(newIndex, childCount - 1);
    setIndex(newIndex);

    const newScrollLeft = newIndex * (itemWidth + styles.gap) - offsetX;
    containerRef.current.scroll({
      behavior: 'smooth',
      left: newScrollLeft
    });
  }, [index, itemWidth]);

  const handleMouseDown = useCallback<React.MouseEventHandler>(e => {
    if (!containerRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback<React.MouseEventHandler>(
    e => {
      if (!containerRef.current || !isMouseDown) return;

      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = startX - x;
      containerRef.current.scrollLeft = startScrollLeft + walk;
    },
    [isMouseDown, startX, startScrollLeft]
  );

  const handleMouseUp = useCallback<React.MouseEventHandler>(() => {
    setIsMouseDown(false);
    if (!isMouseDown) return;
    paginate();
  }, [isMouseDown, paginate]);

  const handleWheel = useCallback<React.WheelEventHandler>(
    e => {
      if (!containerRef.current) return;

      const walk = (e.deltaY + e.deltaX) * WHEEL_SPEED;
      containerRef.current.scrollLeft += walk;
      debounce(paginate, 50)();
    },
    [paginate]
  );

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div ref={itemsWrapperRef} className={styles.itemsWrapper}>
        {props.children}
        <div style={{ width: itemWidth }} />
      </div>
    </div>
  );
};

export default Carousel;
