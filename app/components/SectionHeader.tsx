import styles from "./SectionHeader.module.css";

export default function SectionHeader({
  tag,
  tagIcon,
  title,
  subtitle,
}: {
  tag: string;
  tagIcon?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.tag}>
        {tagIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tagIcon} alt="" />
        )}
        <span>{tag}</span>
      </div>
      <div className={styles.text}>
        <h2 className="h2">{title}</h2>
        {subtitle && <p className="body-lg">{subtitle}</p>}
      </div>
    </div>
  );
}
