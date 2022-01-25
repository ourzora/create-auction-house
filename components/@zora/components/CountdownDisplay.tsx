import { useCallback, useEffect, useState, Fragment } from "react";

export type CountdownDisplayProps = {
  from?: number | string;
  to: number | string;
};

function getNumber(time: number | string) {
  if (typeof time === "string") {
    return parseInt(time, 10);
  }
  return time;
}

export const TimeDisplayMap = {
  d: "day",
  h: "hour",
  m: "minute",
  s: "second",
};

export const splitDurationSegments = (difference: number) => ({
  d: Math.floor(difference / (3600 * 24)),
  h: Math.floor(difference / 3600) % 24,
  m: Math.floor((difference / 60) % 60),
  s: Math.floor(difference % 60),
});

const getTimeLeft = (to: number, from?: number) => {
  if (from === undefined) {
    return null;
  }
  let difference = to - from;

  if (difference < 0) {
    difference = 0;
  }

  return splitDurationSegments(difference);
};

export const DurationDisplay = ({ duration }: { duration: number }) => {
  const renderSegmentText = (
    segmentName: keyof typeof splitDurationSegments,
    segmentValue: number
  ) => {
    if (segmentValue === 0) {
      return "";
    }
    if (segmentValue === 1) {
      return `${segmentValue} ${TimeDisplayMap[segmentName]}`;
    }
    return `${segmentValue} ${TimeDisplayMap[segmentName]}s`;
  };
  const durationSegments = splitDurationSegments(duration);
  const singleSegment = Object.values(durationSegments)
    .map((segment) => segment === 0)
    .reduce((last, now) => last + (now ? 0 : 1), 0);
  if (singleSegment <= 1) {
    return (
      <Fragment>
        {Object.keys(durationSegments)
          .map((segment: string) =>
            // @ts-ignore: ignoring due to key type erasure with string
            renderSegmentText(segment, durationSegments[segment])
          )
          .join("")}
      </Fragment>
    );
  }
  return <CountdownDisplay from={0} to={duration} />;
};

export const CountdownDisplay = (props: CountdownDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
  } | null>(
    getTimeLeft(
      getNumber(props.to),
      getNumber(
        props.from === undefined ? new Date().getTime() / 1000 : props.from
      )
    )
  );
  const updateTimeLeft = useCallback(() => {
    setTimeLeft(
      getTimeLeft(
        getNumber(props.to),
        getNumber(
          props.from === undefined ? new Date().getTime() / 1000 : props.from
        )
      )
    );
  }, [props.to, props.from]);

  useEffect(() => {
    const checkTimeout = setInterval(updateTimeLeft, 1000);
    return () => {
      clearInterval(checkTimeout);
    };
  }, []);

  if (!timeLeft) {
    return <Fragment />;
  }

  const timeString = [
    [timeLeft.d, "d"],
    [timeLeft.h, "h"],
    [timeLeft.m, "m"],
    [timeLeft.s, "s"],
  ]
    .filter((n) => n !== null)
    .reduce((lastString, [number, postfix]) => {
      if (!lastString.length && number === 0) {
        return "";
      }
      return `${lastString} ${number}${postfix}`;
    }, "");
  return <Fragment>{timeString || "0s"}</Fragment>;
};
