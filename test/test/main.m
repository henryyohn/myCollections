//
//  main.m
//  test
//
//  Created by henry wong on 2020/6/18.
//  Copyright © 2020 henry wong. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AppDelegate.h"



int main(int argc, char * argv[]) {
    NSString * appDelegateClassName;
    @autoreleasepool {
        // Setup code that might create autoreleased objects goes here.
        appDelegateClassName = NSStringFromClass([AppDelegate class]);
         
    }
    
    return UIApplicationMain(argc, argv, nil, appDelegateClassName);
}
