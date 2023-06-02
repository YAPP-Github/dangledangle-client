'use client';
import { useState, useRef, useEffect } from 'react';
import * as styles from './styles.css';
interface CarouselProps extends React.PropsWithChildren {}
const Carousel: React.FC<CarouselProps> = props => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollAreaRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollAreaRef.current.offsetLeft);
    setScrollLeft(scrollAreaRef.current.scrollLeft);
  };
  const onMouseUp = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollAreaRef.current || !isMouseDown) return;
    setIsDragging(true);
    const x = e.pageX - scrollAreaRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollAreaRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={styles.container}
      ref={scrollAreaRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div className={styles.itemsWrapper}>{props.children}</div>
    </div>
  );
};

export default Carousel;
