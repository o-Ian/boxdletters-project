import styles from './styles/CreditCard.module.css'

interface CreditCardProps {
    name: string,
    character?: string
    department?: string
}

export default function CreditCard({ name, character, department }: CreditCardProps) {
    return (
        <div
            className={styles.credits}
            data-tooltip-id="movie-tooltip"
            data-tooltip-content={character || department}
            data-tooltip-place="top"
        >
            <p>{name}</p>
        </div>
    )
}