package com.agentapp

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

data class LocationData(val latitude: Double, val longitude: Double)

interface ApiService {
    @POST("gps")
    fun sendLocation(@Body locationData: LocationData): Call<Void>
}
