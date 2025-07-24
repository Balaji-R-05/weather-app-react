import Weather from './components/Weather'
import Chatbot from './components/Chatbot';

const App = () => {
  return (
    <div className='app'>
      <Weather/>
      {/* <Chatbot weatherData={weatherData} /> */}
    </div>
  )
}

export default App;