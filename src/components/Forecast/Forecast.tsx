import React from "react";
import { iconURLFromTheCode } from "../../services/WeatherService.ts";

interface IForecastProps {
    title: String,
    details: { dt: number; title: string; temp: { day: number }; icon: string }[],
    isDaily: Boolean
}

const Forecast: React.FC<IForecastProps> = (props): React.JSX.Element => {
    const { title, details, isDaily } = props
    return (
        <div>
            <div className={"flex items-center justify-start mt-6"}>
                <p className={"text-white font-medium uppercase"}>{title}</p>
            </div>
            <hr className={"my-2"}></hr>

            <div className={"flex flex-row items-center justify-between text-white"}>
                {details.map((item, index) => (
                    <div key={index + Math.random()} className={"flex flex-col items-center justify-center text-center"}>
                        <p className={"font-light text-sm"}>{item.title}</p>
                        <img src={iconURLFromTheCode(item.icon)} alt={""} className={"w-12 my-1"} />
                        <p className={"font-medium"}>
                            {isDaily ? `${item.temp?.day?.toFixed()}°` : `${parseFloat(JSON.stringify(item.temp))?.toFixed()}°`}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Forecast
