export function SelectFilter({ datos, isOpen, onSelected }) {
  if (!isOpen) {
    return;
  }
  return (
    <div className="absolute z-40 bg-dropdown">
      <ul>
        <li
          className="selectionDrop cursor-pointer transition-colors m-1"
          value=""
          onClick={() => onSelected(null)}
        >
          <span>Ninguno</span>
        </li>
        {datos.map((d) => (
          <li
            className="selectionDrop cursor-pointer transition-colors mt-1"
            key={d.mal_id}
            onClick={() => onSelected(d.name)}
          >
            <span>{d.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
