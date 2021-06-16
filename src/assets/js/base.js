var Host = "http://base.hope55.com/";
var API = Host + "API/WebAPI/";
var BasePageSize = 9; //默认分页数
var DefualtDepartmentID = 193; //默认部门ID
var DefualtOrganID = 43; //默认企业ID
jQuery.support.cors = true; //ie8手动开启cors
$.ajaxSetup({
	cache: true
});
String.prototype.myReplace = function(f, e) { //把f替换成e
	var reg = new RegExp(f, "g"); //创建正则RegExp对象
	return this.replace(reg, e);
}
//时间函数
String.prototype.GetNewDate = function(style, char) {
	if(Curren.isEmpty(char) && Curren.isEmpty(style)) return this.substr(0, 10);
	var year = this.substr(0, 4);
	var month = this.substr(5, 2);
	var day = this.substr(8, 2);
	var date = Curren.isEmpty(char) ? this.substr(0, 10) : year + char + month + char + day;
	if(!Curren.isEmpty(style)) {
		if(style == 6) {
			date = date.substr(0, 7);
		} else if(style == 2) {
			date = date.substr(8, 2);
		}else if (style == 'month'){
		    month = month[0]=="0"?month.substr(1,1):month;
		    date =month;
        }
	}
	return date;
}
//数据模型
var Model = {
	//部门
	Department: {
		Name: "{Name}",
		Address: "{Address}",
		Phone: "{Phone}",
		Logo: "{Logo}",
		Email: "{Email}",
		Fax: "{Fax}",
		ZipCode: "{ZipCode}",
		Alias: "{Alias}"
	},
	//导航栏
	Nav: {
		FID: "{FID}",
		ID: "{ID}",
		Logo: "{Logo}",
		Name: "{Name}",
		Type: "{Type}",
		Url: "{Url}"
	},
	//栏目
	Column: {
		Aliase: "{Aliase}",
		Logo: "{Logo}",
		Name: "{Name}",
		Fid: "{Fid}",
		Describe: "{Describe}",
		ID:"{ID}",
		Type:"{Type}",
		Url:"{Url}"

	},
	//部门集合
	Departments: {
		ID: "{ID}",
		Name: "{Name}",
		Alias: "{Alias}"
	},
	//单页信息
	SinglePage: {
		ColumnID: "{ColumnID}",
		CreateTime: "{CreateTime}",
		Describe: "{Describe}",
		ID: "{ID}",
		Info: "{Info}",
		Photo: "{Photo}",
		Press: "{Press}"
	},
	//列表信息集合
	NewsInfos: {
		ID: "{ID}",
		Title: "{Title}",
		Author: "{Author}",
		Source: "{Source}",
		ShowTime: "{ShowTime}",
		ShowTime2: "{ShowTime2}",
		ShowTime6: "{ShowTime6}",
		ShowTime6_2: "ShowTime6_2",
        ShowTimeMonth:"ShowTimeMonth",
		Cover: "{Cover}",
		Describe: "{Describe}",
		HasPhoto: "{HasPhoto}",
		Hot: "{Hot}",
		KeyWord: "{KeyWord}",
		Top: "{Top}",
		Url: "{Url}",
		FID: "{FID}"
	},
	//列表信息
	NewsInfo: {
		Author: "{Author}",
		Details: "{Details}",
		Fid: "{Fid}",
		KeyWord: "{KeyWord}",
		Press: "{Press}",
		ShowTime: "{ShowTime}",
		Source: "{Source}",
		Title: "{Title}",
		Url: "{Url}"
	},
	//文件信息集合
	FilesInfo: {
		Title: "{Title}",
		Top: "{Top}",
		Url: "{Url}",
		ShowTime: "{ShowTime}",
		ShowTime2: "{ShowTime2}",
		ShowTime6: "{ShowTime6}",
		ShowTime6_2: "{ShowTime6_2}",
        ShowTimeMonth:"{ShowTimeMonth}",
        Hot: "{Hot}",
		FileUrl: "{FileUrl}",
		Describe: "{Describe}"
	},
	//企业信息
	OrganInfo: {
		Address: "{Address}",
		Alias: "{Alias}",
		CreateTime: "{CreateTime}",
		ID: "{ID}",
		LOGO: "{LOGO}",
		Name: "{Name}",
		Record: "{Record}",
		State: "{State}",
		Tel: "{Tel}"
	},
	//副导航
	Vice_nav: {
		Nav: {
			Name: "{Name}",
			ID: "{ID}",
			Type: "{Type}",
			Url: "{Url}",
			Aliase: "{Aliase}",
			Logo: "{Logo}",
			Describe: "{Describe}"
		},
		Parent: {
			Name: "{P_Name}",
			ID: "{P_ID}",
			Type: "{P_Type}",
			Url: "{P_Url}",
			Aliase: "{P_Aliase}",
			Logo: "{P_Logo}",
			Describe: "{P_Describe}"
		}
	}

};

