import Accordion from '@/components/common/Accordion/Accordion';
import ContainerWithStickyHeader from '@/components/common/ContainerWithStickyHeader/ContainerWithStickyHeader';

export default function Home() {
  return (
    <>
      <div>
        <ContainerWithStickyHeader headerProps={{ title: '보호소이름' }}>
          <Accordion title="1231">
            <div>123213</div>
            <div>123213</div>
            <div>123213</div>
            <div>123213</div>
          </Accordion>
        </ContainerWithStickyHeader>
      </div>
      <div style={{ height: '100vh', backgroundColor: 'beige' }}></div>
    </>
  );
}
