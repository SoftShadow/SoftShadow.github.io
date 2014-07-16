/**
 * Created by lushinogetong on 7/16/14.
 */
var GameOverLayer = cc.LayerColor.extend({
    gameover:null,
    restart:null,

    init:function(){
        this._super();

        this.setColor(cc.c3(0,0,0));
        var winSize = cc.Director.getInstance().getWinSize();

        // 创建GameOver字体
        this.gameover = cc.Sprite.create(s_GameOver);
        this.gameover.setPosition(winSize.width/2, winSize.height*0.6);
        this.addChild(this.gameover);

        // 创建restart箭头
        this.restart = cc.Sprite.create(s_Restart);
        this.restart.setPosition(winSize.width/2, winSize.height*0.3);
        this.addChild(this.restart);

        this.setMouseEnabled(true);
        cc.AudioEngine.getInstance().playMusic(e_Die);

        this.ifChoose = false;

    },

    onMouseMoved:function(mouse){
        if(cc.rectContainsPoint(this.restart.getBoundingBox(), mouse.getLocation())){
            this.restart.setScale(1.1);
            if(!this.ifChoose){
                this.ifChoose = true;
                cc.AudioEngine.getInstance().playEffect(e_Choose);
            }

        }
        else{
            this.ifChoose = false;
            this.restart.setScale(1);
        }
    },
    // 检测按键重玩
    onMouseUp:function(mouse){
        if(cc.rectContainsPoint(this.restart.getBoundingBox(), mouse.getLocation())){
            var chooseLevelScene = new ChooseLevelScene();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(0.4, chooseLevelScene));
        }
    }
})

var GameOverScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layer = new GameOverLayer();
        this.addChild(layer);
        layer.init();
    }
})