//通用函数
var Curren = {
	//时间截取
	formatDatebox: function(value, char, style) {
		var year = value.substr(0, 4);
		var month = value.substr(5, 2);
		var day = value.substr(8, 2);
		var date = Curren.isEmpty(char) ? value.substr(0, 10) : year + char + month + char + day;
		if(!Curren.isEmpty(style)) {
			if(style == 6) {
				date = date.substr(0, 7);
			} else if(style == 2) {
				date = date.substr(8, 2);
			}
		}
		return date;
	},
	//判断字符是否为空的方法
	isEmpty: function(obj) {
		if(typeof obj == "undefined" || obj == null || obj == "") {
			return true;
		} else {
			return false;
		}
	},
	getQueryString: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);

		// if (!r){
		//      if( !Curren.getQueryString("Nid")){
		//
		//      };
		// }
		if(r != null) {
			return decodeURI(r[2]);
		}
		return null;
	},
	SetClassStyle: function(CId) {
      // var CId = Curren.getQueryString("CId");
      var PColumn;
			var lanmu = Base.GetColumnByid(CId);
            if(Curren.isEmpty(lanmu.Url)) {
                lanmu.Url = "list.html?HType=" +lanmu.Type + "&CId=" + lanmu.ID;
                if(lanmu.Type == 0) {
                    lanmu.Url = "javascript:;";
                }
            }
			if(lanmu.Fid > 0) {
				PColumn = Base.GetColumnByid(lanmu.Fid);
                if(Curren.isEmpty(PColumn.Url)) {
                    PColumn.Url = "list.html?HType=" +PColumn.Type + "&CId=" + PColumn.ID;
                    if(PColumn.Type == 0) {
                        PColumn.Url = "javascript:;";
                    }
                }
			} 

		return { 'lanmu':lanmu , 'PColumn':PColumn}
	},
	GetPageBar: function(total, pageSize, url ,pageIndex) {
		if (typeof  total!="number"){
			 total=total.Total
		}
		if(total <= pageSize) {
			return;
		}
		// var pageIndex = Curren.getQueryString("PageIndex");
		var url = url + "&PageIndex=";
		if(Curren.isEmpty(pageIndex) || pageIndex <= 1) pageIndex = 1;
		if(Curren.isEmpty(pageSize)) pageSize = BasePageSize;

		var maxPI = (total / pageSize <= 1 ? 1 : Math.ceil(total / pageSize));
		if(pageIndex >= maxPI) pageIndex = maxPI;
		var lastPage = url + (pageIndex - 1 <= 1 ? 1 : pageIndex - 1);
		var nextPage = url + (parseInt(pageIndex) + 1 > maxPI ? maxPI : parseInt(pageIndex) + 1);
    var strPage={};
    var index=0;    
    strPage[index++]={'Url':url+1,'Nab':0,'Name':'首页'}
    strPage[index++]={'Url':lastPage,'Nab':0,'Name':'上一页'}
		if(maxPI <= 3) {
			for(var i = 1; i <= maxPI; i++) {
        strPage[index++]={'Url':url+i,'Nab':i,'Name':''+i};
			}
		} else {
			if(pageIndex == 1) {
        strPage[index++]={'Url':url+1,'Nab':1,'Name':''+1};
        strPage[index++]={'Url':url + (pageIndex + 1),'Nab':(pageIndex + 1),'Name':(pageIndex + 1)+''};
        strPage[index++]={'Url':url + (pageIndex + 2),'Nab':(pageIndex + 2),'Name':(pageIndex + 2)+''};
        strPage[index++]={'Url':url +  maxPI,'Nab': maxPI,'Name': '...   '+maxPI};
			} else if(pageIndex == maxPI) {
        strPage[index++]={'Url':url+1,'Nab':1,'Name':1+'   ...'};
        strPage[index++]={'Url':url + (pageIndex - 2 ),'Nab':(pageIndex - 2),'Name':(pageIndex -2)+''};
        strPage[index++]={'Url':url + (pageIndex - 1),'Nab':(pageIndex  -1),'Name':(pageIndex -1)+''};
        strPage[index++]={'Url':url +  maxPI,'Nab': maxPI,'Name': maxPI};
			} else {
				for(var i = pageIndex - 2; i <= pageIndex; i++) {
          strPage[index++]={'Url':url + (i + 1),'Nab':(i + 1),'Name':(i + 1)+''};
				}
				if (pageIndex!=maxPI-1){
          strPage[index++]={'Url':url + maxPI,'Nab':maxPI,'Name': '...   '+maxPI};
				}
			}
		}
		if (pageIndex==maxPI){
      strPage[index++]={'Url': url + pageIndex,'Nab':0,'Name': '下一页'};
      strPage[index++]={'Url': url + maxPI,'Nab':0,'Name': '末页'};
		}else{
      strPage[index++]={'Url': nextPage,'Nab': 0,'Name': '下一页'};
      strPage[index++]={'Url': url + maxPI,'Nab':0,'Name': '末页'};
		}

    // $("#page_turn_box").html(strPageHtml);
    // console.log(pageIndex);
    
    return strPage;
	}
}

