var Scene_1Layer = cc.LayerColor.extend({
    walls:[],
    bonus:[],
    guns:[],
    bullets:[],
    hero: null,
    vortexes:[],
    sawtes:[],
    medicines:[],

    init:function () {

        // 1. super init first
        // 必须调用父类init()方法，很多bug都是由于没有调用父类init()方法造成的
        this._super();
        // 设置Layer的背景，使用RGBA
        this.setColor(cc.c4(49,141,206,100));

        // 获得游戏屏幕的尺寸
        var winSize = cc.Director.getInstance().getWinSize();
        // 获取屏幕坐标原点
        var origin = cc.Director.getInstance().getVisibleOrigin();

        //创建墙  walls
        this.init_wall();


        //创建小金块
        this.init_bonus();

        // 添加主角
        this.init_hero();

        //添加枪
        //this.init_gun();

        // 添加漩涡
        //this.init_vortex();

        // 添加齿轮
        this.init_sawt();

        // 添加药
        //this.init_medicine();

        // 开启操作控制
        this.setMouseEnabled(true);
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // 开启时间检测
        this.schedule(this.update, 0);
        cc.AudioEngine.getInstance().playMusic(e_BGM1, true);
    },

    //初始化墙壁
    init_wall:function() {

        // 获得游戏屏幕的尺寸
        var winSize = cc.Director.getInstance().getWinSize();
        // 获取屏幕坐标原点
        var origin = cc.Director.getInstance().getVisibleOrigin();

        //创建墙  walls
        this.walls[0] = cc.Sprite.create(s_Wall,cc.rect(0,0,250,50));
        this.walls[1] = cc.Sprite.create(s_Wall,cc.rect(0,0,300,50));

        // 设置墙的锚点位置
        this.walls[0].setPosition(cc.p(origin.x + this.walls[0].getContentSize().width/2 , origin.y + winSize.height*0.6+this.walls[0].getContentSize().height/2));
        this.walls[1].setPosition(cc.p(origin.x + winSize.width-this.walls[1].getContentSize().width/2 , origin.y + this.walls[1].getContentSize().height/2+winSize.height*0.3));

        //添加墙到Mainlayer
        for(var i=0; i<this.walls.length;i++){
            this.addChild(this.walls[i],2);
        }
    },

    //初始化金币
    init_bonus:function(){
        // 获得游戏屏幕的尺寸
        var winSize = cc.Director.getInstance().getWinSize();
        // 获取屏幕坐标原点
        var origin = cc.Director.getInstance().getVisibleOrigin();

        //创建小金块
        for(var i=0; i<3;i++)
        {
            this.bonus[i]= new Bonus();
        }

        //设置小金块的位置
        this.bonus[0].setPosition(cc.p(origin.x+this.bonus[0].getContentSize().width/2+winSize.width*0.8,origin.y+this.bonus[0].getContentSize().height/2+winSize.height*0.8));
        this.bonus[1].setPosition(cc.p(origin.x+this.walls[1].getPosition().x,origin.y+this.walls[1].getPosition().y+this.walls[1].getContentSize().height/2+5));
        this.bonus[2].setPosition(cc.p(origin.x+winSize.width*0.7,origin.y+winSize.height*0.1));

        //添加小金块到Mainlayer
        for(var i=0; i<this.bonus.length;i++){
            this.addChild(this.bonus[i],4);
        }
    },

    //初始化齿轮
    init_sawt:function(){
        // 获得游戏屏幕的尺寸
        var winSize = cc.Director.getInstance().getWinSize();
        // 获取屏幕坐标原点
        var origin = cc.Director.getInstance().getVisibleOrigin();

        this.sawtes[0] = new Sawt(40);
        this.sawtes[1] = new Sawt(25);
        this.sawtes[0].setPosition(cc.p(origin.x,origin.y+winSize.height*0.9));
        this.sawtes[1].setPosition(cc.p(this.walls[1].getPosition().x+this.walls[1].getContentSize().width*0.3,this.walls[1].getPosition().y+this.walls[1].getContentSize().height/2));
        this.sawtes[0].UDMove("down",600,4);
        this.sawtes[1].LRMove("left",200,4);

        this.addChild(this.sawtes[0],3);
        this.addChild(this.sawtes[1],1);


    },


    //初始化主角
    init_hero:function(){
        // 获得游戏屏幕的尺寸
        var winSize = cc.Director.getInstance().getWinSize();
        // 获取屏幕坐标原点
        var origin = cc.Director.getInstance().getVisibleOrigin();

        this.hero = new Hero();
        this.hero.setPosition(cc.p(100, 680));
        this.addChild(this.hero, 3);
    },

    onTouchesMoved:function(touches, event){
        this.hero.jumpAction();
    },
    onKeyUp:function(keyCode){
        if(keyCode == cc.KEY.a){
            this.hero.moveLeft();
        }
        else if(keyCode == cc.KEY.d){
            this.hero.moveRight();
        }
    },

    // 定义发射子弹
    shoot:function(){

        var windowRect = cc.rect(0, 0, cc.Director.getInstance().getWinSize().width, cc.Director.getInstance().getWinSize().height);
        // 创建一个子弹
        var bullet = new Bullet();
        // 根据大炮位置初始化
        bullet.setPosition(cc.p(this.guns[0].getPosition().x, this.guns[0].getPosition().y));
        this.bullets.push(bullet);
        this.addChild(bullet);

        // 定义子弹的速度参数
        var bulletDuration = 10;
        var distance = cc.pDistance(cc.p(this.hero.getPosition().x, this.hero.getPosition().y), cc.p(bullet.getPosition().x, bullet.getPosition().y));
        var length = cc.pLength(cc.p(cc.Director.getInstance().getWinSize().width, cc.Director.getInstance().getWinSize().height));
        var destination = cc.p(this.hero.getPosition().x, this.hero.getPosition().y); // 确定移动方向
        bulletDuration *= (distance/length);
        var offset = cc.p(destination.x-this.guns[0].getPosition().x, destination.y-this.guns[0].getPosition().y);
        while(cc.rectContainsPoint(windowRect, destination)){
            destination.x += offset.x;
            destination.y += offset.y;
        }
        destination.x += 3;
        destination.y += 3;
        this.guns[0].rotate(0.2, this.hero.getPosition());
        if(this.guns[0].shoot(bulletDuration, destination, bullet)){
            this.removeSprite(bullet);
        }




    },
    removeSprite:function(sprite){
        var tag = sprite.getTag();
        if(tag == 2){
            var index = this.bullets.indexOf(sprite);
            if(index > -1){
                this.bullets.splice(index, 1);
            }
        }
        else if(tag == 1){
            var index = this.bonus.indexOf(sprite);
            if(index > -1){
                this.bonus.splice(index, 1);
            }
        }
        else if(tag == 3){
            var index = this.medicines.indexOf(sprite);
            if(index > -1){
                this.medicines.splice(index, 1);
            }
        }
        this.removeChild(sprite);

    },

    collide:function(gameObj1, gameObj2){
        var rect1 = gameObj1.getBoundingBox(); // 获取1的边框
        var rect2 = gameObj2.getBoundingBox(); // 获取2的边框
        if(cc.rectIntersectsRect(rect1, rect2)){
            return true;
        }
        return false;
    },


    update:function(dt){
        this.hero.update(dt);

        var i;
        var j;


        //检测主角边缘碰撞
        var winSize = cc.Director.getInstance().getWinSize();
        if(this.hero.getPosition().x <= this.hero.getContentSize().width/2){
            this.hero.setPosition(this.hero.getContentSize().width/2, this.hero.getPosition().y);
        }
        if(this.hero.getPosition().x >= winSize.width-this.hero.getContentSize().width/2){
            this.hero.setPosition(winSize.width-this.hero.getContentSize().width/2, this.hero.getPosition().y);
        }
        if(this.hero.getPosition().y <= this.hero.getContentSize().height/2){
            this.hero.setPosition(this.hero.getPosition().x, this.hero.getContentSize().height/2);
        }
        if(this.hero.getPosition().y >= winSize.height-this.hero.getContentSize().height/2){
            this.hero.setPosition(this.hero.getPosition().x, winSize.height-this.hero.getContentSize().height/2);
        }

        //检测主角撞墙
        for(i in this.walls){
            var wall = this.walls[i];
            var wposition = wall.getPosition();
            var wcontent = wall.getContentSize();
            var hposition = this.hero.getPosition();
            var hcontent = this.hero.getContentSize();

            if(Math.abs(hposition.x-wposition.x) < (hcontent.width/2+wcontent.width/2)-10){
                if(hposition.y-wposition.y >= 0 && hposition.y-wposition.y <= hcontent.height/2+wcontent.height/2){
                    //debugger;
                    this.hero.setPosition(hposition.x, wposition.y+hcontent.height/2+wcontent.height/2);
                    //debugger;
                }
                else if(hposition.y-wposition.y < 0 && wposition.y-hposition.y < hcontent.height/2+wcontent.height/2){
                    this.hero.setPosition(hposition.x, wposition.y-hcontent.height/2-wcontent.height/2)
                }
            }
            else if(Math.abs(hposition.y-wposition.y) < (hcontent.height/2+wcontent.height/2)){
                if(hposition.x-wposition.x > 0 && hposition.x-wposition.x < hcontent.width/2+wcontent.width/2){
                    this.hero.setPosition(wposition.x+hcontent.width/2+wcontent.width/2, hposition.y);
                }
                else if(hposition.x-wposition.x < 0 && wposition.x-hposition.x < hcontent.width/2+wcontent.width/2){
                    this.hero.setPosition(wposition.x-hcontent.width/2-wcontent.width/2, hposition.y)
                }
            }
        }

        // 检测Bonus碰撞
        for(i in this.bonus){
            var bonu = this.bonus[i];
            if(this.collide(bonu, this.hero)){
                cc.AudioEngine.getInstance().playEffect(e_EatCoin);
                this.removeSprite(bonu);
            }
        }
        // 检测锯齿
        for(i in this.sawtes){
            var sawt = this.sawtes[i];
            if(sawt.ifCut(this.hero)){
                var gameover = new GameOverScene();
                cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(1, gameover));
            }
        }
        // 检测成功
        if(this.bonus.length == 0){
            var success = new Scene_2();
            cc.Director.getInstance().replaceScene(cc.TransitionCrossFade.create(2, success));
        }
    }
});

var Scene_1 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Scene_1Layer();
        this.addChild(layer);
        layer.init();
    }
});/**
 * Created by Liang on 2014/7/16.
 */
