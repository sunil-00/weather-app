import React from "react";
import { WeatherState } from "../../types/data.types";
import { formatToLocalTime } from "../../services/WeatherService.ts";

interface ITimeAndLocationProps {
    weather: WeatherState
}

const TimeAndLocationProps: React.FC<ITimeAndLocationProps> = (props): React.JSX.Element => {
    const { weather: { dt, timezone, name, country } } = props
    return (
        <div>
            <div className={"flex items-center justify-center my-6"}>
                <p className={"text-white text-sm sm:text-xl font-extralight"}>
                    {formatToLocalTime(dt, timezone)}
                </p>
            </div>

            <div className={"flex items-center justify-center my-3"}>
                <p className={"text-white text-3xl font-medium"}>
                    {`${name}, ${country}`}
                </p>
            </div>
        </div>
    )
}

export default TimeAndLocationProps