//数据接口
var Base = {
	//获取导航栏栏目
	GetNavColumnsByDid: function() {
		var Did = DefualtDepartmentID;
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetNavColumnsByDid?Did=" + Did,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);
					for(var i = 0; i <GetData.length; i++) {
            GetData[i].On = false;
						if(Curren.isEmpty(GetData[i].Url)) {
							GetData[i].Url = "list.html?HType=" + GetData[i].Type + "&CId=" + GetData[i].ID;
							if(GetData[i].Type == 0) {
								GetData[i].Url = "javascript:;";
							}
					
            }
				  }
			}
		});
		return GetData;
	},
	//获得指定栏目信息
	GetColumnByid: function(Cid) {
		var lanmu=Model.Column;
		$.ajax({
			type: "GET",
			url: API + "GetColumnByid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				lanmu = JSON.parse(data);

			}
		})
		return lanmu;
	},
	//获得指定部门信息
	GetDepartmentByDid: function(Did) {
		if(Curren.isEmpty(Did)) Did = DefualtDepartmentID;
		var bumen=Model.Department;
		$.ajax({
			type: "GET",
			url: API + "GetDepartmentByDid?Did=" + Did,
			async: false,
			dataType: "json",
			success: function(data) {
				bumen = JSON.parse(data);

			}
		})
		return bumen;

	},
	//根据企业获取全部部门
	GetDepartmentsByOid: function(strHtml, Oid, IDName) {
		if(Curren.isEmpty(Oid)) Oid = DefualtOrganID;
		if(Curren.isEmpty(IDName)) IDName = Oid;

		var NewHtml = "";
		$.ajax({
			type: "GET",
			url: API + "GetDepartmentsByOid?Oid=" + Oid,
			async: false,
			dataType: "json",
			success: function(data) {
				var GetData = JSON.parse(data);
				var len = GetData.length;
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						NewHtml += strHtml
							.myReplace(Model.Departments.ID, GetData[i].ID)
							.myReplace(Model.Departments.Name,  GetData[i].Name)
							.myReplace(Model.Departments.Alias, GetData[i].Alias);
					}
					$("#" + IDName + "").append(NewHtml);
				}
			}
		})
	},
	//获取单页信息
	GetSinglePageInfoByCid: function(Cid) {
		var danye=Model.SinglePage;
		$.ajax({
			type: "GET",
			url: API + "GetSinglePageInfoByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				danye = JSON.parse(data);
				danye.ID = "list.html?HType=1&CId=" +danye.ColumnID;
			},
			error:function () {
				danye.Info="暂无数据"
			}
		})
		return danye;
	},
	//获取列表信息集合
	GetNewsInfoByCid: function( Cid, needPhoto,PageIndex, SearchWord, PageSize,descNum) {
    var Total = 0;
    var GetData;
		if(Curren.isEmpty(PageIndex)) PageIndex = 1;
		if(Curren.isEmpty(PageSize)) PageSize = BasePageSize;
		if(Curren.isEmpty(SearchWord)) SearchWord = "";
		if(Curren.isEmpty(descNum)) descNum = 200;
		if(!needPhoto) {
			needPhoto = false;
		}
		var Senddata = {
			PageIndex: PageIndex,
			Cid: Cid,
			PageSize: PageSize,
			SearchWord: SearchWord,
			NeedPhoto: needPhoto,
			descNum:descNum
		}
		$.ajax({
			type: "GET",
			url: API + "GetNewsInfoByCid",
			async: false,
			data: Senddata,
			dataType: "json",
			success: function(data) {
        GetData = JSON.parse(data).row;
        for(var i=0;i<GetData.length;i++){
            GetData[i].Url = (Curren.isEmpty(GetData[i].Url) ? "list.html?HType=2&CId=" + GetData[i].FID + "&NId=" + GetData[i].ID : GetData[i].Url);
            GetData[i].ShowTime2 = GetData[i].ShowTime.GetNewDate(2);
            GetData[i].ShowTime6 = GetData[i].ShowTime.GetNewDate(8,'.');
            GetData[i].ShowTime6_2 = GetData[i].ShowTime.GetNewDate(6, '/')
            GetData[i].ShowTimeMonth = GetData[i].ShowTime.GetNewDate("month")
            GetData[i].ShowTime = GetData[i].ShowTime.GetNewDate()
          }
        Total = JSON.parse(data).total;
        GetData.PageBar=Curren.GetPageBar(Total, PageSize, "list.html?HType=2&CId=" + Cid + "",PageIndex);
        }
    })
    return GetData;
		// return Total;
	},
	//获取列表信息详情
	GetNewsInfoByNid: function(Nid) {
		$.ajax({
			type: "GET",
			url: API + "GetNewsInfoByNid?Nid=" + Nid,
			async: false,
			dataType: "json",
			success: function(data) {
				Model.NewsInfo = JSON.parse(data);
				Model.NewsInfo.ShowTime = Curren.formatDatebox(Model.NewsInfo.ShowTime);
				var reg=new RegExp("&gt;","g");
				var reg1=new RegExp("&lt;","g");
				var reg2=new RegExp("&amp;","g");
				Model.NewsInfo.Details=Model.NewsInfo.Details.replace(reg,">").replace(reg1,"<").replace(reg2,"&");
				if(Curren.isEmpty(Model.NewsInfo.Source)) Model.NewsInfo.Source = "本站";
			}
		})
		return Model.NewsInfo;
	},
	//获取文件信息集合
	GetFilesInfoByCid: function( Cid,PageIndex, SearchWord, PageSize,isBanner) {
		PageIndex = PageIndex || 1 ;
		PageSize = PageSize||BasePageSize ;
		var Total = 0;
		var GetData="";
		if(Curren.isEmpty(SearchWord)) SearchWord = "";
		var Senddata = {
			PageIndex: PageIndex,
			Cid: Cid,
			PageSize: PageSize,
			SearchWord: SearchWord
		}
		$.ajax({
			type: "GET",
			url: API + "GetFilesInfoByCid",
			async: false,
			data: Senddata,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data).row;
				Total = JSON.parse(data).total;
      
        for(var i=0;i<GetData.length;i++){
		  (!Curren.isEmpty(GetData[i].Url)&&!isBanner)?GetData[i].FileUrl = (GetData[i].Url.indexOf("//")==-1 ? '//base.hope55.com'+GetData[i].Url : GetData[i].Url) : '';
          GetData[i].Url = Curren.isEmpty(GetData[i].Url) ? "javascript:;" : GetData[i].Url;
          GetData[i].ShowTime2 = GetData[i].ShowTime.GetNewDate(2);
          GetData[i].ShowTime6 = GetData[i].ShowTime.GetNewDate(6);
          GetData[i].ShowTime6_2 = GetData[i].ShowTime.GetNewDate(6, '/')
          GetData[i].ShowTimeMonth = GetData[i].ShowTime.GetNewDate("month")
          GetData[i].ShowTime = GetData[i].ShowTime.GetNewDate()
         }
         GetData.PageBar=Curren.GetPageBar(Total, PageSize, "list.html?HType="+Curren.getQueryString("HType")+"&CId=" + Cid + "",PageIndex);
				}
		})
		return GetData;
	},
	//获取企业信息
	GetOrganInfoByOid: function(Oid) {
		if(Curren.isEmpty(Oid)) Oid = DefualtOrganID;
		$.ajax({
			type: "GET",
			url: API + "GetOrganInfoByOid?Oid=" + Oid,
			async: false,
			dataType: "json",

			success: function(data) {
				Model.OrganInfo = JSON.parse(data);
			}
		})
		return Model.OrganInfo;
	},
	GetFNavColumnsByCid: function(Cid, strHtml_P, strHtml, IDname) {
		var NewHtml = "";
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetFNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);
				if(GetData) {
					if(Curren.isEmpty(GetData.p.Url)) {
						if(GetData.p.Type == 0) {
							GetData.p.Url = "javascript:;";
						} else {
							GetData.p.Url = "list.html?HType=" + GetData.p.Type + "&CId=" + GetData.p.ID;
						}
					}
					NewHtml += strHtml_P.myReplace(Model.Vice_nav.Parent.Logo, GetData.p.Logo)
						.myReplace(Model.Vice_nav.Parent.Url, GetData.p.Url)
						.myReplace(Model.Vice_nav.Parent.Aliase, GetData.p.Aliase)
						.myReplace(Model.Vice_nav.Parent.ID, GetData.p.ID)
						.myReplace(Model.Vice_nav.Parent.Name, GetData.p.Name)
						.myReplace(Model.Vice_nav.Parent.Describe, GetData.p.Describe)
						.myReplace(Model.Vice_nav.Parent.Type, GetData.p.Type);
					if(GetData.nav.length > 0) {
						for(var i = 0; i < GetData.nav.length; i++) {
							if(Curren.isEmpty(GetData.nav[i].Url)) {
								GetData.nav[i].Url = "list.html?HType=" + GetData.nav[i].Type + "&CId=" + GetData.nav[i].ID;

							}
							NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo, GetData.nav[i].Logo)
								.myReplace(Model.Vice_nav.Nav.Url, GetData.nav[i].Url)
								.myReplace(Model.Vice_nav.Nav.Aliase, GetData.nav[i].Aliase)
								.myReplace(Model.Vice_nav.Nav.ID, GetData.nav[i].ID)
								.myReplace(Model.Vice_nav.Nav.Name, GetData.nav[i].Name)
								.myReplace(Model.Vice_nav.Nav.Describe, GetData.nav[i].Describe)
								.myReplace(Model.Vice_nav.Nav.Type, GetData.nav[i].Type)

						}
					} else {
						NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo, GetData.p.Logo)
							.myReplace(Model.Vice_nav.Nav.Url, GetData.p.Url)
							.myReplace(Model.Vice_nav.Nav.Aliase, GetData.p.Aliase)
							.myReplace(Model.Vice_nav.Nav.ID, GetData.p.ID)
							.myReplace(Model.Vice_nav.Nav.Name, GetData.p.Name)
							.myReplace(Model.Vice_nav.Nav.Type, GetData.p.Type)
					}
					if(Curren.isEmpty(IDname)) IDname = Cid;
					$("#" + IDname + "").html(NewHtml);
				}

			}
		})
		return GetData;
	},

	GetCNavColumnsByCid: function(Cid, strHtml, IDname) {
		var NewHtml = "";
		var GetData;
		$.ajax({
			type: "GET",
			url: API + "GetCNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				GetData = JSON.parse(data);

				if(GetData.length > 0) {
					for(var i = 0; i < GetData.length; i++) {
						NewHtml += strHtml.myReplace(Model.Column.Logo,  GetData[i].Logo)
							.myReplace(Model.Column.Url, Curren.isEmpty(GetData[i].Url)?"list.html?HType="+GetData[i].Type+"&CId=" + GetData[i].FID+'&Id='+GetData[i].ID  : GetData[i].Url)
							.myReplace(Model.Column.Aliase, GetData[i].Aliase)
							.myReplace(Model.Column.ID, GetData[i].ID)
							.myReplace(Model.Column.Name, GetData[i].Name)
							.myReplace(Model.Column.Describe, GetData[i].Describe)
							.myReplace(Model.Column.Type, GetData[i].Type);
					}
				}
				if(Curren.isEmpty(IDname)) IDname = Cid;
				$("#" + IDname + "").html(NewHtml);

			}

		})
		return GetData;
	},
	GetFNavColumnsByCidWithoutParent: function(Cid, strHtml, IDname,StartNum,EndNum) {
		var NewHtml = "";

		$.ajax({
			type: "GET",
			url: API + "GetFNavColumnsByCid?Cid=" + Cid,
			async: false,
			dataType: "json",
			success: function(data) {
				var GetData = JSON.parse(data);
				if (Curren.isEmpty(EndNum)||EndNum>GetData.nav.length) EndNum = GetData.nav.length;
				if (EndNum>GetData.nav.length) EndNum
				if (Curren.isEmpty(StartNum)) StartNum = 0;
				if(GetData) {
					if(GetData.nav.length > 0) {
						for(var i = StartNum; i <EndNum; i++) {
							if(Curren.isEmpty(GetData.nav[i].Url)) {
								GetData.nav[i].Url = "list.html?HType=" + GetData.nav[i].Type + "&CId=" + GetData.nav[i].ID;

							}
							NewHtml += strHtml.myReplace(Model.Vice_nav.Nav.Logo, GetData.nav[i].Logo)
								.myReplace(Model.Vice_nav.Nav.Url, GetData.nav[i].Url)
								.myReplace(Model.Vice_nav.Nav.Aliase, GetData.nav[i].Aliase)
								.myReplace(Model.Vice_nav.Nav.ID, GetData.nav[i].ID)
								.myReplace(Model.Vice_nav.Nav.Name, GetData.nav[i].Name)
								.myReplace(Model.Vice_nav.Nav.Type, GetData.nav[i].Type)

						}
					}
					if(Curren.isEmpty(IDname)) IDname = Cid;
					$("#" + IDname + "").html(NewHtml);
				}
			}
		})
	},
	// 发送邮件
	sendMail:function(Senddata){
	    var result=null;
	    var Senddata = {
	      Name: Senddata.Name,
	      Email: Senddata.Email,
	      Mobile: Senddata.Mobile,
	      Title:Senddata.Title,
	      Info: Senddata.Info,
	      ColumnID: Senddata.ColumnID
	    };
		console.log(Senddata)
	    $.ajax({
	      type: "post",
	      url:API+"AddMail",
	      async: false,
	      data:Senddata,
	      dataType: "json",
	      success:function (data) {
	        data=JSON.parse(data)
	        result={
	          state:data.state == 'no'? '发生失败':"发送成功",
	          message:data.msg
	        }
	      },
	      error:function () {
	        result={
	          state:'发生失败',
	          message:'··'
	        }
	      }
	    });
	    return result
	  },
	GetInfoBySearch:function (selText,pageIndex,pageSize,did) {
    var GetData,Total=0;
		if (Curren.isEmpty(did)) did=DefualtDepartmentID;
		if (Curren.isEmpty(pageIndex)) pageIndex=1;
		var SendData={
			selText:selText,
			pageIndex:pageIndex,
			did:did,
			pageSize: pageSize,
		}
		$.ajax({
			type: "GET",
			url: API + "GetInfoBySearch",
			async: false,
			dataType: "json",
			data: SendData,
			success: function(data) {
			  GetData = JSON.parse(data);
				if(GetData) {
				   GetData = JSON.parse(data).row;
					Total = JSON.parse(data).total;
          for(var i=0;i<GetData.length;i++){
            GetData[i].Url = (Curren.isEmpty(GetData[i].Url) ? "list.html?HType=2&CId=" + GetData[i].ColumnID + "&NId=" + GetData[i].ID : GetData[i].Url);
            GetData[i].ShowTime2 = GetData[i].ShowTime.GetNewDate(2);
            GetData[i].ShowTime6 = GetData[i].ShowTime.GetNewDate(6);
            GetData[i].ShowTime6_2 = GetData[i].ShowTime.GetNewDate(6, '/');
            GetData[i].ShowTimeMonth = GetData[i].ShowTime.GetNewDate("month");
            GetData[i].ShowTime = GetData[i].ShowTime.GetNewDate();
          }
            GetData.PageBar = Curren.GetPageBar(Total, pageSize, "search.html?selText=" + selText);
					}
			}
			
    })
    return GetData
	},
	//发送信息收集
	sendStudentMessage:function (obj) {
		var result=null;
		var Senddata = {
			StudentName: obj.StudentName,
			StudentSex: obj.StudentSex,
			StudentAge: obj.StudentAge||1,
			PhoneNumber:obj.PhoneNumber,
			ProfessionalApply: obj.ProfessionalApply,
			ColumnID: obj.ColumnID
		};
		$.ajax({
			type: "GET",
			url:API+"StudnetApply",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {

				result={
					state:data.split(":")[0],
					message:data.split(":")[1]
				}
			},
		});
		return result;
	},

