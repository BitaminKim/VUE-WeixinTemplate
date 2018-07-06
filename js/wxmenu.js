/***
 * Author : kim
 * 
 * paramete:
 * 		menu : 菜单集合
 * 		selected : 一级菜单当前坐标(id)
 * 		selectedTwo : 二级菜单当前坐标(id)
 * 		count : 模拟数据库的计数器
 * 
 * method: 
 * 		oneLevelMenuAdd : 添加一级菜单
 * 		twoLevelMenuAdd : 添加二级菜单
 * 		isActive : 判断当前传入的一级菜单id是否选中
 * 		isCurrent : 判断当前传入的二级菜单id是否选中
 * 		activeSelected : 激活当前传入的一级菜单id
 * 		currentSelected : 激活当前传入的二级菜单id
 * 
 * 
 */
var menuContent = Vue.extend({
	props:{ 
		menu:{
			type : Object
		},
		menuObject:{
			type : Object
		}
	},
    template: '#menu-content',
    methods: {
		removeMenu: function(id){
			$.each(this.menu.list,function(index,item){
				item.list = item.list.filter(t => t.id != id);
			})
			this.menu.list = this.menu.list.filter(t => t.id != id);
			this.menuObject.id = null;
		}
    }
})
var vm = new Vue({
	el: '#app',
	data: {
		menu:{list:[]},
		selected:0,
		selectedTwo:0,
		count:0,
		menuObject:{}
	},
	created: function() { //初始化
	},
	methods: { //方法
		oneLevelMenuAdd: function() {
			var vm = this;
			var levelOneMenu = {id:++vm.count,name:"菜单名称",menuType:"msg",contentType:"pictext",text:"",list:[]};
			vm.selected = vm.count;
			vm.menu.list.push(levelOneMenu);
//			vm.menu.list.reverse(); 翻转
			vm.activeSelected(vm.selected);
			console.log(vm.menu)
		},
		twoLevelMenuAdd: function(pid) {
			var vm = this;
			var levelTwoMenu = {id:++vm.count,pid:pid,name:"子菜单名称",menuType:"msg",contentType:"pictext",text:""};
			vm.selectedTwo = vm.count;
			$.each(vm.menu.list,function(k,v){
				if(v.id == pid){
					v.list.push(levelTwoMenu);
//					v.list.reverse(); 翻转
				}
			});
			vm.currentSelected(vm.selectedTwo);
			console.log(vm.menu)
		},
		isActive: function(id){
			return this.selected == id;
		},
		isCurrent: function(id){
			return this.selectedTwo == id;
		},
		activeSelected: function(id){
			var vm = this;
			vm.selected = id;
	    	$.each(vm.menu.list,function(k,v){
	    		if(v.id == id){
	    			vm.menuObject = v;
	    		}
	    	});
		},
		currentSelected: function(id){
			this.selectedTwo = id;
		}
	},
	computed: { //实时函数
		now: function() {
			return Date.now()
		}
	},
	watch: { //监听
//	    selected: function (newSelected, oldSelected) {
//	    	var vm = this;
//	    	$.each(vm.menu.list,function(k,v){
//	    		if(v.id == newSelected){
//	    			vm.menuObject = v;
//	    		}
//	    	});
//	    },
	    selectedTwo: function (newSelectedTwo, oldSelectedTwo) {
	    	var vm = this;
	    	$.each(vm.menu.list,function(k,v){
	    		if(v.id == vm.selected){
	    			$.each(v.list,function(index,item){
			    		if(item.id == newSelectedTwo){
			    			vm.menuObject = item;
			    		}
			    	});
	    		}
	    	});
	    }
	},
	components: {
		'menu-content' : menuContent
	}
});

