import React from "react";
import { MusicIcon, Play } from "../../assets";
import "./style.scss";

const Row = ({ title, data, isSingle, isRound }) => {
  return (
    <div data-for="Row">
      {title && (
        <div className="title">
          <h5>{title}</h5>
        </div>
      )}

      <div className={`grid ${isSingle && "single-row"}`}>
        {data?.map((elm, key) => {
          return (
            <div className="card" key={key}>
              <div className="thumbnail">
                {elm?.thumbnail ? (
                  <img
                    className={isRound ? "rounded" : ""}
                    src={elm?.thumbnail}
                    alt=""
                  />
                ) : (
                  <MusicIcon />
                )}
              </div>

              <div className="details">
                <h5>{elm?.title}</h5>
                <p>{elm?.extract}</p>
              </div>

              <div className="play">
                <button>
                  <Play width={"16px"} height={"16px"} color={"#333"} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Row;
