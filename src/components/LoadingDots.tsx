import styles from '../styles/loading-dots.module.css'
interface Props {
  color?: string
  style?: 'small' | 'large'
}
const LoadingDots = ({ color, style }: Props) => {
  return (
    <span className={style == 'small' ? styles.loading2 : styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  )
}

export default LoadingDots
