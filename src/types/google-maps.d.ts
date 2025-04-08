
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        MapMouseEvent: any;
        Animation: {
          DROP: number;
        };
        Geocoder: any;
        places: any;
      };
    };
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    addListener(eventName: string, handler: Function): any;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
  }

  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: string) => void): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    animation?: number;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface GeocoderRequest {
    location?: LatLng | LatLngLiteral;
    address?: string;
  }

  interface GeocoderResult {
    formatted_address: string;
    geometry: {
      location: LatLng;
    };
  }

  interface MapMouseEvent {
    latLng?: LatLng;
  }
}

export {};
