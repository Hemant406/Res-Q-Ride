
interface MapboxGl {
  Map: any;
  NavigationControl: any;
  Marker: any;
  accessToken: string;
}

declare global {
  interface Window {
    mapboxgl: MapboxGl;
  }
}

export {};
