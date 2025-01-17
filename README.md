> bmap分支为测试百度地图的分支，我申请的ak还没下，不能用这个分式 --2024/5/18
>
> 笑死，忽略掉bmap这个分支，百度根本没过我的申请--2024/5/20
>
> ***先试着跑下tsdemo分支，这个分支跑不起来再试试test分支 --2024/5/21***
>
> tsdemo分支下面用mockjs模拟的数据，实际联调的时候注释掉main.js中的`import '@/mock/index'` --2024/5/24
> 发现有个东西叫vue amap，研究下再说，但这个感觉不一定能很及时的弄得出来，如果弄出来在readme里说一下 --2024/5/28

> ~~test分支是用JavaScript写的，tsdemo分支是用TypeScript写的，其实功能上没大区别，但ts相较于js多了一些类型声明，更加严谨了，而且我觉得ts写的比js优雅，所以可以跑跑试试，能用的话就直接tsdemo好了~~
>
> + 指正：~~这俩分支功能没差别~~，tsdemo是我在一边复习ts的时候一边改的，如果愿意的话可以试一下，相较来说就多了一些类型声明，主要集成在`@/utils/index.ts`下面了，也就是那些带着interface的
> + 现在有区别了，我后面有几个提交只在tsdemo上，但大体功能两个分支都满足，这些提交大部分是关于一些优化的
### vue3安装（？）

#### node安装

https://nodejs.org/en

下载lts版本安装就好了

#### npm安装

```powershell
node -v#看看版本
npm cache clean -f#清除npm缓存
npm install npm -g#npm升级到最新版本
npm init vue@lastest#安装最新版本vue
```

#### pnpm安装//这个弄不弄都行吧，pnpm说是会更快一点

```powershell
npm install -g pnpm
pnpm create vue
```



### 一、项目运行

1. `npm install` 安装项目依赖
2. `npm run dev`运行项目

不同命令对比如下：

| npm                    | yarn                | pnpm                |
| ---------------------- | ------------------- | ------------------- |
| `npm install`          | `yarn`              | `pnpm install`      |
| `npm install axios`    | `yarn add axios`    | `pnpm add axios`    |
| `npm install axios -D` | `yarn add axios -D` | `pnpm add axios -D` |
| `npm uninstall axios`  | `yarn remove axios` | `pnpm remove axio`  |
| `npm run dev`          | `yarn dev`          | `pnpm dev`          |

#### 主要技术

1. 数据管理 pinia
2. 地图绘制  echarts
3. 组件库 element-plus

> 注：我本地开发用的是pnpm，但我试了一下，npm run dev能跑起来，所以问题应该不大
>
> + echarts官方文档：https://echarts.apache.org/zh/index.html
>   + lines配置：https://echarts.apache.org/zh/option.html#series-lines
>   + effectScatter配置：https://echarts.apache.org/zh/option.html#series-effectScatter
>   + scatter配置：https://echarts.apache.org/zh/option.html#series-scatter
>   + geo配置：https://echarts.apache.org/zh/option.html#geo
>
> + echarts参考博客：https://blog.csdn.net/interest_ing_/article/details/136753444

### 二、项目结构（这一部分大体介绍下）

#### 1. api

放了~~俩~~仨，不过也是瞎编的，看着调整下吧（）

request的配置放在了`@/utils`下面，做了错误信息的提示

#### 2. assets

里面主要放了用到的地图数据以及一个全局的css（scss，这个不用管，因为我也抄的黑马程序员的，依赖应该在package.json里面有）。

地图数据都在json里面，里面真正的重要的是china.json，这是绘制地图必须用的，其他的两个文件是我自己开发的时候用来mock的数据，你们也可以看看怎么弄，不过既然有数据库的话最好跟数据库里面的数据保持一致

#### 3. components

+ findCity.vue
  + 这个文件是用来查找的，也就是右边那一列上下俩card。form表单只做了一个简单的校验，要求必填
  + 下面的东西把鼠标放到城市路线上会有一个tooltip，蓝色的tag是上面的form表单输入了的，灰色的理论上来说应该是后端返回的计算出来需要途经的城市
+ mapView.vue
  + 显示地图的组件
  + 主要看下里面的drawChina这个函数，里面应该有对应的注释，看不明白的话再来找我

#### 4. stores

这个里面就是用的pinia做的数据状态管理，一个是路径path相关的，一个是城市相关的（这里一开始叫province实际是因为我起错名了，叫city更合适，但改要改引用，懒得弄了）

