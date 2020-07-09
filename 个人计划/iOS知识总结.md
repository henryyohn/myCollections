

# 一、Category

### 1、category可以添加什么？

```objective-c
struct category_t {
    const char *name;
    classref_t cls;
    struct method_list_t *instanceMethods;
    struct method_list_t *classMethods;
    struct protocol_list_t *protocols;
    struct property_list_t *instanceProperties;
    // Fields below this point are not always present on disk.
    struct property_list_t *_classProperties;

    method_list_t *methodsForMeta(bool isMeta) {
        if (isMeta) return classMethods;
        else return instanceMethods;
    }

    property_list_t *propertiesForMeta(bool isMeta, struct header_info *hi);
    
    protocol_list_t *protocolsForMeta(bool isMeta) {
        if (isMeta) return nullptr;
        else return protocols;
    }
};
```

从上面的源码我们知道，它可以添加下面的内容：

+ 实例方法

+ 类方法

+ 属性【但是不能添加成员变量】【不会自动生成get和set方法】

  **category的属性和实例方法的属性的区别？**

  ==类里面的属性会自动生成其对应的带下划线的成员变量，category里面的属性，只会默认声明这个属性对应的get和set方法，实现需要自己手动实现==

  **category的方法运行时都会放到对应类对象原来的类方法列表中，类方法就放在以前的类的元类方法列表里面 **

  ==category的方法都是优先调用的，因为在合并分类方法到原来的类方法列表时，是放在内存最前面的。==

  ==**所以category的放法会覆盖原来类里面相同的方法**==

  

  ### 2、相关面试的问题

  + category的实现原理，以及category为什么只能加方法不能加成员变量。

    ==**原理：**底层会把category里面的方法，协议等数据放在一个category_t的结构体中,并且在运行时会把这些方法数据拷贝到类的方法列表里面。==

    ==**不能加成员变量：**==
    ==1、首先它底层的结构体里面没有ivars我们确实是不能停啊什么的，所以它底层语法已经决定了不能够存放成员变量。==
    ==2、成员变量是存放在实例对象的内存里面。它的内存布局在编译时就已经确定了。分类是通过运行时机制加载的==

  + category中有load方法吗？load方法是什么时候调用？load方法能继承吗？

    ==有！load方法在程序启动，装载类的时候调用【无论是否使用】==
    ==调用顺序：先调用类的load再调用分类的load方法==

  + load、initialize

    ==当类第一次接受到消息（第一次使用）时，会调用initialize方法==

    ==子类实例第一次使用时，会先调用父类的initialize方法，在调用子类的initialize方法，所以在子类的initialize方法里面不用写super调用父类==

    ==子类如果存在分类，在初始化的时候，会只调用分类里面的initialize方法，因为这个方法在内存的优先级更高（分类方法排在内存最前面）==

    ==问题：**为什么分类里面的load方法和initialize方法调用的优先级不一样？**==

    ==initialize：通过消息发送机制，通过isa指针去对应的方法列表里面找，方法列表里面的分类的方法优先级高于原来的类中的方法，所以会先找到分类的initialize方法返回==

    ==load：是通过直接获取load方法的内存地址获取方法直接调用，会先调用类的load，再调用category的load方法==

    【**消息机制的本质是通过isa的指针查找**】

  ```objective-c
  @implment myStudent
    
  @end
  ```









# 二、Object-c对象的本质

1. **==面试题：==一个NSobject对象占用多少内存？**

   oc代码底层实现都是C/C++

   ```cpp
struct NSObject_IMPL {
       Class isa;
   };
   typedef struct objc_class *Class;
   ```
   
   

oc的面向对象都是基于C/C++的数据结构实现的。是通过**结构体**容纳不同类型的数据。NSobject的结构体里面内容：

> ```objective-c
> // 我们通过下面的方法生成一个NSObject对象
> NSObject *obj = [[NSObject alloc] init];
> // C底层对NSObject实例的定义
> /**
> struct NSObject_IMPL {
> 	Class isa;
> };
> **/
> //获取NSObject类的实例对象的成员变量占用的大小
> class_getInstanceSize([NSObject class]);
> // 获取obj指针所指向的内存的大小
> 
> ```

**回答：**

系统分配了16个字节给NSObject对象（通过malloc_size函数获取），但是NSObject 对象内部只占用了8字节的空间（64位环境下，通过class_getInstanceSize）



#### 内存操作方法

![PowerPoint](/Users/henry/Desktop/My_Pro/知识收集/个人计划/PowerPoint.png)



#### NSObject 子类对象的内存布局

```objective-c
@interface Student : NSObject{
    @public
    int _no;
    int _age;
}
@end
@implementation Student

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Student *stu = [[Student alloc] init];
        stu -> _no = 4;
        stu -> _age = 5;
        
        NSLog(@"%@",stu);
    }
    return 0;
}
@end
```



**问：student占用多少内存？**

==占用16个字节。==

**分析：**

对应的 C++ 结构体 Student_IMPL 如下：

```objective-c
struct Student_IMPL {
    struct NSObject_IMPL NSObject_IVARS;//NSObject_IMPL就是下面的结构体
    int _no;
    int _age;
};


struct NSObject_IMPL {
    Class isa;
};
```





