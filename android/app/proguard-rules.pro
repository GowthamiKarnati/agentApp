# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
# [react-native-background-fetch]
-keep class com.transistorsoft.rnbackgroundfetch.HeadlessTask { *; }
-keep class com.transistorsoft.** { *; }
-keep class com.github.kevinsawicki.http.** { *; }
-dontwarn com.transistorsoft.**
-keep class com.facebook.react.** { *; }
-keep class com.geolocation.** { *; }
-keep class com.transistorsoft.rnbackgroundfetch.** { *; }
-keep class com.transistorsoft.tsbackgroundfetch.** { *; }


