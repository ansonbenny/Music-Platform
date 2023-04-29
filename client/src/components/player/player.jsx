import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Heart,
  Navigate,
  Pause,
  Play,
  Speaker,
  SpeakerMute,
} from "../../assets";
import song from "../../assets/song.mp3";
import "./style.scss";

const Player = () => {
  const data = {
    title: "Darkside",
    year: 2020,
    cast: [
      "Andrea Riseborough",
      "Demián Bichir",
      "John Cho",
      "Betty Gilpin",
      "Lin Shaye",
      "Jacki Weaver",
    ],
    genres: ["Horror", "Supernatural"],
    href: "Darksied",
    extract:
      "The Grudge is a 2020 American psychological supernatural horror film written and directed by Nicolas Pesce. Originally announced as a reboot of the 2004 American remake and the original 2002 Japanese horror film Ju-On: The Grudge, the film ended up taking place before and during the events of the 2004 film and its two direct sequels, and is the fourth installment in the American The Grudge film series. The film stars Andrea Riseborough, Demián Bichir, John Cho, Betty Gilpin, Lin Shaye, and Jacki Weaver, and follows a police officer who investigates several murders that are seemingly connected to a single house.",
    thumbnail:
      "data:image/jpeg;base64,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",
    thumbnail_width: 220,
    thumbnail_height: 326,
  };

  const ref = useRef({});

  const [time, setTime] = useState({
    current: `00 : 00`,
    duration: `00 : 00`,
  }); // set on redux

  const progressColor = useCallback((to) => {
    if (ref?.current?.[to]) {
      var value =
        ((ref.current[to].value - ref.current[to].min) /
          (ref.current[to].max - ref.current[to].min)) *
        100;

      ref.current[to].style.background =
        "linear-gradient(to right, #09c478 0%, #09c478 " +
        value +
        "%, #d9d9db " +
        value +
        "%, #d9d9db 100%)";
    }
  }, []);

  useLayoutEffect(() => {
    ref.current["volume"].value = ref.current["audio"].volume;
    progressColor("volume");

    ref?.current?.["audio"]?.addEventListener("timeupdate", () => {
      ref.current["seekBar"].value = ref.current["audio"].currentTime;

      var sec = ref.current["audio"].currentTime;

      sec = sec % 3600;

      var min = Math.floor(sec / 60);

      min = min >= 10 ? min : "0" + min;

      sec = Math.floor(sec % 60);

      sec = sec >= 10 ? sec : "0" + sec;

      setTime((time) => ({ ...time, current: `${min} : ${sec}` }));

      progressColor("seekBar");
    });

    ref?.current?.["audio"]?.addEventListener("durationchange", () => {
      ref.current["seekBar"].value = 0;

      ref.current["seekBar"].min = 0;

      ref.current["seekBar"].max = ref.current["audio"].duration;

      var sec = ref.current["audio"].duration;

      sec = sec % 3600;

      var min = Math.floor(sec / 60);

      min = min >= 10 ? min : "0" + min;

      sec = Math.floor(sec % 60);

      sec = sec >= 10 ? sec : "0" + sec;

      setTime((time) => ({ ...time, duration: `${min} : ${sec}` }));

      progressColor("seekBar");
    });
  }, []);

  const changeVolume = (e) => {
    ref.current["audio"].volume = e.target.value;
    progressColor("volume");
  };

  const changeTime = (e) => {
    ref.current["audio"].currentTime = e.target.value;
  };

  return (
    <div className="player">
      <div className="inner" id="sample">
        <div className="details">
          <div className="thumbnail">
            <img src={data?.thumbnail} alt="" />
          </div>

          <div className="content">
            <h4>{data?.title}</h4>
            <p>{data?.extract}</p>
          </div>

          <div className="playlist">
            <button>
              {
                // if class active color change to green, active for in playlist
              }
              <Heart width={"16px"} height={"16px"} />
            </button>
          </div>
        </div>

        <div className="audio_player">
          <div className="actions">
            <button className="prev">
              <Navigate width={"16px"} height={"16px"} />
            </button>

            {ref?.current?.["audio"]?.paused ? (
              <button
                className="play_pause"
                onClick={() => {
                  ref.current["audio"].play();
                }}
              >
                <Play width={"25px"} height={"25px"} />
              </button>
            ) : (
              <button
                className="play_pause"
                onClick={() => {
                  ref.current["audio"].pause();
                }}
              >
                <Pause width={"25px"} height={"25px"} />
              </button>
            )}

            <button className="next">
              <Navigate width={"16px"} height={"16px"} />
            </button>
          </div>

          <div className="seekBar">
            <label className="current">{time?.current}</label>
            <input
              type="range"
              step="any"
              ref={(seekBar) => {
                if (ref?.current) return (ref.current["seekBar"] = seekBar);
              }}
              onChange={changeTime}
            />
            <label className="duration">{time?.duration}</label>
          </div>
        </div>

        <div className="volume">
          {
            ref?.current?.["audio"]?.volume > 0 ? (
              <Speaker width={"16px"} height={"16px"} />
            ) : (
              <SpeakerMute width={"16px"} height={"16px"} />
            ) /*speaker volume save on cookie or localStorage */
          }

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={changeVolume}
            ref={(volume) => {
              if (ref?.current) return (ref.current["volume"] = volume);
            }}
          />
        </div>

        <audio
          src={song}
          ref={(audio) => {
            if (ref?.current) return (ref.current["audio"] = audio);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
