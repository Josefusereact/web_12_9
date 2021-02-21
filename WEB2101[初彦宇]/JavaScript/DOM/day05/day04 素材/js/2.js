var game = {
    OWIDTH: 100 + 16, //弹出窗口的外部宽,横向修正误差16px
    OHEIGHT: 100 + 66, //弹出窗口的外部高,纵向修正66px
    MAXLEFT: 0, //保存弹出窗口最大可用left值: 屏幕宽-窗口宽
    MAXTOP: 0, //保存弹出窗口最大可用top值: 屏幕高-窗口高
    init: function () { //计算MAXLEFT和MAXTOP
        this.MAXLEFT = screen.availWidth - this.OWIDTH;
        this.MAXTOP = screen.availHeight - this.OHEIGHT;
    },
    start: function () {
        this.init();
        //在0~MAXLEFT之间获得随机整数，保存在变量left中
        var left = parseInt(Math.random() * this.MAXLEFT);
        //在0~MAXTOP之间获得随机整数，保存在变量top中
        var top = parseInt(Math.random() * this.MAXTOP);
        //定义配置字符串:
        //config：top=top,left=left,width=100,heigth=100
        var config = "top=" + top +
            ",left=" + left +
            ",width=100,height=100";
        console.log(config);
        //打开新窗口:url:空页面 , name:"pop" , config
        var pop = open("about:blank", "pop", config);
        //pop->新窗口的window，用法和window完全一致: 
        pop.document.write(
            '<img src="d:/xiaoxin.gif" style="width:80"οnclick="alert(\'约么?\')"/>'
        );
        var me = this; //留住this
        pop.οnmοuseοver = function (e) {
            e = window.event || e;
            //this->pop, me->game
            for (;;) {
                //在0~MAXLEFT之间获得随机整数，保存在变量left中
                var left = parseInt(Math.random() * me.MAXLEFT);
                //在0~MAXTOP之间获得随机整数，保存在变量top中
                var top = parseInt(Math.random() * me.MAXTOP);
                //只有新位置不包含鼠标的位置时
                if (!(left < e.screenX && e.screenX < left + me.OWIDTH &&
                        top < e.screenY && e.screenY < left + me.OHEIGHT)) {
                    //将当前窗口移动到top和left位置上
                    this.moveTo(left, top);
                    break; //退出循环
                }
            }
        }
    }
}
window.onload = function () {
    game.start();
}