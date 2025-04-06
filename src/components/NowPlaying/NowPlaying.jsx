
const NowPlaying = ({ track }) => {
  return (
    <div className="now-playing">
      <h2>Now Playing:</h2>
      <div className="now-playing-details">
        <p><span className="title-label">Title:</span> {track.title}</p>
        <p><span className="artist-label">Artist:</span> {track.artist}</p>
      </div>
    </div>
  );
}

export default NowPlaying;