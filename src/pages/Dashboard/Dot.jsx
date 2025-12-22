export default function Dot(props) {
  const { cx, cy, stroke, fill } = props;
  return <circle cx={cx} cy={cy} r={5} fill={fill} stroke="white" strokeWidth={2} />;
}
