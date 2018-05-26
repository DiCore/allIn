//
//  FileManager.h
//  VideoCaptureDemo
//
//  Created by Plamen Terziev on 26.05.18.
//  Copyright © 2018 AllIn. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FileManager : NSObject

- (NSURL *)tempFileURL;
- (void)removeFile:(NSURL *)outputFileURL;
- (void)copyFileToDocuments:(NSURL *)fileURL;
- (void)copyFileToCameraRoll:(NSURL *)fileURL;
@end
