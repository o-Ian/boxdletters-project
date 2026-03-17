import styles from './styles/Loader.module.css'

export default function Loader() {
    return (
        <div className={styles.loader_state}>
            <div className={styles.loader}></div>
        </div>
    )
}