export interface City {
    id: number;
    title: string;
}

export interface SearchParams extends Record<string, string | number> {
    appid: string;
}

export interface WeatherApiResponse {
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    name: string;
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    weather: {
        main: string;
        icon: string;
        description: string;
        id: number;
    }[];
    wind: {
        speed: number;
    };
}


export interface ForecastData {
    timezone: string;
    daily?: {
        dt: number;
        temp: { day: number };
        weather?: { icon: string }[];
    }[];
    hourly?: {
        dt: number;
        temp: { day: number };
        weather?: { icon: string }[];
    }[];
}


export type QueryState = {
    q: string;
    appid: string;
}

export type WeatherState = {
    country: string;
    daily?: {
        dt: number;
        title: string;
        temp: {
            day: number;
        };
        icon: string;
    }[];
    description: string;
    details: string;
    dt: number;
    feels_like: number;
    hourly?: {
        dt: number;
        title: string;
        temp: {
            day: number;
        };
        icon: string;
    }[];
    humidity: number;
    icon: string;
    id: number;
    lat: number;
    lon: number;
    name: string;
    speed: number;
    sunrise: number;
    sunset: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    timezone: string;
    units: {
        temp: string,
        humidity: string,
        speed: string
    };
}

