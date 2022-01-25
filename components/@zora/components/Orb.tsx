import { css } from "@emotion/css";

type OrbProps = {
  size?: number | string
}

const DEFAULT_ORB_BACKGROUND_GRADIENT = `radial-gradient(
  75.29% 75.29% at 64.96% 24.36%,
  #dcc8d0 15.62%,
  #78c8cf 30.21%,
  #4d959e 42.71%,
  #305eb9 55.73%,
  #311f12 79.69%,
  #684232 90.62%,
  #2d1c13 100%
);`


export const Orb = ({
  size = '100%',
}: OrbProps) => {
  return (
    <div
      className={css`
        display: block;
        height: ${size};
        width: ${size};
        background: ${DEFAULT_ORB_BACKGROUND_GRADIENT};
        border-radius: 1500px;
      `}
    />
  )
}
