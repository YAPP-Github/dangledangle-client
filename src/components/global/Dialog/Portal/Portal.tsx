import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PortalElementId, PORTAL_ELEMENT_ID } from './types';

type Props = {
  portalId: PortalElementId;
  children: React.ReactNode;
};

export default function Portal({ children, portalId }: Props) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(PORTAL_ELEMENT_ID[portalId]));
  }, [portalId]);

  if (!element) {
    return <></>;
  }

  return createPortal(children, element);
}
