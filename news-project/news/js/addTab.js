var tabPanel = parent.$('#xu-tabs');
var changeReload = parent.$('#change');
function addTab(title, href, iconCls, iframe){
	if(!tabPanel.tabs('exists',title)){
		var content = '<iframe scrolling="auto" frameborder="0"  src="'+ href +'" style="width:100%;height:100%;"></iframe>';
		if(iframe){
			tabPanel.tabs('add',{
				title:title,
				content:content,
				iconCls:iconCls,
				fit:true,
				cls:'pd3',
				closable:true
			});
			getTabWindow().focus();
		}
		else{
			tabPanel.tabs('add',{
				title:title,
				href:href,
				iconCls:iconCls,
				fit:true,
				cls:'pd3',
				closable:true
			});
		}
	}
	else
	{
		tabPanel.tabs('select',title);
		getTabWindow().location.href=href;	//直接获取焦点
	}
}
function getTabWindow() {	//获取切换后的iframe window对象
  var curTabWin = null;
  var curTab = tabPanel.tabs('getSelected');
  if (curTab && curTab.find('iframe').length > 0) {
    curTabWin = curTab.find('iframe')[0].contentWindow;
  }
  return curTabWin;
}