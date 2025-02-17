// // import { useState } from 'react';
// // import './App.css';
// // import Header from './components/Header';
// // import Section from './components/Section';
// // import AudioPlayer from './components/AudioPlayer';
// // import AWS from 'aws-sdk';

// // AWS.config.update({
// //   accessKeyId: process.env.REACT_APP_CLIENTID,
// //   secretAccessKey: process.env.REACT_APP_SECRETKEY,
// //   region: process.env.REACT_APP_REGION
// // })

// // const polly = new AWS.Polly();

// // function App() { 
// //   const [text, setText] = useState('');
// //   const [audioFile, setAudioFile] = useState();

// //   const convertTextToSpeech = () => {
// //     polly.synthesizeSpeech({
// //       Text: text,
// //       OutputFormat: 'mp3',
// //       VoiceId: 'Salli',
// //     },
// //     (error, data) => {
// //       if(error){
// //         console.log(error);
// //       }
// //       else{
// //         console.log(data);
// //         setAudioFile(data);
// //       }
// //     }
// //   )
// //   }

// //   return (
// //     <>
// //       <div className="container">
// //       <Header />
// //       <Section text={text} setText={setText} convertTextToSpeech={convertTextToSpeech}/>
// //       </div>
// //       <AudioPlayer audioFile={audioFile}/>
// //     </>
// //   );
// // }

// // export default App;

// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Section from './components/Section';
// import AudioPlayer from './components/AudioPlayer';
// import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_CLIENTID,
//   secretAccessKey: process.env.REACT_APP_SECRETKEY,
//   region: process.env.REACT_APP_REGION
// });

// const polly = new AWS.Polly();

// function App() { 
//   const [text, setText] = useState('');
//   const [audioFile, setAudioFile] = useState(null);
//   const [voice, setVoice] = useState('Joanna'); // Default Polly voice

//   // const convertTextToSpeech = () => {
//   //   if (!text.trim()) return;

//   //   polly.synthesizeSpeech(
//   //     {
//   //       Text: text,
//   //       OutputFormat: 'mp3',
//   //       VoiceId: voice, // Use selected voice
//   //     },
//   //     (error, data) => {
//   //       if (error) {
//   //         console.error("Error generating speech:", error);
//   //       } else {
//   //         const blob = new Blob([data.AudioStream], { type: "audio/mp3" });
//   //         const url = URL.createObjectURL(blob);
//   //         setAudioFile(url);
//   //       }
//   //     }
//   //   );
//   // };
  
//   const convertTextToSpeech = () => {
//     polly.synthesizeSpeech(
//       {
//         Text: text,
//         OutputFormat: 'mp3',
//         VoiceId: selectedVoice,
//       },
//       (error, data) => {
//         if (error) {
//           console.error("Polly Error:", error);
//         } else {
//           if (data && data.AudioStream) {
//             setAudioFile(data);
//           } else {
//             console.error("AudioStream is undefined.");
//           }
//         }
//       }
//     );
//   };
  

//   return (
//     <>
//       <div className="container">
//         <Header />
//         <Section 
//           text={text} 
//           setText={setText} 
//           convertTextToSpeech={convertTextToSpeech} 
//           voice={voice} 
//           setVoice={setVoice} 
//         />
//       </div>
//       <AudioPlayer audioFile={audioFile} />
//     </>
//   );
// }

// export default App;


import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Section from './components/Section';
import AudioPlayer from './components/AudioPlayer';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_CLIENTID,
  secretAccessKey: process.env.REACT_APP_SECRETKEY,
  region: process.env.REACT_APP_REGION
})

const polly = new AWS.Polly();

function App() {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState();
  const [selectedVoice, setSelectedVoice] = useState('Salli'); // State for selected voice

  const convertTextToSpeech = () => {
    polly.synthesizeSpeech(
      {
        Text: text,
        OutputFormat: 'mp3',
        VoiceId: selectedVoice, // Use selectedVoice here
      },
      (error, data) => {
        if (error) {
          console.log("Polly Error:", error);
        } else {
          if (data && data.AudioStream) {
            setAudioFile(data);
          } else {
            console.error("AudioStream is undefined.");
          }
        }
      }
    );
  };

  return (
    <>
      <div className="container">
        <Header />
        <Section 
          text={text} 
          setText={setText} 
          convertTextToSpeech={convertTextToSpeech} 
          selectedVoice={selectedVoice} 
          setSelectedVoice={setSelectedVoice}  // Pass function to update selectedVoice
        />
      </div>
      <AudioPlayer audioFile={audioFile} />
    </>
  );
}

export default App;
