# 🚀 AWS Text-to-Speech Converter

A React-based static web application that allows users to convert text to speech using Amazon Polly. The application provides an interface to select different voices and control playback speed.

## ✨ Features
- Convert text to speech using AWS Polly
- Select from multiple voice options
- Adjust playback speed
- Simple and clean UI

## 🛠 Tech Stack
- React.js
- AWS Polly
- Tailwind CSS (for styling)

## 📦 Installation

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Ankan-B10/aws-text-to-speech.git
   cd aws-text-to-speech
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000/`

## 🎧 Usage
1. Enter text in the input box.
2. Select a voice from the dropdown.
3. Adjust the speed slider if needed.
4. Click the play button to listen or the download button to save the audio.

## 🚀 Deployment
To deploy the application on AWS S3:
1. Build the project:
   ```bash
   npm run build
   ```
2. Upload the `build/` folder to an S3 bucket.
3. Enable static website hosting in S3 settings.

## 📜 License
This project is licensed under the MIT License.

## 👨‍💻 Author
Developed by [Ankan Bera](https://github.com/Ankan-B10).

