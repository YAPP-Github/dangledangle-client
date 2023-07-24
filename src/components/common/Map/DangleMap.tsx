'use client';

import { Body2, Body3 } from '@/components/common/Typography';
import * as styles from './DangleMap.css';
import useMap from './hooks/useMap';

interface DangleMapProps {
  latitude: number;
  longitude: number;
  address?: string;
  notice?: string;
}

export default function DangleMap({
  latitude,
  longitude,
  address,
  notice
}: DangleMapProps) {
  const { districtName } = useMap(longitude, latitude);
  return (
    <div className={styles.wrapper}>
      <div>
        <Body2>{address || districtName}</Body2>
        {notice && <Body3 color="gray700">{notice}</Body3>}
      </div>
      <div className={styles.mapContainer} id="map"></div>
    </div>
  );
}
