import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Inputs, TemperatureAndDetails, TimeAndLocation, TopButtons, ForeCast } from "./components";
import { API_KEY } from "./configs/config.ts";
import getFormattedWeatherData from "./services/WeatherService.ts";
import { QueryState, WeatherState } from "./types/data.types";
import 'react-toastify/dist/ReactToastify.css'

const App = (): React.JSX.Element => {
  const [query, setQuery] = useState<QueryState>({ q: "kathmandu", appid: API_KEY });
  const [units, setUnits] = useState<string>("metric");
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchWeather = async () => {
      const message = query && query.q ? query.q : "Current Location"
      toast.info("Fetching weather for " + message)
      try {
        const data = await getFormattedWeatherData({ ...query, units }, controller.signal);
        toast.success(`Successfully fetched weather for ${data.name}`)
        setWeather(data);
      } catch (error) {
        // @ts-ignore
        if (error?.name === "AbortError") {
          toast.error("Cancelled", {
            autoClose: 500,
          });
        } else {
          toast.error("Error fetching weather data");
        }
      }
    };

    fetchWeather().then(() => {
    }).catch(() => {
    })

    return () => controller.abort();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to blue-700'
    const threshold = units === "metric" ? 20 : 60

    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return `from-yellow-500 to-orange-700`
  }

  return (
    <div
      className={`mx-auto max-w-screen-md py-5 px-16 sm:px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <ForeCast
            details={weather.hourly || []}
            title={"Hourly Forecast"}
            isDaily={false}
          />

          <ForeCast
            details={weather.daily || []}
            title={"Daily Forecast"}
            isDaily={true}
          />
        </>
      )}

      <ToastContainer autoClose={5000} theme={"colored"} newestOnTop={true} />
    </div>
  )
}

export default App
