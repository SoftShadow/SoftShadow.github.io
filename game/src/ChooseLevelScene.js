/**
 * Created by lushinogetong on 7/16/14.
 */
var ChooseLevelLayer = cc.LayerColor.extend({
    level1:null,

    init:function(){
        this._super();

        this.setColor(cc.c3(0,0,0));
        var winSize = cc.Director.getInstance().getWinSize();

        // 设置关卡旋转
        this.level1 = cc.Sprite.create(s_Level1);
        this.level2 = cc.Sprite.create(s_Level2);
        this.level3 = cc.Sprite.create(s_Level3);
        this.level4 = cc.Sprite.create(s_Level4);
        this.level1.setPosition(winSize.width/2, winSize.height*0.8);
        this.level2.setPosition(winSize.width/2, winSize.height*0.6);
        this.level3.setPosition(winSize.width/2, winSize.height*0.4);
        this.level4.setPosition(winSize.width/2, winSize.height*0.2);
        this.addChild(this.level1);
        this.addChild(this.level2);
        this.addChild(this.level3);
        this.addChild(this.level4);
        this.level1.ifChoose = false;
        this.level2.ifChoose = false;
        this.level3.ifChoose = false;
        this.level4.ifChoose = false;

        // 开启鼠标检测
        this.setMouseEnabled(true);

    },

    onMouseMoved:function(mouse){
        if(cc.rectContainsPoint(this.level1.getBoundingBox(), mouse.getLocation())){
            this.level1.setScale(1.3);
            if(!this.level1.ifChoose){
                this.level1.ifChoose = true;
                cc.AudioEngine.getInstance().playEffect(e_Choose);
            }
        }
        else{
            this.level1.setScale(1);
            this.level1.ifChoose = false;
        }
        if(cc.rectContainsPoint(this.level2.getBoundingBox(), mouse.getLocation())){
            this.level2.setScale(1.3);
            if(!this.level2.ifChoose){
                this.level2.ifChoose = true;
                cc.AudioEngine.getInstance().playEffect(e_Choose);
            }
        }
        else{
            this.level2.setScale(1);
            this.level2.ifChoose = false;
        }
        if(cc.rectContainsPoint(this.level3.getBoundingBox(), mouse.getLocation())){
            this.level3.setScale(1.3);
            if(!this.level3.ifChoose){
                this.level3.ifChoose = true;
                cc.AudioEngine.getInstance().playEffect(e_Choose);
            }
        }
        else{
            this.level3.setScale(1);
            this.level3.ifChoose = false;
        }
        if(cc.rectContainsPoint(this.level4.getBoundingBox(), mouse.getLocation())){
            this.level4.setScale(1.3);
            if(!this.level4.ifChoose){
                this.level4.ifChoose = true;
                cc.AudioEngine.getInstance().playEffect(e_Choose);
            }
        }
        else{
            this.level4.setScale(1);
            this.level4.ifChoose = false;
        }
    },

    onMouseUp:function(mouse){
        if(cc.rectContainsPoint(this.level1.getBoundingBox(), mouse.getLocation())){
            var scene_1 = new Scene_1();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(0.4, scene_1));
        }
        else if(cc.rectContainsPoint(this.level2.getBoundingBox(), mouse.getLocation())){
            var scene_2 = new Scene_2();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(0.4, scene_2));
        }
        else if(cc.rectContainsPoint(this.level3.getBoundingBox(), mouse.getLocation())){
            var scene_3 = new Scene_3();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(0.4, scene_3));
        }
        else if(cc.rectContainsPoint(this.level4.getBoundingBox(), mouse.getLocation())){
            var scene_4 = new Scene_4();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(0.4, scene_4));
        }
    }
})


var ChooseLevelScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layer = new ChooseLevelLayer();
        this.addChild(layer);
        layer.init();
    }
})