import { useState } from 'react';
import { Link } from 'react-router';
import TrackList from '../TrackList/TrackList.jsx';
import NowPlaying from '../NowPlaying/NowPlaying.jsx';



const Home = () => {
  // State to keep track of which track is currently playing
  // Initially set to null when no track is playing
  const [currentTrack, setCurrentTrack] = useState(null);

  // This function will be passed to the TrackList component
  // It will be called when a user clicks a Play button on a track
  const handlePlayTrack = (track) => {
    setCurrentTrack(track); // Update the state with the selected track
  };


  return (
    <div className="home">
      <div className="header">
        {/* Link component creates a client-side navigation to the add-track route */}
        <Link to="/add-track">
          <button className="add-track-btn">Add Track</button>
        </Link>
      </div>

      {/* Title for the track list section */}
      {/* <h2>Track List</h2> */}
      {/* 
        TrackList component to display all tracks.
        pass the handlePlay function as a prop so TrackList can call it
        when a Play button is clicked
      */}
      <TrackList onPlay={handlePlayTrack} />
      {/* 
        Conditional rendering for the NowPlaying component
        It will only be shown if currentTrack is not null.
        pass the current track data as a prop to the NowPlaying component
      */}
      {currentTrack && (<NowPlaying track={currentTrack} />)}
    </div>
  );
}




export default Home;