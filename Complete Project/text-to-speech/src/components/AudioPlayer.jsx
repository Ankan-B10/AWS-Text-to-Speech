// import { useEffect, useRef, useState  } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
// import { BsPauseCircleFill } from "react-icons/bs";
// import { MdDownloadForOffline } from "react-icons/md";


// const AudioPlayer = ({ audioFile }) => {
//     const [isPlaying, setisPlaying] = useState(false); 
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);

//     const [playbackSpeed, setPlaybackSpeed] = useState(1); // Default speed

//     const audioRef = useRef();
//     const progressBarRef = useRef();

//     // useEffect(() => {
//     //     if(audioFile){
//     //         const audioArrayBuffer = audioFile.AudioStream.buffer;
//     //         const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg"}));
            
//     //         const audio = audioRef.current;
//     //         audio.src = audioURL;

//     //         audio.addEventListener('loaddata', () => {
//     //             setDuration(audio.duration);
//     //         })

//     //         audio.addEventListener('timeupdate', updateProgressBar);

//     //         return () => {
//     //             URL.revokeObjectURL(audioURL);
//     //         }
//     //     }
//     // }, [audioFile])
//     useEffect(() => {
//         if (audioFile?.AudioStream) {
//           try {
//             const audioArrayBuffer = audioFile.AudioStream.buffer;
//             const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));
      
//             const audio = audioRef.current;
//             audio.src = audioURL;
      
//             audio.addEventListener("loadedmetadata", () => {
//               setDuration(audio.duration);
//             });
      
//             audio.addEventListener("timeupdate", updateProgressBar);
      
//             return () => {
//               URL.revokeObjectURL(audioURL);
//             };
//           } catch (error) {
//             console.error("Error processing AudioStream:", error);
//           }
//         }
//       }, [audioFile]);
      

//     useEffect(() => {
//         if (audioFile) {
//             const audio = audioRef.current;
//             audio.src = audioFile;
//             audio.playbackRate = playbackSpeed; // Apply speed change
//         }
//     }, [audioFile, playbackSpeed]);
    

//     const updateProgressBar = () => {
//         const audio = audioRef.current;
//         const progress = (audio.currentTime / audio.duration) * 100;

//         setCurrentTime(audio.currentTime);
//         progressBarRef.current.style.width = `${progress}%`
//     }

//     const togglePlay = () =>{
//         const audio = audioRef.current;
//         if(isPlaying){
//            audio.pause(); 
//         }
//         else{
//             audio.play();
//         }
//         setisPlaying(!isPlaying);
//     }

//     // how to download
//     const downloadAudio = () =>{
//         if(audioFile){
//             const audioArrayBuffer = audioFile.AudioStream.buffer;
//             const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], {type: "audio/mpeg"}));
            
//            const a = document.createElement('a');
//            a.href = audioURL;

//            a.download = "audio.mp3";
//            a.style.display = "none";
//            document.body.appendChild(a);

//            a.click();

//            document.body.removeChild(a);
//            URL.revokeObjectURL(audioURL);
//         }
//     }

// //     return (
// //         <div className="audio-container">
// //            <audio ref={audioRef}/> 
// //            {/* ref fetch the dom element */}
// //            <div className="progress-container">
// //                 <div
// //                     ref={progressBarRef}
// //                     className="progress-bar"
// //                     style={{width: `${(currentTime / duration) * 100}%`}}
// //                 />
// //            </div>
// //            <div>
// //             <button className="audio-button" disabled={!audioFile}
// //                     onClick={ ()=> togglePlay()}
// //             >
// //                 {
// //                     isPlaying ? <BsPauseCircleFill className="icon-btn"/> : 
// //                     <AiFillPlayCircle className="icon-btn"/>
// //                 }
// //             </button>
// //             <button className="audio-button" 
// //                 disabled={!audioFile}
// //                 onClick={() => downloadAudio()}>
// //                  <MdDownloadForOffline className="icon-btn"/>
// //             </button>
// //            </div>
// //         </div>
// //     )
// // }

// return (
//     <div className="audio-container">
//        <audio ref={audioRef}/> 
//        <div className="progress-container">
//             <div
//                 ref={progressBarRef}
//                 className="progress-bar"
//                 style={{width: `${(currentTime / duration) * 100}%`}}
//             />
//        </div>
//        <div>
//             <button className="audio-button" disabled={!audioFile} onClick={togglePlay}>
//                 {isPlaying ? <BsPauseCircleFill className="icon-btn"/> : <AiFillPlayCircle className="icon-btn"/>}
//             </button>
//             <button className="audio-button" disabled={!audioFile} onClick={downloadAudio}>
//                  <MdDownloadForOffline className="icon-btn"/>
//             </button>
//        </div>
//        <div className="speed-control">
//             <label>Speed: </label>
//             <input 
//                 type="range" 
//                 min="0.5" max="2" step="0.1" 
//                 value={playbackSpeed} 
//                 onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))} 
//             />
//             <span>{playbackSpeed}x</span>
//        </div>
//     </div>
//     );
// }

// export default AudioPlayer;

import { useEffect, useRef, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsPauseCircleFill } from "react-icons/bs";
import { MdDownloadForOffline } from "react-icons/md";

const AudioPlayer = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1); // Speed state for controlling the audio speed

  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    if (audioFile?.AudioStream) {
      try {
        const audioArrayBuffer = audioFile.AudioStream.buffer;
        const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));

        const audio = audioRef.current;
        audio.src = audioURL;

        audio.addEventListener("loadedmetadata", () => {
          setDuration(audio.duration);
        });

        audio.addEventListener("timeupdate", updateProgressBar);

        return () => {
          URL.revokeObjectURL(audioURL);
        };
      } catch (error) {
        console.error("Error processing AudioStream:", error);
      }
    }
  }, [audioFile]);

  const updateProgressBar = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;

    setCurrentTime(audio.currentTime);
    progressBarRef.current.style.width = `${progress}%`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause(); 
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (audioFile) {
      const audioArrayBuffer = audioFile.AudioStream.buffer;
      const audioURL = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));

      const a = document.createElement("a");
      a.href = audioURL;
      a.download = "audio.mp3";
      a.style.display = "none";
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(audioURL);
    }
  };

  // Update the speed of the audio playback
  const handleSpeedChange = (event) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    const audio = audioRef.current;
    audio.playbackRate = newSpeed; // Change playback speed
  };

  return (
    <div className="audio-container">
      <audio ref={audioRef} />
      <div className="progress-container">
        <div
          ref={progressBarRef}
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <div>
        <button 
          className="audio-button" 
          disabled={!audioFile} 
          onClick={() => togglePlay()}
        >
          {isPlaying ? <BsPauseCircleFill className="icon-btn" /> : <AiFillPlayCircle className="icon-btn" />}
        </button>
        <button 
          className="audio-button" 
          disabled={!audioFile} 
          onClick={() => downloadAudio()}
        >
          <MdDownloadForOffline className="icon-btn" />
        </button>
      </div>
      <div className="speed-container">
        <label htmlFor="speed">Speed:</label>
        <input 
          type="range" 
          id="speed" 
          min="0.5" 
          max="2" 
          step="0.1" 
          value={speed} 
          onChange={handleSpeedChange} 
        />
        <span>{speed}x</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
