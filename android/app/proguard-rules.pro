# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# [react-native-background-fetch]
-keep class com.transistorsoft.rnbackgroundfetch.HeadlessTask { *; }
-keep class com.transistorsoft.** { *; }
-dontwarn com.transistorsoft.**

# React Native
-keep class com.facebook.react.** { *; }

# Geolocation
-keep class com.geolocation.** { *; }

# Keep location classes
-keep class com.google.android.gms.location.** { *; }
-keep class com.google.android.gms.tasks.** { *; }
-keep class com.google.android.gms.common.api.** { *; }

# Keep location methods
-keep class android.location.Location { *; }
-keepclassmembers class android.location.Location { *; }

# Keep the Geolocation module
-keep class com.facebook.react.modules.location.** { *; }
-keepclassmembers class com.facebook.react.modules.location.** { *; }


