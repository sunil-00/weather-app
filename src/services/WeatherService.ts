import { API_KEY, BASE_URL, ONECALL_BASE_URL } from "../configs/config.ts";
import { ForecastData, SearchParams, WeatherApiResponse } from "../types/data.types";
import { DateTime, Zone } from "luxon";

const metricUnits = {
    temp: "°C",
    humidity: "%",
    speed: "m/s"
}

const imperialUnits = {
    temp: "°F",
    humidity: "%",
    speed: "mi/h"
}

const getWeatherData = async (infoType: string, searchParams: SearchParams, signal: AbortSignal): Promise<WeatherApiResponse> => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams(searchParams as Record<string, string>).toString();

    const res = await fetch(url.toString(), { signal });
    return await res.json();
};


const getOneCallWeatherData = async (infoType: string, searchParams: SearchParams, signal: AbortSignal): Promise<ForecastData> => {
    const url = new URL(`${ONECALL_BASE_URL}/${infoType}`);
    url.search = new URLSearchParams(searchParams as Record<string, string>).toString();

    const res = await fetch(url.toString(), { signal });
    return await res.json();
};

const formatCurrentWeather = (data: WeatherApiResponse, units: string) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon, description, id } = weather[0]
    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        description,
        id,
        speed,
        units: units === "imperial" ? imperialUnits : metricUnits
    }
}

const formatForecastWeather = (data: ForecastData): { timezone: string; daily?: any[]; hourly?: any[] } => {
    let { timezone, daily, hourly } = data;

    daily = daily?.slice(1, 6)?.map(d => {
        const dtNumeric = Number(d.dt);
        return {
            dt: dtNumeric,
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: { day: d.temp.day },
            icon: d.weather?.[0].icon ? d.weather?.[0].icon : undefined
        };
    });

    hourly = hourly?.slice(1, 6)?.map(d => {
        const dtNumeric = Number(d.dt);
        return {
            dt: dtNumeric,
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather?.[0].icon ? d.weather?.[0].icon : undefined
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams: SearchParams, signal: AbortSignal) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams, signal).then(data => formatCurrentWeather(data, searchParams.units as string));

    const { lat, lon } = formattedCurrentWeather;

    const oneCallSearchParams: SearchParams = {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
        appid: API_KEY
    };

    const formattedForecastWeather = await getOneCallWeatherData("onecall", oneCallSearchParams, signal).then(data => formatForecastWeather(data));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs: number, zone: string | Zone<boolean> | undefined, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconURLFromTheCode = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconURLFromTheCode };
