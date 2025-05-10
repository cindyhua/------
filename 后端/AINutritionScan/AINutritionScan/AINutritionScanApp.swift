//
//  AINutritionScanApp.swift
//  AINutritionScan
//
//  Created by Xin Hua on 2025/5/9.
//

import SwiftUI

@main
struct AINutritionScanApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
