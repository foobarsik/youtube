package startup.house.youtube;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class MainModule extends ReactContextBaseJavaModule {

    public MainModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MainModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("VERSION_CODE", BuildConfig.VERSION_CODE);
        constants.put("VERSION_NAME", BuildConfig.VERSION_NAME);
        return constants;
    }
}