//留言板功能
	getMsg:function(cid,pageIndex,pageSize){
		var GetData =null;
		var Senddata = {
			cid:cid,
			pageIndex:pageIndex,
			pageSize:pageSize
		};
		$.ajax({
			type: "GET",
			url:API+"getMsg",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {
				GetData =JSON.parse(data).row
			},
		});
		return GetData;
	},
	addMsg:function(cid,msg,id,name){
		var GetData =null;
		name = name||"匿名用户";
		var Senddata = {
			ColumnID:cid,
			Info:msg,
			Target:id,
			UserName:name
		};
		$.ajax({
			type: "POST",
			// url:API+"addMsg?cid="+cid+"&msg="+msg+"&id="+id+"&name="+name,
			url:API+"addMsg",
			async: false,
			data:Senddata,
			dataType: "json",
			success:function (data) {
				GetData =data;
			},
		});
		return GetData;
	},
	// 获取上下条新闻
	GetInfosByNid:function(Nid){
		var GetData =null;
		$.ajax({
			type: "GET",
			url:API+"GetInfosByNid?Nid="+Nid,
			async: false,
			dataType: "json",
			success:function (data) {
				GetData =JSON.parse(data)
			},
		});
		return GetData;
	},
	//获取所有栏目（包括未激活导航属性）
	GetColumnsByDid:function (Did) {
		Did=Did?Did:DefualtDepartmentID;
		var GetData="";
		$.ajax({
			type:"get",
			url:API+"GetColumnsByDid",
			data:{Did:Did},
			async:false,
			success:function (data) {
				GetData =JSON.parse(data);
				//添加链接
				for (var i=0;i<GetData.length;i++){
					GetData[i].Url="list.html?HType="+GetData[i].Type+"&CId="+GetData[i].ID;
				}
			}
		})
		return GetData;
	}
};

export default{
  Base,
  Curren
}
