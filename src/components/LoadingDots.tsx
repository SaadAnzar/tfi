import styles from "../styles/loading-dots.module.css";
interface Props {
  color?: string;
  style?: "small" | "large";
}
const LoadingDots = ({ color = "#000", style = "small" }: Props) => {
  return (
    <span className={style == "small" ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;

LoadingDots.defaultProps = {
  style: "small",
};
