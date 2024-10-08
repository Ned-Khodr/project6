export function Track(props) {
  const { id, name, artist, album, uri, trackFunction } = props

  const handleClick = () => {
    trackFunction(props)
  }

  const symbol = trackFunction.name === "addTrack" ? "+" : "-"

  return (
    <div>
      <li>
        <button onClick={handleClick}>{symbol}</button>
        <h3>{name}</h3>
        <h5>{artist} | {album}</h5>
      </li>
    </div>
  )
} 