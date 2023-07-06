'use client';

import { Body2 } from '@/components/common/Typography';
import * as styles from './Map.css';
import useMap from './hooks/useMap';

interface MapProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function Map({ latitude, longitude, address }: MapProps) {
  const { districtName } = useMap(longitude, latitude);
  return (
    <>
      <Body2>{address || districtName}</Body2>
      <div className={styles.mapContainer} id="map"></div>
    </>
  );
}
