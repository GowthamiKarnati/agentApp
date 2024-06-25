import BackgroundTimer from 'react-native-background-timer';

const MyBackgroundTask = () => {
  console.log('Executing background task:');

  // Start a timer that runs every 5 seconds
  const intervalId = BackgroundTimer.setInterval(() => {
    console.log('Task running every 5 seconds...');
    // Place your background task logic here

    // For example, you can simulate an async operation
    // await new Promise(resolve => setTimeout(resolve, 1000));
  }, 5000);

  // Return a cleanup function to stop the timer when the component unmounts or when desired
  return () => {
    BackgroundTimer.clearInterval(intervalId);
    console.log('Background task stopped.');
  };
};

export default MyBackgroundTask;
