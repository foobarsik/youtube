import Foundation

@objc(MainModule)
class MainModule: NSObject {

    @objc
    func constantsToExport() -> [AnyHashable: Any]! {
        [
          "VERSION_CODE": Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as Any,
          "VERSION_NAME": Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as Any
        ]
    };

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
