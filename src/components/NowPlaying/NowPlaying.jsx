
const NowPlaying = ({ track }) => {
  return (
    <div className="now-playing">
  <h2>Now Playing:</h2>
  {/* 
    Check if track.coverArtUrl exists before trying to render the image.
    This prevents rendering a broken <img> tag if no image URL is provided.
  */}
  {track.coverArtUrl && (
    <div className="now-playing-cover">
      <img 
        src={track.coverArtUrl} 
        alt={`${track.title} cover`}
        // Fallback image if the original can't be loaded
        onError={(e) => {e.target.src = 'public/No-album-art.png'}}
      />
    </div>
  )}
  <div className="now-playing-details">
    <p><span className="title-label">Title:</span> {track.title}</p>
    <p><span className="artist-label">Artist:</span> {track.artist}</p>
  </div>
</div>
  );
};

export default NowPlaying;