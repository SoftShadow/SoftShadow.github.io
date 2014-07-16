/**
 * Created by lushinogetong on 7/15/14.
 */

var MenuLayer = cc.Layer.extend({
    background:null,
    title:null,
    start:null,
    clouds:[],

    init:function(){
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        // 画出背景图片
        this.background = cc.Sprite.create(s_BackGround);
        this.background.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(this.background);

        // 制作标题
        this.title = cc.Sprite.create(s_Title);
        this.title.setPosition(winSize.width/2, winSize.height*0.8);
        this.addChild(this.title);

        // 制作云朵
        this.clouds[0] = cc.Sprite.create(s_Cloud1);
        this.clouds[1] = cc.Sprite.create(s_Cloud2);
        this.clouds[0].setPosition(winSize.width*0.2, winSize.height*0.7);
        this.clouds[1].setPosition(winSize.width*0.8, winSize.height*0.9);
        this.addChild(this.clouds[0]);
        this.addChild(this.clouds[1]);
        this.LRMove(this.clouds[0], "right", 50, 4);
        this.LRMove(this.clouds[1], "left", 50, 4);

        // 添加开始按键
        this.start = cc.Sprite.create(s_Start);
        this.start.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(this.start);
        this.start.ifChoose = false

        // 启动鼠标检测
        this.setMouseEnabled(true);

        cc.AudioEngine.getInstance().playMusic(e_Menu, true);

    },

    LRMove:function(target, dire, length, duration){
        if(dire == "left"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(target.getPosition().x-length, target.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(target.getPosition().x, target.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            target.runAction(rep);
        }
        else if(dire == "right"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(target.getPosition().x+length, target.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(target.getPosition().x, target.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            target.runAction(rep);
        }
    },

    onMouseMoved:function(mouse){
        if(cc.rectContainsPoint(this.start.getBoundingBox(), mouse.getLocation())){
            this.start.setScale(1.3);
            if(!this.start.ifChoose){
                cc.AudioEngine.getInstance().playEffect(e_Button);
                this.start.ifChoose = true;
            }
        }
        else{
            this.start.setScale(1);
            this.start.ifChoose = false;
        }
    },
    
    onMouseUp:function(mouse) {
        if(cc.rectContainsPoint(this.start.getBoundingBox(), mouse.getLocation())){
            var chooseLevelScene = new ChooseLevelScene();
            cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(0.8, chooseLevelScene));
        }
    }
})

var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layer = new MenuLayer();
        this.addChild(layer);
        layer.init();
    }
})

