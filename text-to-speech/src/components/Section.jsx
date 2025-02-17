import '../App.css';


const Section = ({ text, setText, convertTextToSpeech, selectedVoice, setSelectedVoice }) => {
    return (
      <div className='section-container'>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter your text here . . .'
        />
        <select 
          className="voice-selector" 
          value={selectedVoice} 
          onChange={(e) => setSelectedVoice(e.target.value)}  // Update selectedVoice on change
        >
          <option value="Salli">Salli</option>
          <option value="Joanna">Joanna</option>
          <option value="Matthew">Matthew</option>
          <option value="Kendra">Kendra</option>
          {/* Add more voices as needed */}
        </select>
        <button
          className='btn-convert'
          onClick={() => convertTextToSpeech()}
        >
          Convert to Speech
        </button>
      </div>
    );
  };
  
  export default Section;
  