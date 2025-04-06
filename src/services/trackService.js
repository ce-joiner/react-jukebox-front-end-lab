const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;


// INDEX 

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error('Error fetching tracks:', err);
        throw err; // Re-throw the error so components can handle it (show err message to users etc)
    }
};


// CREATE - ADD A TRACK

const create = async (trackData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error('Error creating track:', err);
        throw err; 
    }
};


// SHOW - FETCH A TRACK BY ID 

const show = async (trackId) => {
    try {
        const res = await fetch(`${BASE_URL}/${trackId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error('Error fetching track:', err);
        throw err; 
    }
};


// UPDATE - EDIT A TRACK 

const update = async (id, trackData) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error('Error updating track:', err);
        throw err; 
    }
};


// DELETE - DELETE A TRACK 


const deleteTrack = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return true; // Just signals successful completion
    } catch (err) {
        console.error('Error deleting track:', err);
        throw err; 
    }
};


export { index, create, show, update, deleteTrack };