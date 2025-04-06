import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as trackService from '../../services/trackService.js';


const TrackForm = () => {
  // Get the trackId from URL parameters if it exists (for edit mode)
  const { trackId } = useParams();
  // Get the navigate function to redirect after form submission
  const navigate = useNavigate();

  // State for form data, initialized with empty values
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    coverArtUrl: ''
  });
  // State for any form submission or loading errors
  const [error, setError] = useState(null);

  // Track whether we're in edit mode or create mode
  const isEditMode = Boolean(trackId);

  // useEffect to fetch track data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchTrack = async () => {
        try {
          // Get track details using the service
          const trackData = await trackService.show(trackId);
          // Pre-fill the form with existing track data
          setFormData({
            title: trackData.title,
            artist: trackData.artist
          });
        } catch (err) {
          setError("Failed to load track data. Please try again");
        }
      };
        fetchTrack();
      }
      // Re-run this effect whenever trackId or isEditMode changes
    }, [trackId, isEditMode]);

  // Handle input changes 
  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  // Handle form submission 
  const handleSubmit = async (evt) => {
    // Prevent default form submission behavior
    evt.preventDefault();
    try {
      // If in edit mode, update the track
      if (isEditMode) {
        await trackService.update(trackId, formData);
      } else {
        // Otherwise, create a new track
        await trackService.create(formData);
      }
      // Redirect to the home page after submission
      navigate('/');
    } catch (err) {
      setError("Failed to save track. Please try again");
    }
  };

  return (
    // Container div for the entire form with a class for styling
    <div className="track-form-container">
      {/* 
      Dynamic heading that changes based on mode:
      - Shows "Edit Track" if editing an existing track
      - Shows "Add New Track" if creating a new track
    */}
      <h2>{isEditMode ? "Edit Track" : "Add New Track"}</h2>
      {/* 
      Conditional error message that only appears if there's an error
      The && operator is a short way to conditionally render elements
    */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className='track-form'>
        <div className="form-group">
        {/* htmlFor focuses the input. Without htmlFor, the label is just text — clicking it does nothing. the id must match.  */}
          <label htmlFor="title">Track Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverArtUrl">Cover Art URL:</label>
          <input
            type="text"
            id="coverArtUrl"
            name="coverArtUrl"
            value={formData.coverArtUrl}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
          />
        </div>
        <div className="form-actions">
          {/* 
          Submit button with dynamic text based on mode:
          - Shows "Update Track" if editing
          - Shows "Add Track" if creating
        */}
          <button type="submit" className="submit-btn">
            {isEditMode ? "Update Track" : "Add Track"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrackForm;