# **3R MOBILE APP** 
# Requeriments
- [Node.js](https://nodejs.org/es/download/) Last version available (includes npm) 
- [JDK Java](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html) v 18.0.1.1
- [Gradle](https://gradle.org/releases/) v 7.4.2 , **binary-only**


# General configuration
- Install [Android Studio](https://developer.android.com/studio) 
- In Android Studios download Android SDK : **Android 11 (R)** 
![android_sdk](https://user-images.githubusercontent.com/62682469/177942181-a5db1aad-8f6f-4397-884d-e45ee483d440.jpeg)

- Install [Apache Cordova](https://cordova.apache.org/docs/en/latest/) running the command in Windows Terminal  

```
      npm install cordova -g
  ```

- Add **ANDROID_HOME** , **ANDROID_SDK_ROOT** Y **JAVA_HOME** to Enviroment Variables in Windows System Properties 
![enviroment_variable](https://user-images.githubusercontent.com/62682469/177941816-9089751f-3f86-4dd0-a8e2-d4741faec2c1.jpeg)

- Create a new directory name **"Gradle"** in local disk C 
![directory_c](https://user-images.githubusercontent.com/62682469/177944354-e445f3c2-df3d-474b-b512-1dc7928b3f75.jpeg)

- Download zip file from [Gradle](https://gradle.org/releases/) v 7.4.2 , **binary-only**
- Inside "Gradle" new directory extract files from the zip file just downloaded 
- Edit variable **Path** from Enviroment Variables in Windows System Properties adding path 


```
      C:\Gradle\gradle-7.4.2\bin 
  ```
![bin_edit](https://user-images.githubusercontent.com/62682469/177942390-c1954d90-fa0d-44aa-be67-89aba5ef0d09.jpeg)

# Running APP
- Clone this repository and run the command in Windows Terminal to change directory 
```
      cd "3R MOBILE"
  ```
 - Run next commands in Windows Terminal 
```
      npm init
  ```
  
```
     npm i rimraf 
  ```

```
     cordova platform add android 
  ```
 
 ```
     cordova build android
  ```

 - This next command is the responsable of creating android APK file 
 ```
     cordova build android
  ```
