import React, { Dispatch, SetStateAction, useState } from "react";
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'
import { QueryState } from "../../types/data.types";
import { toast } from "react-toastify";
import { API_KEY } from "../../configs/config";

export interface IInputProps {
    setQuery: Dispatch<SetStateAction<QueryState>>;
    units: string;
    setUnits: Dispatch<SetStateAction<string>>;
}

const TopButtons: React.FC<IInputProps> = (props): React.JSX.Element => {
    const { setQuery, setUnits, units } = props
    const [city, setCity] = useState<string>("")

    const handleSearchClick = () => {
        if (city !== "") {
            setQuery({ q: city, appid: API_KEY })
        }
    }

    const handleUnitsChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) {
            setUnits(selectedUnit);
        }
    };


    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info("Fetching users location");
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Location fetched!")
                let lat = position.coords.latitude
                let lon = position.coords.longitude

                setQuery({
                    // @ts-ignore
                    lat,
                    lon,
                    appid: API_KEY
                })
            },
                () => {
                    toast.error("Failed to get user location!")
                }
            )
        }
    }

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    type={"text"}
                    value={city}
                    onChange={(e) => {
                        setCity(e.currentTarget.value)
                    }}
                    className={"h-3/4 sm:h-100 text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"}
                    placeholder={"Search for city..."}
                />
                <UilSearch size={25} className={"text-white cursor-pointer transition ease-out hover:scale-125"}
                    onClick={handleSearchClick} />
                <UilLocationPoint size={25}
                    className={"text-white cursor-pointer transition ease-out hover:scale-125"}
                    onClick={handleLocationClick} />
            </div>

            <div className={"flex flex-row w-1/4 items-center justify-center"}>
                <button
                    name="metric"
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    onClick={handleUnitsChange}
                >
                    &deg;C
                </button>
                <p className={"text-xl text-white mx-1"}>|</p>
                <button
                    name="imperial"
                    className="text-xl text-white font-light transition ease-out hover:scale-125"
                    onClick={handleUnitsChange}
                >
                    &deg;F
                </button>
            </div>
        </div>
    )
}

export default TopButtons;
