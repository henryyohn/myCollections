参考：https://codeday.me/bug/20170814/53244.html


我有点困惑，如何利用新的iOS 7 NSURLSession背景传输功能和AFNetworking 2.0。
我看到WWDC 705 – 基础网络会话的新增功能，他们演示了后的应用程序终止，甚至崩溃后继续下载。

这是使用新的API应用程序：handleEventsForBackgroundURLSession：completionHandler：事实，会话的委托将最终获得回调，并可以完成其任务。

所以我想知道如何使用它与AFNetworking 2.0(如果可能)继续下载在后台。

问题是，AFNetworking 2.0方便地使用基于块的API来执行所有请求，但是如果应用程序终止或崩溃，那些块也消失了。那么我该如何完成任务呢？

或者我可能在这里缺少的东西…

让我解释一下我的意思

例如我的应用程序是一个照片消息应用程序，让我说一个PhotoMessage对象，表示一个消息，这个对象有属性
状态 – 描述照片下载的状态。
resourcePath – 最终下载的照片文件的路径。

所以当我从服务器得到一个新的消息，我创建一个新的PhotoMessage对象，并开始下载其照片资源。
```object-c
 PhotoMessage *newPhotoMsg = [[PhotoMessage alloc] initWithInfoFromServer:info];
 newPhotoMsg.state = kStateDownloading;

 self.photoDownloadTask = [[BGSessionManager sharedManager] downloadTaskWithRequest:request progress:nil destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
        NSURL *filePath = // some file url
        return filePath;
    } completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
        if (!error) {
            // update the PhotoMessage Object
            newPhotoMsg.state = kStateDownloadFinished;
            newPhotoMsg.resourcePath = filePath;
        }
    }];

    [self.photoDownloadTask resume];   
```
正如你可以看到，我使用完成块根据我得到的响应更新PhotoMessage对象。

如何通过背景转移来实现这一点？这个完成块不会被调用，因此，我不能更新newPhotoMsg。

最佳答案
几个想法：
>您必须确保您执行URL加载系统编程指南的Handling iOS Background Activity部分中所述的必要代码：

If you are using NSURLSession in iOS, your app is automatically relaunched when a download completes. Your app’s application:handleEventsForBackgroundURLSession:completionHandler: app delegate method is responsible for recreating the appropriate session, storing a completion handler, and calling that handler when the session calls your session delegate’s URLSessionDidFinishEventsForBackgroundURLSession: method.

该指南显示了您可以做什么的一些示例。坦率地说，我认为在WWDC 2013视频What’s New in Foundation Networking的后半部分讨论的代码示例甚至更清楚。
>如果应用程序只是暂停(当网络任务完成时，你会看到你的块被调用，假设你已经完成上述操作)，AFURLSessionManager的基本实现将与后台会话一起工作。但是你猜到了，如果应用程序终止或崩溃，传递给AFURLSessionManager方法的任何特定于任何任务的块参数将丢失，如果您创建用于上传和下载的NSURLSessionTask。

对于后台上传，这是一个烦恼(因为您创建任务时指定的任务级信息进度和完成块不会被调用)。但是，如果你使用会话级别的转换(例如setTaskDidCompleteBlock和setTaskDidSendBodyDataBlock)，这将被正确调用(假设你总是设置这些块，当你重新实例化会话管理器)。

事实证明，这个丢失块的问题实际上对后台下载更有问题，但是解决方案非常类似(不使用基于任务的块参数，而是使用基于会话的块，如setDownloadTaskDidFinishDownloadingBlock)。
>另一种方法是，您可以坚持使用默认(非背景)NSURLSession，但如果用户在任务正在进行时离开应用程序，请确保您的应用程序请求一点时间完成上传。例如，在创建NSURLSessionTask之前，可以创建UIBackgroundTaskIdentifier：
```object-c
UIBackgroundTaskIdentifier __block taskId = [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:^(void) {
    // handle timeout gracefully if you can

    [[UIApplication sharedApplication] endBackgroundTask:taskId];
    taskId = UIBackgroundTaskInvalid;
}];
但是确保网络任务的完成块正确地通知iOS它完成：

if (taskId != UIBackgroundTaskInvalid) {
    [[UIApplication sharedApplication] endBackgroundTask:taskId];
    taskId = UIBackgroundTaskInvalid;
}
```
这不像后台NSURLSession一样强大(例如，你有一个有限的时间可用)，但在某些情况下，这可能是有用的。

更新：

我想我会添加一个实际的例子，如何使用AFNetworking做背景下载。

