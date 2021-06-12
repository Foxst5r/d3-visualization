export const Eyes = ({ eyeOffsetX, eyeOffsetY, eyeRadius }) => (
  <>
    <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
    <circle cx={+eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}></circle>
  </>
);
