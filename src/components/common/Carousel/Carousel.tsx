'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as styles from './Carousel.css';
import { debounce } from 'lodash';

interface CarouselProps extends React.PropsWithChildren {}

// 0 < SENSITIVITY < 1. 값이 작을수록 인덱스가 쉽게 변경됨
const SENSITIVITY = 0.4;
// 값이 클수록 휠 한 번에 스크롤되는 양이 많아짐
const WHEEL_SPEED = 0.5;
const Carousel: React.FC<CarouselProps> = props => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function calculateItemWidth() {
      if (itemsWrapperRef.current && itemsWrapperRef.current) {
        const itemWidth = itemsWrapperRef.current.children[0]?.clientWidth;
        setItemWidth(itemWidth);
      }
    }
    calculateItemWidth();
    window.addEventListener('resize', calculateItemWidth);
    return () => {
      window.removeEventListener('resize', calculateItemWidth);
    };
  }, []);

  const paginate = useCallback(() => {
    if (!scrollAreaRef.current || !itemsWrapperRef.current) return;

    const areaWidth = scrollAreaRef.current.clientWidth;
    const offsetX = (areaWidth - itemWidth) / 2; // 가운데 정렬을 위한 오프셋
    const currentScrollLeft = scrollAreaRef.current.scrollLeft;

    const rightThreshold = itemWidth * (index + SENSITIVITY);
    const leftThreshold = itemWidth * (index - SENSITIVITY);

    let newIndex = index;
    if (currentScrollLeft > rightThreshold) {
      newIndex = index + 1;
    } else if (currentScrollLeft < leftThreshold) {
      newIndex = index - 1;
    }
    setIndex(newIndex);

    const newScrollLeft = newIndex * (itemWidth + styles.gap) - offsetX;
    scrollAreaRef.current.scroll({
      behavior: 'smooth',
      left: newScrollLeft
    });
  }, [index, itemWidth]);

  const handleMouseDown = useCallback<React.MouseEventHandler>(e => {
    if (!scrollAreaRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollAreaRef.current.offsetLeft);
    setScrollLeft(scrollAreaRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback<React.MouseEventHandler>(
    e => {
      if (!scrollAreaRef.current || !isMouseDown) return;

      const x = e.pageX - scrollAreaRef.current.offsetLeft;
      const walk = startX - x;
      scrollAreaRef.current.scrollLeft = scrollLeft + walk;
    },
    [isMouseDown, startX, scrollLeft]
  );

  const handleMouseUp = useCallback<React.MouseEventHandler>(() => {
    setIsMouseDown(false);
    if (!isMouseDown) return;
    paginate();
  }, [isMouseDown, paginate]);

  const handleWheel = useCallback<React.WheelEventHandler>(
    e => {
      if (!scrollAreaRef.current) return;

      const walk = (e.deltaY + e.deltaX) * WHEEL_SPEED;
      scrollAreaRef.current.scrollLeft += walk;
      debounce(paginate, 100)();
    },
    [paginate]
  );

  return (
    <div
      className={styles.container}
      ref={scrollAreaRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div ref={itemsWrapperRef} className={styles.itemsWrapper}>
        {props.children}
        <div style={{ width: itemWidth * SENSITIVITY }} />
      </div>
    </div>
  );
};

export default Carousel;
