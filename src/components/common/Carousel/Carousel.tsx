'use client';
import { useState, useRef, useEffect, MouseEventHandler } from 'react';
import * as styles from './styles.css';

interface CarouselProps extends React.PropsWithChildren {}

// 0 < SENSITIVITY < 1. 값이 작을수록 인덱스가 쉽게 변경됨
const SENSITIVITY = 0.4;
const WHEEL_SPEED = 0.3;
const Carousel: React.FC<CarouselProps> = props => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemsWrapperRef.current && itemsWrapperRef.current) {
      const itemWidth = itemsWrapperRef.current.children[0]?.clientWidth;
      setItemWidth(itemWidth);
    }
  }, [props.children]);

  const onMouseDown: MouseEventHandler = e => {
    if (!scrollAreaRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollAreaRef.current.offsetLeft);
    setScrollLeft(scrollAreaRef.current.scrollLeft);
  };

  const onMouseMove: MouseEventHandler = e => {
    if (!scrollAreaRef.current || !isMouseDown) return;

    const x = e.pageX - scrollAreaRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollAreaRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp: MouseEventHandler = () => {
    setIsMouseDown(false);
    if (!isMouseDown) return;
    paginate();
  };

  const onWheel: React.WheelEventHandler = e => {
    if (!scrollAreaRef.current) return;
    scrollAreaRef.current.scrollLeft += (e.deltaY + e.deltaX) * WHEEL_SPEED;
    paginate();
  };

  const paginate = () => {
    if (!scrollAreaRef.current) return;
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

    const newScrollLeft = newIndex * itemWidth;
    scrollAreaRef.current.scroll({
      behavior: 'smooth',
      left: newScrollLeft
    });
  };

  return (
    <div
      className={styles.container}
      ref={scrollAreaRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      <div ref={itemsWrapperRef} className={styles.itemsWrapper}>
        {props.children}
      </div>
    </div>
  );
};

export default Carousel;
