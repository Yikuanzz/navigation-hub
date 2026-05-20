interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function TagFilter({ allTags, selectedTags, onTagToggle }: TagFilterProps) {
  if (allTags.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      padding: '16px 24px 0',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>
      <span style={{
        fontSize: '13px',
        color: 'var(--color-muted-foreground)',
        fontWeight: 500,
        marginRight: '4px',
      }}>
        标签：
      </span>
      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            aria-pressed={isSelected}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
              background: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
              color: isSelected ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
              fontSize: '13px',
              fontWeight: isSelected ? 600 : 400,
              cursor: 'pointer',
              transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = 'var(--color-muted-foreground)';
              }
            }}
            onMouseOut={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
