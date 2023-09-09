import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { useEffect, useState } from "react";

import { BsArrowUpShort, BsFillMoonFill } from "react-icons/bs";
import { MdOutlineWaterDrop, MdSearch } from "react-icons/md";

import * as Weather from "react-icons/wi";

export default function Home() {
  const [loc, setLoc] = useState("Chennai");
  const [input, setInput] = useState("");
  const [place, setPlace] = useState("Chennai");

  const [autocomp, setAutocomp] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_KEY}&q=${loc}&days=3`
    )
      .then((a) => a.json())
      .then((d) => {
        setData(d);
      });
  }, [loc]);

  useEffect(() => {
    if(input == '' || !input) return;
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_KEY}&q=${input}`
    )
      .then((a) => a.json())
      .then((d) => {
        const arr: string[] = [];

        if (d[0]) {
          d.forEach((obj: autoComplete) => {
            arr.push(obj.name);
          });
        }

        setAutocomp(arr);
      });
  }, [input]);

  return (
    <>
      <Head>
        <title>Cosimo</title>
        <meta
          name="description"
          content="Cosimo, Predict the weather and plan your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <header>
            <h1>Cosima</h1>

            <div className={styles.search}>
              <input
                placeholder={place}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <MdSearch style={{ color: "var(--accent)", fontSize: "22px" }} />
              {autocomp && autocomp[0] && input != '' && (
                <div id="search">
                  {autocomp.map((val, index) => {
                    return (
                      <button
                        className={styles.autocomp}
                        onClick={() => {
                          setInput("");
                          setPlace(val);
                          setLoc(val);
                        }}
                        value={val}
                        key={index}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </header>

          {data ? (
            <div className={styles.content}>
              <div className={styles.center}>
                <span className="icon weather">
                  {data.current.condition.text == "Sunny" ? (
                    <Weather.WiDaySunny />
                  ) : data.current.condition.text == "Clear" ? (
                    <BsFillMoonFill />
                  ) : data.current.condition.text == "Cloudy" ||
                    data.current.condition.text == "Partly cloudy" ? (
                    <Weather.WiCloudy />
                  ) : data.current.condition.text == "Overcast" ? (
                    <Weather.WiDaySunnyOvercast />
                  ) : data.current.condition.text == "Mist" ? (
                    <Weather.WiWindy />
                  ) : data.current.condition.text.includes("Thunder") ? (
                    <Weather.WiThunderstorm />
                  ) : data.current.condition.text == "Fog" ? (
                    <Weather.WiFog />
                  ) : data.current.condition.text
                      .toLowerCase()
                      .includes("rain") ? (
                    <Weather.WiRain />
                  ) : (
                    <Weather.WiDayCloudyGusts />
                  )}
                </span>
                <div style={{ display: "flex", alignItems: "baseline", flexDirection: "column" }}>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <h1>{Math.ceil(data.current.temp_c)}</h1>
                    <h3>°C</h3>{" "}
                    <div
                      className="sep"
                      style={{
                        marginTop: "12px",
                        marginLeft: "8px",
                        height: "38px",
                      }}
                    ></div>{" "}
                    <div className={styles.far}>
                      {Math.ceil(data.current.temp_f)}°F
                    </div>
                  </span>
                  <h2>{data.current.condition.text}</h2>
                </div>
              </div>

              <div className={styles.days}>
                <div style={{ opacity: 1, border: "4px solid #52576e" }}>
                  <h3>Today</h3>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <h2>{Math.ceil(data.current.temp_c)}</h2>
                    <p>°C</p>
                  </span>
                </div>

                <div>
                  <h3>Tom</h3>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <h2>
                      {Math.ceil(data.forecast.forecastday[1].day.avgtemp_c)}
                    </h2>
                    <p>°C</p>
                  </span>
                </div>

                <div style={{ opacity: 0.5 }}>
                  <h3>Next</h3>
                  <span style={{ display: "inline-flex", gap: "4px" }}>
                    <h2>
                      {Math.ceil(data.forecast.forecastday[2].day.avgtemp_c)}
                    </h2>
                    <p>°C</p>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <h1 style={{ color: "var(--accent)" }}>Loading..</h1>
          )}
        </div>
        <div className={styles.right}>
          {data ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <div className={styles.name}>
                  <h1 style={{fontSize: "1.3em"}}>{data.location.name}</h1>
                  <h3>{data.location.country}</h3>
                </div>

                <div className={styles.minmax}>
                  <div className="min">
                    <h3>Min</h3>
                    <h1>
                      {Math.ceil(data.forecast.forecastday[0].day.mintemp_c)}
                    </h1>
                  </div>
                  <div className="sep"></div>
                  <div className="max">
                    <h3>Max</h3>
                    <h1>
                      {Math.ceil(data.forecast.forecastday[0].day.maxtemp_c)}
                    </h1>
                  </div>
                </div>
              </div>

              <div className={styles.stats}>
                <div>
                  <h3>Wind</h3>
                  <span className="icon">
                    <BsArrowUpShort
                      style={{
                        transform: `rotate(${data.current.wind_degree}deg)`,
                      }}
                    />
                  </span>
                  <span className="unit">
                    <h2>{data.current.wind_kph}</h2>
                    <p>kph</p>
                  </span>
                </div>
                <div>
                  <h3>Humidity</h3>
                  <span className="icon" style={{ fontSize: "38px" }}>
                    <MdOutlineWaterDrop />
                  </span>
                  <span className="unit">
                    <h2>{data.current.humidity}</h2>
                    <p>%</p>
                  </span>
                </div>
              </div>

              <div
                className={styles.minmax}
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "auto",
                  padding: "8px 18px",
                }}
              >
                <h3>Feels like</h3>
                <span className={styles.temp}>
                  <h1>{Math.ceil(data.current.feelslike_c)}</h1>
                  <p>°C</p>
                </span>
              </div>
            </>
          ) : (
            <h1>Loading..</h1>
          )}
        </div>
      </main>
    </>
  );
}

type autoComplete = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};
