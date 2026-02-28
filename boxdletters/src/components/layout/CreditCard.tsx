import styles from './styles/CreditCard.module.css'

interface CreditCardProps {
    name: string,
    character: string
}

export default function CreditCard({ name, character }: CreditCardProps) {
    return (
        <div
            className={styles.credits}
            data-tooltip-id="movie-tooltip"
            data-tooltip-content={character}
            data-tooltip-place="top"
        >
            <p>{name}</p>
        </div>
    )
}