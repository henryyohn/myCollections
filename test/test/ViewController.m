//
//  ViewController.m
//  test
//
//  Created by henry wong on 2020/6/18.
//  Copyright © 2020 henry wong. All rights reserved.
//

#import "ViewController.h"
#import <Foundation/Foundation.h>
#import <objc/runtime.h>
#import <malloc/malloc.h>

@interface Student : NSObject {
    @public
    int _no;
    int _age;
    int _height;
//    UILabel *_hylabel;
//    NSArray *newArr;
//    NSString *name;
//    NSMutableArray *arr;
//    NSDictionary *_dic;
}
//@property(nonatomic, assign) int height;//会自动生成成员变量和它的get，set方法

//@property(nonatomic, strong) NSString *name;//会自动生成成员变量和它的get，set方法

@end

@implementation Student

@end

 

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
//    NSObject *obj = [[NSObject alloc] init];
    
//    NSLog(@"%zd", class_getInstanceSize([NSObject class]));
    
    NSLog(@"====000====");
    Student *stu = [[Student alloc] init];
    stu -> _no = 4;
    stu -> _age = 5;

    NSLog(@"%@",stu);
    
    NSLog(@"%zu", class_getInstanceSize([Student class]));
    NSLog(@"%zu", malloc_size((__bridge const void *)stu));
    
    NSLog(@"1=%@", object_getClass([stu class]));
    NSLog(@"2=%@", object_getClass([Student class]));
    
    int a[5] = {1, 2, 3, 4, 5};
    int *ptr = (int *)(&a + 1);
    printf("%d, %d", *(a + 1), *(ptr + 1));
    
    int d = 10;
    
    void(^block)(int) = ^(int c){
        NSLog(@"A==%d", d * c);
    };
    
    d = 2;
    
    block(3);
    
}


@end

