import React, { Dispatch, SetStateAction } from "react";
import { cities } from "../../data/cities.ts";
import { QueryState } from "../../types/data.types";
import { API_KEY } from "../../configs/config.ts";

interface ITopButtonProps {
    setQuery: Dispatch<SetStateAction<QueryState>>;
}

const TopButtons: React.FC<ITopButtonProps> = (props): React.JSX.Element => {
    const { setQuery } = props
    return (
        <div className="flex items-center justify-around my-6 flex-wrap">
            {cities.map((city) => (
                <button key={city.id} className="text-white text-md sm:text-lg font-medium cursor-pointer transition ease-out hover:scale-125" onClick={() => setQuery({ q: city.title, appid: API_KEY })}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons
