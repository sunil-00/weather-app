import React from "react";
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons';
import { WeatherState } from "../../types/data.types";
import { formatToLocalTime, iconURLFromTheCode } from "../../services/WeatherService.ts";

interface ITemperatureAndDetailsProps {
    weather: WeatherState
}

const TemperatureAndDetails: React.FC<ITemperatureAndDetailsProps> = (props): React.JSX.Element => {
    const { weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone, units } } = props
    return (
        <div>
            <div className={"flex items-center justify-center py-2 sm:py-6 text-xl text-white"}>
                <p>{details}</p>
            </div>

            <div className={"flex flex-col space-y-4 sm:flex-row items-center justify-between text-white py-3"}>
                <img src={iconURLFromTheCode(icon)} alt={""} className={"w-20"} />
                <p className={"text-5xl relative"}>{`${temp.toFixed()}`}<span className="absolute text-sm">{units.temp}</span></p>
                <div className={"flex flex-col space-y-2"}>
                    <div className={"flex font-light text-sm items-center justify-between"}>
                        <UilTemperature size={18} className={"mr-1"} />
                        Real feel:
                        <span className={"font-medium ml-1"}>{`${feels_like.toFixed()}°`}</span>
                    </div>

                    <div className={"flex font-light text-sm items-center justify-between"}>
                        <UilTear size={18} className={"mr-1"} />
                        Humidity:
                        <span className={"font-medium ml-1"}>{`${humidity.toFixed()}${units.humidity}`}</span>
                    </div>

                    <div className={"flex font-light text-sm items-center justify-between"}>
                        <UilWind size={18} className={"mr-1"} />
                        Wind:
                        <span className={"font-medium ml-1"}>{`${speed.toFixed()} ${units.speed}`}</span>
                    </div>

                </div>
            </div>


            <div className={"flex flex-row flex-wrap items-center justify-center space-x-2 sm:space-x-4 text-white text-sm py-3"}>
                <div className={"flex flex-row justify-center items-center py-1 space-x-1"}>

                    <UilSun />
                    <p className={"font-light"}>
                        Rise: <span className={"font-medium ml-1"}>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
                    </p>
                </div>
                <div className={"flex flex-row justify-center items-center py-1 space-x-1"}>

                    <UilSunset />
                    <p className={"font-light"}>
                        Set: <span className={"font-medium ml-1"}>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
                    </p>
                </div>
                <div className={"flex flex-row justify-center items-center py-1 space-x-1"}>

                    <UilSun />
                    <p className={"font-light"}>
                        High: <span className={"font-medium ml-1"}>{`${temp_max.toFixed()}°`}</span>
                    </p>
                </div>
                <div className={"flex flex-row justify-center items-center py-1 space-x-1"}>

                    <UilSun />
                    <p className={"font-light"}>
                        Low: <span className={"font-medium ml-1"}>{`${temp_min.toFixed()}°`}</span>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default TemperatureAndDetails
