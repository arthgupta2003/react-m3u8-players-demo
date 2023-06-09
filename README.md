This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# React M3U8 Players Demo
Live URL: https://react-m3u8-players-demo-jdxtr1re8-arthgupta2003.vercel.app 
This is a React application that demonstrates the usage of different M3U8 players for playing HLS (HTTP Live Streaming) videos. The application allows you to enter the URL of an M3U8 asset and select a player to play the video.

## Installation

1. Clone the repository or download the source code.
2. Install the dependencies by running the following command in the project directory:

    1. `npm install --legacy-peer-deps` 
    2. `npm i react-scripts@latest --legacy-peer-deps`
    3. `npm start`

## Available Players

### hlsJS
The "hlsJS" player uses the `ReactHlsPlayer` component from the `react-hls-player` library to play the HLS video. It supports auto-play and provides controls for video playback.

### videoJS
The "videoJS" player utilizes the `VideoJSPlayer` component from the `video.js` library. It provides advanced video playback features, including auto-play, volume control, and customizable player controls.

### mediaElement
The "mediaElement" player uses the `MediaElement` component to render the video using the MediaElement.js library. It supports video playback with options for auto-play, preload, and custom player controls.

### clappr
The "clappr" player utilizes the `ClapprComponent` to play the video using the Clappr player. It supports various video formats and provides customizable playback options.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
