import Accordion from '../common/Accordion/Accordion';
import * as styles from './Description.css';
interface DescriptionProps {
  description: string;
}
export default function Description({ description }: DescriptionProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <Accordion title="">
          <div>{description}</div>
        </Accordion>
      </div>
    </>
  );
}
