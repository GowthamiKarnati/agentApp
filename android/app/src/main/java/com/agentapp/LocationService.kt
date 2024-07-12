package com.agentapp
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import androidx.core.app.NotificationCompat
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.util.Log
import com.google.android.gms.location.*
import android.app.PendingIntent
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.TimeUnit

class LocationService : Service() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private val client = OkHttpClient()
    
    
    companion object {
        private const val TAG = "LocationService"
        private const val CHANNEL_ID = "LocationServiceChannel"
        private const val NOTIFICATION_ID = 12345
    }
    private var message: String? = null
    private var workStartTime: String? = null
    private var workEndTime: String? = null
    private var weekOff: String? = null
    private var onLeave: String? = null
    private var lastKnownLocation: android.location.Location? = null
    private var hasSentImmediateLocation = false


    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "LocationService onCreate")
        hasSentImmediateLocation = false
        startForeground(NOTIFICATION_ID, createEmptyNotification())
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        requestLocationUpdates()
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "LocationService onStartCommand")
        if (intent != null && intent.hasExtra("message")) {
            message = intent.getStringExtra("message")
            workStartTime = intent.getStringExtra("workStartTime")
            workEndTime = intent.getStringExtra("workEndTime")
            weekOff = intent.getStringExtra("weekOff")
            onLeave = intent.getStringExtra("onLeave")
            Log.d(TAG, "Received message from LocationModule: $message")
            Log.d(TAG, "Received WeekOff: $weekOff ")
            Log.d(TAG, "Received OnLeave: $onLeave ")
            
            val currentDayOfWeek = SimpleDateFormat("EEEE", Locale.getDefault()).format(Date())
            if (currentDayOfWeek.equals(weekOff, ignoreCase = true)) {
                Log.d(TAG, "Today is a week off ($weekOff). Stopping the service.")
                stopSelf()
                return START_NOT_STICKY
            }
            if (onLeave.equals("yes", ignoreCase = true)) {
                Log.d(TAG, "On leave ($onLeave). Stopping the service.")
                stopSelf()
                return START_NOT_STICKY
            }
            if (!hasSentImmediateLocation) {
                lastKnownLocation?.let {
                    val latitude = it.latitude
                    val longitude = it.longitude
                   sendLocationToApi(latitude, longitude)
                    hasSentImmediateLocation = true
                }
            }
        }
        return START_STICKY
    }
    // override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    //     Log.d(TAG, "LocationService onStartCommand")
    //     if (intent != null && intent.hasExtra("message")) {
    //         message = intent.getStringExtra("message")
    //         // workStartTime = intent.getStringExtra("workStartTime")
    //         // workEndTime = intent.getStringExtra("workEndTime")
    //         requestLocationUpdates()
    //         Log.d(TAG, "Received message from LocationModule: $message")
            
    //     }
    //     return START_STICKY
    // }
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun requestLocationUpdates() {
        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                val location = locationResult.lastLocation
                lastKnownLocation = location
                val latitude = location?.latitude
                val longitude = location?.longitude
                if (latitude != null && longitude != null) {
                    Log.d(TAG, "Location received: $latitude, $longitude")
                    sendLocationToApi(latitude, longitude)
                } else {
                    Log.e(TAG, "Failed to retrieve location")
                }
            }
        }
        val locationRequest = LocationRequest.create().apply {
            interval =  10 * 60 * 1000 // 10 minutes interval
            fastestInterval = 10 * 60 * 1000 // 5 minutes interval
            priority = LocationRequest.PRIORITY_HIGH_ACCURACY
        }

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null)
    }
    private fun sendLocationToApi(latitude: Double, longitude: Double) {
        val url = "https://backendforpnf.vercel.app/gps"
        val currentTime = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(Date())
        val currentDayOfWeek = SimpleDateFormat("EEEE", Locale.getDefault()).format(Date())

        Log.d(TAG, "Current Day of Week: $currentDayOfWeek")
        Log.d(TAG, "message outside: $message")
        Log.d(TAG, "Work Start Time: $workStartTime, Work End Time: $workEndTime")

        if (workStartTime != null && workEndTime != null) {
            val currentDateTime = Calendar.getInstance()
            val formatter = SimpleDateFormat("hh:mm a", Locale.getDefault()) // Adjust the format to match input
            val startTime = formatter.parse(workStartTime)
            val endTime = formatter.parse(workEndTime)

            if (startTime != null && endTime != null) {
                val startCalendar = Calendar.getInstance().apply {
                    time = startTime
                    set(Calendar.YEAR, currentDateTime.get(Calendar.YEAR))
                    set(Calendar.MONTH, currentDateTime.get(Calendar.MONTH))
                    set(Calendar.DAY_OF_MONTH, currentDateTime.get(Calendar.DAY_OF_MONTH))
                }

                val endCalendar = Calendar.getInstance().apply {
                    time = endTime
                    set(Calendar.YEAR, currentDateTime.get(Calendar.YEAR))
                    set(Calendar.MONTH, currentDateTime.get(Calendar.MONTH))
                    set(Calendar.DAY_OF_MONTH, currentDateTime.get(Calendar.DAY_OF_MONTH))
                }

                if (currentDateTime.time.after(startCalendar.time) && currentDateTime.time.before(endCalendar.time)) {
                    val json = """
                        {
                            "latitude": $latitude,
                            "longitude": $longitude,
                            "timestamp": "$currentTime",
                            "username": "$message",
                            "day": "$currentDayOfWeek"
                        }
                    """.trimIndent()

                    val mediaType = "application/json; charset=utf-8".toMediaTypeOrNull()
                    val body = RequestBody.create(mediaType, json)
                    val request = Request.Builder()
                        .url(url)
                        .post(body)
                        .build()

                    client.newCall(request).enqueue(object : Callback {
                        override fun onFailure(call: Call, e: IOException) {
                            Log.e(TAG, "Failed to send location: ${e.message}")
                        }

                        override fun onResponse(call: Call, response: Response) {
                            if (response.isSuccessful) {
                                Log.d(TAG, "Location sent successfully: ${response.body?.string()}")
                            } else {
                                Log.e(TAG, "Failed to send location: ${response.message}")
                            }
                        }
                    })
                } else {
                    Log.d(TAG, "Current time is outside of work hours. Skipping location send.")
                }
            } else {
                Log.e(TAG, "Failed to parse work start or end time.")
            }
        } else {
            Log.e(TAG, "Work start or end time is not set.")
        }
    }


    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "LocationService onDestroy")
        fusedLocationClient.removeLocationUpdates(locationCallback)
    }

    private fun createEmptyNotification(): Notification {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            notificationIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_MUTABLE
        )

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Location Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Location Service")
            .setContentText("Tracking location in the background")
            .setSmallIcon(R.drawable.ic_launcher) //app icon
            .setContentIntent(pendingIntent)
            .build()
    }
}