![IMG_0041](https://upload-images.jianshu.io/upload_images/103735-52e890da617a6be2.png)



**继承关系的内存占用：**

```objective-c
@interface Person : NSObject
{
    int _age;
}
@end
/* Student */
@interface Student : Person
{
    int _no;
}
@end
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        NSLog(@"%zd  %zd",
              class_getInstanceSize([Person class]),
              class_getInstanceSize([Student class])
              );
    }
    return 0;
}
```

![截屏2020-06-20 上午11.54.06](/Users/henry/Desktop/My_Pro/知识收集/个人计划/截屏2020-06-20 上午11.54.06.png)

我们发现只要是继承自NSObject的对象，那么底层结构体内一定有一个isa指针。那么他们所占的内存空间是多少呢？单纯的将指针和成员变量所占的内存相加即可吗？上述代码实际打印的内容是16 16，也就是说，person对象和student对象所占用的内存空间都为16个字节。
 其实实际上person对象确实只使用了12个字节。但是因为内存对齐的原因。使person对象也占用16个字节。



我们可以总结内存对齐为两个原则：

- 原则 1. 前面的地址必须是后面的地址正数倍,不是就补齐。

- 原则 2. 整个Struct的地址必须是最大字节的整数倍。

- 原则 3. OC 对象至少占 16 字节

  如下：

  ```objective-c
  @interface Student : NSObject {
      @public
      int _no; 
      int _age;
      int _height;
  }
  @end
  
  @implementation Student
  
  @end
    
   //c++
    struct Student_IMPL {
      struct NSObject_IMPL NSObject_IVARS;//NSObject_IMPL就是下面的结构体 8
      int _no; // 4
      int _age; // 4
    int _height; // 4
  }; //20 >> 24 >> 32
  
  
  struct NSObject_IMPL {
      Class isa;
  };
  ```

  

#### 获取一个实例对象至少需要多少内存

```objectivec
#import <objc/runtime.h>
class_getInstanceSize([NSObject class]);
```

#### 获取一个实例对象实际上分配了多少内存

```cpp
#import <malloc/malloc.h>
malloc_size((__bridge const void *)obj);
```

```
int 占用4个字节
cgfloat，NSArray,NSString,NSMutableArray, NSDictionary 对象类型都是占用8个字节
```





# 三、OC的对象分类

+ 实例对象 instance
+ 类对象 class
+ 元类对象 meta class



1、实例对象 instance【通过alloc出来的对象，每次调用alloc都会产生新的instance对象】

```objective-c
NSObject *objc1 = [[NSObject alloc] init];
NSObject *objc2 = [[NSObject alloc] init];

@interface Persion: NSObject
  @public
  int _age;
@end

@implementation
  Persion *p1 = [[Persion alloc] init];
	p1 -> _age = 3;

	Persion *p2 = [[Persion alloc] init];
	p2 -> _age = 4;
@end
  
 //p1和p2是两个不同的实例对象，内存地址不一样
```

+ objc1和objc2是NSObject的instance对象（实例对象）
+ 他们是不同的两个对象，分别占据着两块不同的内存
+ instance对象在内存中的存储信息包括：
  - isa指针
  - 其他成员变量

实例对象在内存中存储的是自己的成员变量

2、类对象 class

```objective-c
NSObject *objc1 = [[NSObject alloc] init];
NSObject *objc2 = [[NSObject alloc] init];

Class objectClass1 = [objc1 class]; // 获取实例objc1的类对象
Class objectClass2 = [objc2 class]; // 获取实例objc2的类对象
Class objectClass3 = [NSObject class]; // 获取类对象
Class objectClass4 = object_getClass(objec1); // 获取实例objc1的类对象，runtime API
Class objectClass5 = object_getClass(objec1); // 获取实例objc2的类对象，runtime API
```

+  objectClass1~objectClass5都是NSObject的类对象（class对象）

+ **他们是同一个对象。每个类在内存中有且只有一个class对象**

+ class对象在内存中存储的信息主要包括：
  - isa指针
  - superclass指针
  - 类的属性信息（@property）、类的对象方法信息（instance method）
  - 类的协议信息（protocol）、类的成员变量信息（ivar）【指它的类型等描述性信息】



3、元类对象 meta class



```objective-c
//元类对象, 将类对象作为参数传过去
Class objectMetaClass = object_getclass([NSObject class]) //runtime API
Class objectMetaClass2 = object_getclass(objectClass5) //runtime API

[错误]Class objectMetaClass3 = [[NSObject class] class] // 这个calss方法依然返回的始终是类对象，不会获取到元类对象
  
  class_isMetaClass(objectMetaClass2)//判读是否是元类对象
  
```



+ objectMetaClass是NSObject的meta-class对象 （元类对象）
+ **每个类在内存中有且只有一个元类对象**
+ **meta-class对象和class对象的内存结构是一样的(他们的指针类型都是Class)**，但是用途 不一样，在内存中存储的主要信息包括：
  - isa指针
  - superclass指针
  - 类的类方法信息（class method）

**问题：**

**objc_getClass ，object_getClass，class的区别？**

==1、objc_getClass接受的参数是一个字符串（是一个类名），返回类名对应的类对象==

==2、object_getClass接受的参数是一个对象，如果参数是实例对象，返回类对象；如果参数是类对象，返回的是元类对象；如果参数是元类对象，返回的是基类对象（object的元类对象）==

==3、[NSObject class] 返回的就是类对象==

![截屏2020-06-24 上午11.22.51](/Users/henry/Desktop/My_Pro/知识收集/个人计划/截屏2020-06-24 上午11.22.51.png)



==面试题：==

1、对象的isa指针指向哪里？

**答：** 

> 实例对象的isa指针->类对象
>
> 类对象的isa指针->元类对象

2、OC的类信息存放在那里？

**答：** 

> 成员变量->实例对象里面
>
> 属性，对象方法，协议，成员变量的描述信息等 -> 类对象中
>
> 类方法 -> 元类对象中

​		









