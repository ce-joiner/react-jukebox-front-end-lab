import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import * as trackService from '../../services/trackService.js';


const TrackList = ({ onPlay }) => {
    // State to store the tracks from the database
    const [tracks, setTracks] = useState([]);
    // State to store the loading status
    const [isLoading, setIsLoading] = useState(true);
    // State to store any error messages
    const [error, setError] = useState(null);

    // useEffect hook to fetch tracks when component mounts
    useEffect(() => {
        // Define async function to fetch tracks
        const fetchTracks = async () => {
            try {
                // Call the index method from our track service
                const data = await trackService.index();
                // Update tracks state with the fetched data
                setTracks(data);
            } catch (err) {
                // If there's an error, update error state
                setError(err.message);
            } finally {
                // Whether successful or not, we're no longer loading
                setIsLoading(false);
            }
        };
        // Call the fetch function
        fetchTracks();
    }, []); // Empty dependency array means this runs once when the component mounts

    const handleDelete = async (trackId) => {
        try {
            // Call the delete method from our track service
            await trackService.deleteTrack(trackId);
            // Update state to remove the deleted track
            // This avoids having to fetch all tracks again
            setTracks(tracks.filter(track => track._id !== trackId));

        } catch (err) {
            // Update error state if deletion fails
            setError(err.message);
        }
    };
    // Show loading state while fetching data
    if (isLoading) return <p>Loading tracks...</p>;
    // Show message if no tracks available
    if (tracks.length === 0) return <p>No tracks available</p>;

    // Render the track list when data is loaded successfully
    return (
        // Container for the entire track list section
        <div className="track-list">
            <h2>Track List</h2>

            {/* Grid container to layout the individual track items */}
            <div className="tracks-grid">

                {/* If there are no tracks, show a message */}
                {tracks.length === 0 ? (
                    <p>No tracks available</p>
                ) : (
                    // Otherwise, map over the tracks array and render each track
                    tracks.map(track => (
                        // Each track gets its own item block; use a unique key for React's reconciliation
                        <div key={track._id} className="track-item">
                            {/* Add cover art here */}
                            {track.coverArtUrl && (
                                <div className="track-cover">
                                    <img
                                        src={track.coverArtUrl}
                                        alt={`${track.title} cover`}
                                        // Fallback image if the original can't be loaded
                                        onError={(e) => { e.target.src = 'public/No-album-art.png' }}
                                    />
                                </div>
                            )}

                            {/* Section for displaying the track's title and artist */}
                            <div className="track-info">
                                <p className="track-title">
                                    {/* Track title */}
                                    {track.title}
                                    {/* "by" text in its own span for styling */}
                                    <span className="by-text"> by </span>
                                    {/* Artist name in a styled span */}
                                    <span className="artist-name">{track.artist}</span>
                                </p>
                            </div>

                            {/* Section for the action buttons: play, edit, delete */}
                            <div className="track-buttons">

                                {/* Play button - calls the onPlay function passed from the parent */}
                                <button
                                    className="play-btn"
                                    onClick={() => onPlay(track)}
                                >
                                    Play
                                </button>

                                {/* Edit button - uses React Router's Link to avoid full page reload */}
                                <Link to={`/edit-track/${track._id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>

                                {/* Delete button - calls the local handleDelete function */}
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(track._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrackList;