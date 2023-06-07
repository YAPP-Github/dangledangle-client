import Carousel from '@/components/common/Carousel/Carousel';
import * as styles from './styles.css';

export default function CarouselTest() {
  return (
    <div style={{ width: '100%' }}>
      <Carousel>
        <div className={styles.item} style={{ backgroundColor: 'red' }} />
        <div className={styles.item} style={{ backgroundColor: 'orange' }} />
        <div className={styles.item} style={{ backgroundColor: 'yellow' }} />
      </Carousel>
    </div>
  );
}
