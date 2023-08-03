export default function getUserGeolocation(options?: PositionOptions) {
  function onFailed(err: GeolocationPositionError) {
    switch (err.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        window.alert('위치 권한을 허용해주세요');
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
      case GeolocationPositionError.TIMEOUT:
        window.alert('위치를 가져올 수 없습니다');
        break;
    }
  }

  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      err => {
        onFailed(err);
        reject(err);
      },
      options
    );
  });
}
