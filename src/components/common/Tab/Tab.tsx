import { H3 } from '../Typography';
import { useTabContext } from './Tabs';

interface TabProps {
  value: number;
  title: string;
}

export default function Tab({ value, title }: TabProps) {
  const ctx = useTabContext();
  const isActive = ctx?.selectedTab === value;

  return (
    <button onClick={() => ctx?.handleTabSelect(value)}>
      {isActive ? (
        <H3 color="error">{title}</H3>
      ) : (
        <H3 color="gray900">{title}</H3>
      )}
    </button>
  );
}
