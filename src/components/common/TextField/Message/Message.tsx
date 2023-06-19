import * as style from './Message.css';

/**
 * 입력 문구 안내 메시지, 에러 메시지 보여주는 컴포넌트
 */
interface MessageProps {
  message: string;
  status: 'error' | 'active' | 'default';
}

const Message = ({
  status = 'default',
  message,
  ...props
}: MessageProps & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className={style.message({ status })} {...props}>
      <span style={{ whiteSpace: 'pre-wrap' }}>{message}</span>
    </div>
  );
};

export default Message;
