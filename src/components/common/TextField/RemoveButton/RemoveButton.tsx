import { TextFieldRemoveIcon } from '@/asset/icons';
import clsx from 'clsx';
import * as styles from './RemoveButton.css';
import { MouseEventHandler, useCallback, FocusEventHandler } from 'react';
interface RemoveButtonProps {
  visible: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ visible, onClick }) => {
  const findInputContainer = useCallback((elem: HTMLElement) => {
    if (!elem) {
      return null;
    }
    // 최상위 엘리먼트까지 올라갔는데도 없으면 null 반환
    if (elem.tagName === 'BODY') return null;

    // aria-label이 input-text인 엘리먼트가 있으면 반환
    if (elem.getAttribute('aria-label')?.match(/input-text/)) {
      return elem;
    }
    // 부모 엘리먼트가 없으면 null 반환
    if (!elem.parentElement) {
      return null;
    }
    // 부모 엘리먼트를 재귀적으로 조회해서 container를 찾음
    return findInputContainer(elem.parentElement);
  }, []);

  const findInputElement = useCallback((elem: Element) => {
    // INPUT 엘리먼트나 submit 엘리먼트가 있으면 반환
    if (elem.tagName === 'INPUT' || elem.getAttribute('type') === 'submit') {
      return elem;
    }

    // 자식 엘리먼트를 재귀적으로 조회해서 input을 찾음
    for (let i = 0; i < elem.children.length; i++) {
      const child = elem.children[i] as Element;
      const found = findInputElement(child) as Element;
      if (found) {
        return found;
      }
    }
    // 찾지 못하면 null 반환
    return null;
  }, []);

  const handleFocus: FocusEventHandler<HTMLButtonElement> = useCallback(e => {
    const parentElement = e.relatedTarget?.parentElement as HTMLElement;
    if (!parentElement) return;

    const inputContainer = findInputContainer(parentElement);

    const nextInputContainer =
      inputContainer?.nextElementSibling as HTMLElement;

    if (!nextInputContainer) {
      const beyondFormElem = parentElement.parentElement?.nextElementSibling;
      if (!beyondFormElem) return;
      const nextSubmit = findInputElement(beyondFormElem) as HTMLElement;
      if (!nextSubmit) return;
      nextSubmit.focus();
    } else {
      const nextInput = findInputElement(nextInputContainer) as HTMLElement;
      nextInput.focus();
    }
  }, []);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      onClick(e);
    },
    [onClick]
  );

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.icon({ visible }))}
      type="button"
      onFocus={handleFocus}
    >
      <TextFieldRemoveIcon />
    </button>
  );
};

export default RemoveButton;
