adb shell am start -a android.intent.action.SENDTO -d sms:$1 --es sms_body $2
adb shell "input keyevent 22 && input keyevent 22 && input keyevent 66"

#adb shell input keyevent 22
#adb shell input keyevent 22
#adb shell input keyevent 66
