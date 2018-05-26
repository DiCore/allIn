//
//  InterfaceController.swift
//  allInWatch Extension
//
//  Created by Svetoslav Popov on 26.05.18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import WatchKit
import Foundation
import WatchConnectivity

class InterfaceController: WKInterfaceController {
    @IBOutlet var createButton: WKInterfaceButton!
    @IBOutlet var interfaceGroup: WKInterfaceGroup!
  
  var watchSession: WCSession? {
    didSet {
      if let session = watchSession {
        session.delegate = self
      }
    }
  }
  
  
  
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
      
      if WCSession.isSupported() {
        watchSession = WCSession.default
        watchSession?.activate()
      }
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
      watchSession?.activate()
      watchSession?.sendMessage(["take":"photo"], replyHandler: { (replyDictionary) in
        if let replyMessage = replyDictionary["reply"] as? String {
          print(replyMessage)
        }
      }, errorHandler: { (error) in
        print("----------------------------------------------------------------------------------------")
        print("userDidTapCreateBUttonError")
        print(error.localizedDescription)
        print("----------------------------------------------------------------------------------------")
      })
    }
}

extension InterfaceController: WCSessionDelegate {
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    print("----------------------------------------------------------------------------------------")
    print("state: \(activationState)")
    print("Session activation did complete")
    print("-----------------------------------------------------------------------------------------")
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    print("------------------------------------------------------------------------------------------------")
    print("Did receive message: \(message)")
    print("------------------------------------------------------------------------------------------------")
  }
}