>首先定义你的后台管理器。
```object-c
//
//  BackgroundSessionManager.h
//
//  Created by Robert Ryan on 10/11/14.
//  Copyright (c) 2014 Robert Ryan. All rights reserved.
//

#import "AFHTTPSessionManager.h"

@interface BackgroundSessionManager : AFHTTPSessionManager

+ (instancetype)sharedManager;

@property (nonatomic, copy) void (^savedCompletionHandler)(void);

@end
```
和
```object-c
//
//  BackgroundSessionManager.m
//
//  Created by Robert Ryan on 10/11/14.
//  Copyright (c) 2014 Robert Ryan. All rights reserved.
//

#import "BackgroundSessionManager.h"

static NSString * const kBackgroundSessionIdentifier = @"com.domain.backgroundsession";

@implementation BackgroundSessionManager

+ (instancetype)sharedManager
{
    static id sharedMyManager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedMyManager = [[self alloc] init];
    });
    return sharedMyManager;
}

- (instancetype)init
{
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:kBackgroundSessionIdentifier];
    self = [super initWithSessionConfiguration:configuration];
    if (self) {
        [self configureDownloadFinished];            // when download done, save file
        [self configureBackgroundSessionFinished];   // when entire background session done, call completion handler
        [self configureAuthentication];              // my server uses authentication, so let's handle that; if you don't use authentication challenges, you can remove this
    }
    return self;
}

- (void)configureDownloadFinished
{
    // just save the downloaded file to documents folder using filename from URL

    [self setDownloadTaskDidFinishDownloadingBlock:^NSURL *(NSURLSession *session, NSURLSessionDownloadTask *downloadTask, NSURL *location) {
        if ([downloadTask.response isKindOfClass:[NSHTTPURLResponse class]]) {
            NSInteger statusCode = [(NSHTTPURLResponse *)downloadTask.response statusCode];
            if (statusCode != 200) {
                // handle error here, e.g.

                NSLog(@"%@ failed (statusCode = %ld)", [downloadTask.originalRequest.URL lastPathComponent], statusCode);
                return nil;
            }
        }

        NSString *filename      = [downloadTask.originalRequest.URL lastPathComponent];
        NSString *documentsPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
        NSString *path          = [documentsPath stringByAppendingPathComponent:filename];
        return [NSURL fileURLWithPath:path];
    }];

    [self setTaskDidCompleteBlock:^(NSURLSession *session, NSURLSessionTask *task, NSError *error) {
        if (error) {
            // handle error here, e.g.,

            NSLog(@"%@: %@", [task.originalRequest.URL lastPathComponent], error);
        }
    }];
}

- (void)configureBackgroundSessionFinished
{
    typeof(self) __weak weakSelf = self;

    [self setDidFinishEventsForBackgroundURLSessionBlock:^(NSURLSession *session) {
        if (weakSelf.savedCompletionHandler) {
            weakSelf.savedCompletionHandler();
            weakSelf.savedCompletionHandler = nil;
        }
    }];
}

- (void)configureAuthentication
{
    NSURLCredential *myCredential = [NSURLCredential credentialWithUser:@"userid" password:@"password" persistence:NSURLCredentialPersistenceForSession];

    [self setTaskDidReceiveAuthenticationChallengeBlock:^NSURLSessionAuthChallengeDisposition(NSURLSession *session, NSURLSessionTask *task, NSURLAuthenticationChallenge *challenge, NSURLCredential *__autoreleasing *credential) {
        if (challenge.previousFailureCount == 0) {
            *credential = myCredential;
            return NSURLSessionAuthChallengeUseCredential;
        } else {
            return NSURLSessionAuthChallengePerformDefaultHandling;
        }
    }];
}

@end
```
>确保应用程序委托保存完成处理程序(根据需要实例化后台会话)：
```object-c
- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler {
    NSAssert([[BackgroundSessionManager sharedManager].session.configuration.identifier isEqualToString:identifier], @"Identifiers didn't match");
    [BackgroundSessionManager sharedManager].savedCompletionHandler = completionHandler;
}
```
>然后开始下载：
```object-c
for (NSString *filename in filenames) {
    NSURL *url = [baseURL URLByAppendingPathComponent:filename];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [[[BackgroundSessionManager sharedManager] downloadTaskWithRequest:request progress:nil destination:nil completionHandler:nil] resume];
}
```
注意，我不提供任何这些任务相关的块，因为那些是不可靠的背景会话。 (即使应用程序终止后，后台下载仍在进行，这些块已经消失了)。必须依赖于会话级别，只需轻松地重新创建setDownloadTaskDidFinishDownloadingBlock。

显然这是一个简单的例子(只有一个后台会话对象;只是使用URL的最后一个组件将文件保存到docs文件夹作为文件名等)，但希望它说明了模式。