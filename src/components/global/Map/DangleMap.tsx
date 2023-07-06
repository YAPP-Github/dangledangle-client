'use client';

import { Body2 } from '@/components/common/Typography';
import * as styles from './DangleMap.css';
import useMap from './hooks/useMap';

interface DangleMapProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function DangleMap({
  latitude,
  longitude,
  address
}: DangleMapProps) {
  const { districtName } = useMap(longitude, latitude);
  return (
    <>
      <Body2>{address || districtName}</Body2>
      <div className={styles.mapContainer} id="map"></div>
    </>
  );
}
