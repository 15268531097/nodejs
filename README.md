# nodejs新闻后台管理
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

	解决办