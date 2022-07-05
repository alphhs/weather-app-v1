export const Content = ({ data, lat, long }) => {
  return (
    <div className="content">
      <div className="location">
        {data.positionName !== "0"
          ? `In ${data.positionName}:`
          : `Welcome to my weather app! Choose your current location by pressing on the current position button.`}
      </div>
      <div className="result">
        <div className="currentTemp col">
          <div>{data.currentTemp !== "0" ? `Current: ` : ""}</div>
          <div>
            {data.currentTemp !== "0" ? `${data.currentTemp} degrees` : ""}
          </div>
        </div>
        <div className="maxTemp col">
          <div>{data.description !== "0" ? `Description: ` : ""}</div>
          <div>{data.description !== "0" ? `${data.description}.` : ""}</div>
        </div>

        <div className="Feelslike col">
          <div>{data.feelsLike !== "0" ? `Feels like: ` : ""}</div>
          <div>{data.feelsLike !== "0" ? `${data.feelsLike} degrees` : ""}</div>
        </div>
      </div>
    </div>
  );
};
