# news-project
新闻管理系统


一.项目名称：	新闻管理系统

二.作者：	宁志

三.项目简介：	

	新闻管理系统，实现功能有：

		a.用户的增删改查

		b.对新闻的分类管理

		c.新闻的增删改查

		d.新闻评论的增删改查

四.疑难问题及解决办法

	1.在提交表单时，为了在提交时作判断，使用onSubmit来进行ajax请求，报了一个403状态码错误

	解决办法：
		403错误表明是是客户端错误，由于在提交时onSubmit里做了一次ajax请求，表单做了一次
		空请求，所以会报错。

		这里只需在onSubmit最后加上return false即可阻止表单默认提交


	2.在easyui设置表格字段时，为了出现多选框checkbox，直接写{checkbox:true}会报options错误

	解决办法：
		由于easyui 里的datagird中字段field必须有字段内容，只需{field:"checkbox",checkbox:true}
		这样会指明该字段为多选框字段

	
	3.为实现分类管理，需要用分类树

	解决办法：
		由于easyui的分类是根据节点下是否含有children节点来判断，故在后台书写


		核心代码

			function reverseTree(data,pid){//pid=>parentId
    				var result=[],
    				temp;
    				var data=JSON.parse(JSON.stringify(data));//将数据模型的data转化成了普通的json对象
                                //data为数据模型时，不能对其添加属性，所以需要转化为普通json对象。
    				for(var i in data){
        			data[i].id = data[i]._id;
        			if(data[i].parentId===pid){
            				result.push(data[i]);//第一层操作：把parentId=null的放入了result中。第二层操作：把以上一层加入result中的数据的_id作为parentId的数据加入result。。。。。。
           				temp=reverseTree(data,data[i]._id);//递归操作。

            				if(temp.length>0){//>0表示数据不止一层，所以可以添加children属性
                			data[i].children=temp;//给对象增加了一个属性（children）
                			data[i].state = 'closed'
            				}
        			}
    			}
    			return result;
		}

		这样 所返回的数据即为我们所需的json数据,这里设置state 是给有children的节点默认设置关闭状态

	
	4.新闻管理中，想在点击一个分类会出现这个分类下的所有新闻，比如a分类下有b和c 当我点击a的时候 abc的新闻都会弹出来，点击c的时候只会出来c的新闻

	解决办法：
		首先思路是在查找新闻时，是根据id进行查找，由于要查找多个，所以利用数组的形式来储存这些id。
当点击这个分类时，如果这个分类下有子类，也就是含有children节点那么就把这个节点的id添加到数组里，这里的思路和树的分类差不多，也是运用递归的思想，有则增，无则回。

前台核心代码:
var cateid = [];
function reserve(node){	//递归操作，如果node节点下面有子节点，则将子节点的id也放入
			for(var i = 0;i<node.length;i++){
				cateid.push(node[i]._id);
				if(node[i].children){
					reserve(node[i].children);
				}
			}
			return ;
		}

这样 就能将所选中的以及选中下的子节点id全部传递到后台


在后台进行接收时，这里有一个问题

由于在前台传递时 是直接把数组通过queryParams传过去，在后台接收时，必须这样获取

var type_ids = req.body["type_id[]"] || null;

这样能拿到传递过来的数组，然后可进行查询操作


5.在做easyui iframe之间的跳转时，要实现多个iframe之间传递参数

解决办法：
通过地址栏传参，正则获取参数
由于iframe的实现是通过tabs选项卡来判断的，新增时没问题，能正常的通过地址栏传递参数，但在已存在的tabs切换 并不能传递，原因是地址栏没有发生改变，这里有两个解决办法
第一种：利用easyui的tabs中reload方法来进行刷新，然后导入该地址路径即可

第二种：获取该已存在的tabs所对应的iframe的window对象，然后在跳转时，利用window.location.href来重定向到路径页面。获取方法代码为：
var tabPanel = parent.$('#tabs');
function getTabWindow() {	//获取切换后的iframe window对象
  var curTabWin = null;
  var curTab = tabPanel.tabs('getSelected');
  if (curTab && curTab.find('iframe').length > 0) {
    curTabWin = curTab.find('iframe')[0].contentWindow;
  }
  return curTabWin;
}




6.为实现显示新闻列表时，要看到是哪个用户发布的。

解决办法：
首先，在后台构建新闻模型时，需要有user_id来指明该新闻是由哪个用户发布的。
所以要构建好user_id这一字段。

那么在首页的页面(不是iframe的内容) 创建一个隐藏文本域，这个文本域用于储存					  	user_id。那么在发布新闻的时候，数据传输时只需在该文本域这获取内容。连着userid一起传递

在后台页面进行User模型的查找
 User.findById(result.rows[0].user_id,function(err,project){ //得引入User
                if(err){
                    console.log(err);
                }
}
这样就能拿到对应的用户数据，也就能拿到用户名了。