简单来说path主要相关的是findCity.vue，province主要相关的是mapView

#### 5. utils

就一个文件，city是form表单里级联选择的选项，formatFormCity是城市路线那里显示用到的。cityPosition显示的是各个省会的位置，这个看你们要不要改成从后端获取

#### 6. views

没啥好说的，主要功能不在这，跟总体的布局相关

### 三、咋用

地图上会首先默认显示一个北京-济南-广州的路线，这个是在`@/stores/province.js`里面默认的路线，你们接手的话要改一下为空数组。然后点右边的表单，填写好后点击查询会在地图上显示路线，这个动画有点笨但我没找到怎么改。注意这里实际上也是我自己mock的假数据，涉及到异步请求的部分暂时注释掉了，也在`@/stores/province.js`里面。大体功能就这样子，地图更细的透出，放大后显示地图细节我查了下，还需要找高德或者百度地图的api，懒得弄了。

> tips：目前级联选择器里面所有的城市都是我从网上找的一个地理数据里面处理出来的，实际上我不清楚是否包括了所有的地级市，这边可能需要你们跟数据库配一下

### 四.我希望的接口文档

返回值的大体结构如下

+ status
+ data
  + code //如果后端一切正常，返回0，不正常返回个别的值，同时把报错信息填到message
  + message //展示错误信息
  + ...

#### 一个获取所有省会地址的接口

方法：get

返回数据：

```json
{
	"status":xxx
    "data":{
    	"code":0,
    	"message":'xxx',
    	"cityPosition":[
    		{ name: '北京市',value: ['116.413384', '39.910925']},
    		{ name: '天津市',value: ['117.209523', '39.093668']},
			...,
			{ name: '台北市',value: ['121.539414', '25.073653']},
    	]
	}
}
```

> 注：这个其实没那么重要，因为我现在有个写死的数据在utils里，不过要是想跟后端数据库同步的话最好还是发请求，或者强迫后端的城市经纬度用我这个（）

#### 获取所有城市的接口

方法：get

返回数据：`@/utils`下的city

> 注：同上，主要是怕目前前端写死的这个城市的数据跟你们后端匹配不上

#### 获取城市路径的接口

方法：post

携带参数：

```json
{
	"domains": [
		{
			"key": 1,
			"value": ["黑龙江省","哈尔滨市"]
		},
		{
			"key": 1715856130451,
			"value": ["河北省","承德市"]
		}
	],
	"beginCity": ["黑龙江省","双鸭山市"],
	"endCity": ["北京市"]
}
```
beginCity和endCity不用多说吧（）。然后domains对应的数据是中间的途径城市，也就是用户除了目的地之外还想去的地方，这个是个数组（忽略里面的key，是element-plus自动生成的），数组的顺序就是途径城市的顺序

> 因为用的是级联选择器，所以涉及到地级市的话的格式就是一个数组，beginCity[0]就是对应的省份，beginCity[1]就是对应的城市，这里我应该会在utils里写个函数（`formatParams`）用来加工数据，加工后的数据如下（不过真的没有重名的城市吗？）：
> ```json
> {
> 	"domains": ["哈尔滨市"，"承德市"],
> 	"beginCity": "双鸭山市",
> 	"endCity": "北京市"
> }
> ```
> 到时候看看后端用哪种类型的数据，来决定调不调函数吧

返回值：

```json
{
	"status":xxx
    "data":{
    		"code":0,
    		"message":'xxx',
            "path": [
                    [131.165342, 46.653186],
                    [130.327359, 46.80569],
                    [126.541615, 45.808826],
                    [125.330602, 43.821954],
                    [123.466452, 41.68879],
                    [117.969398, 40.957856],
                    [116.413384, 39.910925],
             ],
            "city": [
                { "name": '双鸭山市', "value": ['131.165342', '46.653186'] },
                { "name": '佳木斯市', "value": ['130.327359', '46.80569'] },
                { "name": '哈尔滨市', "value": ['126.541615', '45.808826'] },
                { "name": '长春市', "value": ['125.330602', '43.821954'] },
                { "name": '沈阳市', "value": ['123.466452', '41.68879'] },
                { "name": '承德市', "value": ['117.969398', '40.957856'] },
                { "name": '北京市', "value": ['116.413384', '39.910925'] },
            ]  
}
```

> coords用来画路径，City用来显示点，这边要注意下格式，格式错了地图会显示不出来我记得
>
> 这里我做了一个接异常的处理，~~但说实话不知道能不能生效，这个还得你们再调下~~
>
> 生效了，不用处理了
