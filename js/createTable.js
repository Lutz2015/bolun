function CreateTable(options){
	this.aTitles = options.aTitles || null;
	this.aDatas = options.aDatas || null;
	this.maxline = options.maxline || 10;
}

CreateTable.prototype = {
	init:function(){
		if(!this.aTitles || !this.aDatas){
			return;
		}
		return this.create();
	},
	reset:function(options){
		this.oTitles = options.oTitles || {};
		this.aDatas = options.aDatas || null;
		this.maxline = options.maxline || 10;
		return this.init();
	},
	create:function(){
		var aTables=[],i=0;len=this.aTitles.length,_this=this;
		aTables.push("<table class='mt-tab'><thead class='tab-thead'><tr>");
		for(;i<len;i++){
			aTables.push("<th");
			aTables.push("><span class='tablecell'>");
			aTables.push(_this.aTitles[i].title);
			aTables.push("</span></th>");
		}
		//aTables.push("<th><span>操作</span></th>");
		aTables.push("</tr></thead><tbody class='tab-tbody'>");
		aTables.push(_this.createDataDom());
		aTables.push("</tbody></table>");
		return aTables.join('');
	},
	createDataDom:function(){
		var i=0,
			len = this.aDatas.length <= this.maxline ? this.aDatas.length : this.maxline,
			aLis=[],
			_this=this,
			jlen=_this.aTitles.length;
		for(;i<len;i++){
			var j=0;
			aLis.push("<tr class='trs'>");
			for(;j<jlen;j++){
				aLis.push('<td class="titlepar ');
				if(_this.aTitles[j].classname){
					aLis.push(_this.aTitles[j].classname);
				}
				aLis.push('"><span class="tablecell">');
				aLis.push(_this.aDatas[i][_this.aTitles[j].id]);
				aLis.push("</span></td>");
			}
			//aLis.push("<td><span class='tab-detail'>查看详情</span><span class='tab-power hide'><em class='tab-frozen'>冻结余额</em><em class='tab-defrozen hide'>解冻余额</em></span></td>");
			aLis.push("</tr>");
		}
		return aLis.join('');
	}
}

// module.exports = CreateTable;