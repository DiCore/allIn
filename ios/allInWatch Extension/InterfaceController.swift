//
//  InterfaceController.swift
//  allInWatch Extension
//
//  Created by Svetoslav Popov on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {
    @IBOutlet var createButton: WKInterfaceButton!
    @IBOutlet var interfaceGroup: WKInterfaceGroup!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
    }
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }

    @IBAction func userDidTapCreateButton() {
        print("Create button tapped!")
    }
}
