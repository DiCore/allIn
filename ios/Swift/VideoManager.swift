//
//  VideoManager.swift
//  allIn
//
//  Created by Plamen Terziev on 27.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

import UIKit

@objc class VideoManager: NSObject {

  @objc static let sharedInstance = VideoManager()
  
  @objc func generate(withImages images: [UIImage], size: CGSize, completion: @escaping ((URL?) -> Void)) {
    let audioURL = Bundle.main.url(forResource: "audio1", withExtension: "mp3")!
    //VideoGenerator.current.maxVideoLengthInSeconds = 4
    //VideoGenerator.current.scaleWidth = size.width / size.height
    VideoGenerator.current.videoImageWidthForMultipleVideoGeneration = Int(size.width)
    VideoGenerator.current.videoImageHeightForMultipleVideoGeneration = Int(size.height)
    VideoGenerator.current.generate(withImages: images,
                                    andAudios: [audioURL],
                                    andType: .singleAudioMultipleImage,
                                    { _ in },
                                    success: { url in completion(url) },
                                    failure: { _ in completion(nil) })
  }
  
  @objc func merge(videoURLs: [URL], fileName: String, completion: @escaping ((URL?) -> Void)) {
    VideoGenerator.mergeMovies(videoURLs: videoURLs,
                               andFileName: fileName,
                               success: { url in completion(url) },
                               failure: { _ in completion(nil) })
  }
}
