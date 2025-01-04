@echo off
rem This file is a batch script for running Maven commands on Windows.

setlocal

set MAVEN_HOME=%~dp0\.mvn\wrapper\maven-wrapper.jar
set MAVEN_OPTS=-Xmx512m

if not exist "%MAVEN_HOME%" (
    echo Maven wrapper not found. Please ensure that the .mvn directory is present.
    exit /b 1
)

java -cp "%MAVEN_HOME%" org.apache.maven.wrapper.MavenWrapperMain %*