import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.view.accessibility.AccessibilityEvent

class RemoteService : AccessibilityService() {

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {}
    override fun onInterrupt() {}

    // Dashboard se aaye X, Y Coordinates par screen click karega
    fun dispatchTap(xRatio: Float, yRatio: Float) {
        val metrics = resources.displayMetrics
        val realX = xRatio * metrics.widthPixels
        val realY = yRatio * metrics.heightPixels

        val clickPath = Path().apply {
            moveTo(realX, realY)
        }

        val gestureBuilder = GestureDescription.Builder().apply {
            addStroke(GestureDescription.StrokeDescription(clickPath, 0, 50))
        }

        dispatchGesture(gestureBuilder.build(), null, null)
    }
}
