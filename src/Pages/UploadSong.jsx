import React, { useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import axios from 'axios'; // Import Axios for API requests

const UploadSong = () => {
  const [img, setImg] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [songFile, setSongFile] = useState(null); // Store the uploaded song file
  const [isUploading, setIsUploading] = useState(false);
  const [hash, setHash] = useState(''); // Store the IPFS hash

  // Pinata API keys
  const PINATA_API_KEY = 'd0f0ac9ac486401ded7a';
  const PINATA_API_SECRET = '7d86479b36b45afdd71eac4d4013f9ee323fc2eba9b52fac524dc4dc35b4584d';

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  // Handle song upload and get song title
  const handleSongUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSongTitle(file.name);
      setSongFile(file); // Set the uploaded song file
    }
  };

  // Function to upload song to Pinata
  const uploadToPinata = async () => {
    if (!songFile) {
      alert('Please upload a song first.');
      return;
    }

    setIsUploading(true); // Indicate the upload process

    const formData = new FormData();
    formData.append('file', songFile);

    const metadata = JSON.stringify({
      name: songTitle,
    });
    formData.append('pinataMetadata', metadata);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity', // Prevent request size limitations
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      });
      const ipfsHash = res.data.IpfsHash; // Get IPFS hash from Pinata response
      setHash(ipfsHash); // Store hash
      alert('Song uploaded successfully!');
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      alert('Failed to upload song.');
    } finally {
      setIsUploading(false); // Reset upload state
    }
  };

  const types = ['Hip-hop', 'Pop', 'Reggae', 'Afro-Beat', 'Rhumba', 'Amapiano', 'Arbantone', 'Bongo', 'Dancehall'];

  return (
    <div className="w-full h-fit p-4 flex items-center justify-center flex-col">
      <form className="md:w-1/2 sm:w-3/4 w-full shadow-2xl p-4 flex flex-col bg-white rounded-lg">
        {/* Image upload area */}
        <label htmlFor="music-banner" className="image-upload w-full h-64 mb-4 relative">
          <input
            onChange={handleImageUpload}
            hidden
            type="file"
            id="music-banner"
            accept="image/*"
          />
          <div
            id="dropView"
            className={`w-full h-full flex flex-col justify-center items-center border-dashed border-2 rounded-md p-4 bg-cover bg-center ${img ? '' : 'border-blue-600'}`}
            style={{ backgroundImage: img ? `url(${img})` : 'none' }}
          >
            {!img && (
              <>
                <BsFillCloudUploadFill className="text-6xl text-blue-100 mb-3" />
                <p className="text-blue-600 font-semibold">Drag and drop or click here to upload the music banner</p>
                <span className="text-gray-500">Click here to upload from your device</span>
              </>
            )}
          </div>
        </label>

        {/* Song file upload input */}
        <label htmlFor="music" className="w-full h-14 mb-3 flex items-center justify-center bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
          <BsFillCloudUploadFill className="text-2xl mr-2" />
          <p>Upload Audio</p>
          <input
            hidden
            className="w-full h-fit"
            type="file"
            name="music"
            id="music"
            accept="audio/*"
            onChange={handleSongUpload} // Handle song upload
          />
        </label>

        {/* Show uploaded song title */}
        {songTitle && (
          <p className="text-blue-600 font-semibold mb-3">Song Uploaded: {songTitle}</p>
        )}

        {/* Submit button to upload to Pinata */}
        <button
          type="button"
          onClick={uploadToPinata}
          disabled={isUploading}
          className={`w-full p-3 mb-3 text-white rounded-md ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isUploading ? 'Uploading...' : 'Upload Song to Pinata'}
        </button>

        {/* Display IPFS hash if available */}
        {hash && (
          <p className="text-green-600 font-semibold mb-3">Song uploaded successfully. IPFS Hash: {hash}</p>
        )}
      </form>
    </div>
  );
};

export default UploadSong;

