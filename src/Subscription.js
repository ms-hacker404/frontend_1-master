
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './main.css';
// import { getUser, resetUserSession } from './service/AuthService';
// import { useNavigate } from "react-router-dom";

// const Subscription = () => {
//   const [musicData, setMusicData] = useState([]);
//   const apiurl = 'https://nkllwgqs55.execute-api.us-east-1.amazonaws.com/prod/tabledisplay';
//   const xapikey = 'VVhDoss8cgat9dH6EypO93Z2JENti8gK3eNUP07g';

  // const navigate = useNavigate(); 
  // const user = getUser();
  // console.log(user)
  // const user_name = user !== 'undefined' && user ? user.user_name : '';
  

  // const logoutHandler = () => {
  //     resetUserSession();
  //     navigate('/login');
  // }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(apiurl, { headers: { 'x-api-key': xapikey } });
//         console.log(response.data);
//         setMusicData(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
    // <div>
    // <section class="hero">
    // <div class="intro-text">
    //   <h1>
    //     <span class="hear">Hello {user_name}! You have been logged in successfully </span> <br />
    //     <span class="connecting">  Welcome to your Subscriptions </span>
    //   </h1>
    //   <input type="button" class="btn red" value="Logout" onClick={logoutHandler} />
    // </div>
//   </section>
//       <h1>Music Table</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Artist</th>
//             <th>Year</th>
//           </tr>
//         </thead>
//         <tbody>
//           {musicData.map((music, index) => (
//             <tr key={index}>
//               <td>{music.title}</td>
//               <td>{music.artist}</td>
//               <td>{music.year}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Subscription;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './subcription.css';
import { getUser, resetUserSession } from './service/AuthService';
import { useNavigate } from "react-router-dom";

function Subscription() {
  const [musicData, setMusicData] = useState([]);
  const [artistImageURLs, setArtistImageURLs] = useState({});
  const apiurl = 'https://nkllwgqs55.execute-api.us-east-1.amazonaws.com/prod/tabledisplay';
  const xapikey = 'VVhDoss8cgat9dH6EypO93Z2JENti8gK3eNUP07g';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl, { headers: { 'x-api-key': xapikey } });

        const modifiedData = response.data.map(item => ({ ...item, url: '' }));
        console.log(modifiedData)
        setMusicData(modifiedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(true);

  const getArtistUrl = async (artist) => {
    const url = `https://mymusicbucket-s3874546.s3.amazonaws.com/${artist}.jpg`; // Replace with your S3 bucket URL
    try {
      console.log(`Fetching image for artist ${artist} from URL ${url}`);
      const response = await axios.get(url);
      console.log(`Response:`, response);
      if (response.status === 200) {
        const imageData = { ...response.data, url: url };
        return { artist, url: imageData.url };
      } else {
        return { artist, url: '' };
      }
    } catch (error) {
      console.log(error);
      return { artist, url: '' };
    }
  };
  
  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
  }

  const navigate = useNavigate(); 
  const user = getUser();
  console.log(user)
  const user_name = user !== 'undefined' && user ? user.user_name : '';

  const handleRemoveClick = (id) => {
    const url = `https://nkllwgqs55.execute-api.us-east-1.amazonaws.com/prod/removemusic?id=${id}`;
    axios.post(url)
      .then(res => {
        console.log(res.data);
        axios.get(apiurl, { headers: { 'x-api-key': xapikey } })
          .then(res => {
            setMusicData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getImages = async () => {
      const imageURLs = {};
      for (const item of musicData) {
        const { artist, url } = await getArtistUrl(item.artist);
        imageURLs[artist] = url;
      }
      console.log(imageURLs)
      setArtistImageURLs(imageURLs);
      setLoading(false);
    };
    getImages();
  }, [musicData]);

  return (
    <div class="contentsub">
        <div class="intro-text">
          <h1>
            <span class="hear">Hello {user_name}! You have been logged in successfully </span> <br />
            <span class="connecting">  Welcome to your Subscriptions </span>
          </h1>
          <input type="button" class="btn red" value="Logout" onClick={logoutHandler} />
        </div>
      <h1>My Music List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Image</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {musicData.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.artist}</td>
              <td>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <img src={artistImageURLs[item.artist]} alt={item.artist} />
                )}
              </td>
              <td><button onClick={() => handleRemoveClick(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
  )

}

export default Subscription;