// package com.agentapp
// import android.util.Log
// import android.widget.Toast
// import com.facebook.react.bridge.ReactApplicationContext
// import com.facebook.react.bridge.ReactContextBaseJavaModule
// import com.facebook.react.bridge.ReactMethod

// class LocationModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//    companion object {
//         private const val TAG = "LocationModule"
//    }
//     override fun getName(): String {
//         return "LocationModule" // This is how the module will be identified in JavaScript
//     }

//     @ReactMethod
//     fun showToast(message: String) {
//         Log.d(TAG, message)
        
//         Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
//         val intent = Intent(reactContext, LocationService::class.java)
//         intent.putExtra("message", message)
//         reactContext.startService(intent)
//     }
// }
package com.agentapp

import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LocationModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private const val TAG = "LocationModule"
    }

    override fun getName(): String {
        return "LocationModule" // This is how the module will be identified in JavaScript
    }

    @ReactMethod
    fun showToast(message: String, workStartTime: String, workEndTime: String, weekOff: String, onLeave: String) {
        Log.d(TAG, "Message: $message, Work Start Time: $workStartTime, Work End Time: $workEndTime, WeekOff: $weekOff, Leave: $onLeave ")


        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()

        // Start LocationService with the message
        val intent = Intent(reactContext, LocationService::class.java)
        intent.putExtra("message", message)
        intent.putExtra("workStartTime", workStartTime)
        intent.putExtra("workEndTime", workEndTime)
        intent.putExtra("weekOff", weekOff)
        intent.putExtra("onLeave", onLeave)

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            reactContext.startForegroundService(intent)
        } else {
            reactContext.startService(intent)
        }
    }
}
