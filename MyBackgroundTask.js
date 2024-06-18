// MyBackgroundTask.js

const MyBackgroundTask = async (taskData) => {
    console.log('Executing background task:', taskData);
  
    // Implement your background task logic here
    try {
      // Simulate some async work (e.g., fetching location)
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log('Background task completed successfully');
    } catch (error) {
      console.error('Error in background task:', error);
    }
  };
  
  export default MyBackgroundTask;
  