/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MainLayer = cc.LayerColor.extend({
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
        this.walls[0] = cc.Sprite.create(s_Wall,cc.rect(0,0,300,50));
        this.walls[1] = cc.Sprite.create(s_Wall,cc.rect(0,0,250,50));

        // 设置墙的锚点位置
        this.walls[0].setPosition(cc.p(origin.x + this.walls[0].getContentSize().width/2 , origin.y + winSize.height*0.6+this.walls[0].getContentSize().height/2));
        this.walls[1].setPosition(cc.p(origin.x + winSize.width-this.walls[1].getContentSize().width/2 , origin.y + this.walls[1].getContentSize().height/2+winSize.height*0.4));

        //添加墙到Mainlayer
        this.addChild(this.walls[0],2);
        this.addChild(this.walls[1],2);

        //创建小金块
        for(var i=0; i<2;i++)
        {
            this.bonus[i]= new Bonus();
        }

        //设置小金块的位置
        this.bonus[0].setPosition(cc.p(origin.x+this.bonus[0].getContentSize().width/2+winSize.width*0.9,origin.y+this.bonus[0].getContentSize().height/2+winSize.height*0.8));
        this.bonus[1].setPosition(cc.p(origin.x+this.bonus[1].getContentSize().width/2+winSize.width*0.5,origin.y+this.bonus[1].getContentSize().height/2+winSize.height*0.5));

        //添加小金块到Mainlayer
        this.addChild(this.bonus[0],2);
        this.addChild(this.bonus[1],2);

        // 添加主角
        this.hero = new Hero();
        this.hero.setPosition(cc.p(100, 680));
        this.addChild(this.hero, 3);


        //添加炮
        this.guns[0] = new Gun();
        this.guns[0].setPosition(cc.p(240, 600));
        this.guns[0].fundation.setPosition(this.guns[0].getPosition());
        this.addChild(this.guns[0], 4);
        this.addChild(this.guns[0].fundation, 3);

        // 添加漩涡
        this.vortexes[0] = new Vortex();
        this.vortexes[0].setPosition(cc.p(100, 300));
        this.addChild(this.vortexes[0], 3);

        // 添加齿轮
        this.sawtes[0] = new Sawt(50);
        this.sawtes[0].setPosition(cc.p(this.walls[0].getPosition().x*0.8, this.walls[0].getPosition().y+this.walls[0].getContentSize().height/2))
        this.addChild(this.sawtes[0]);

        // 添加药
        this.medicines[0] = new Medicine("shrink");
        this.medicines[0].setPosition(cc.p(100, 200));
        this.addChild(this.medicines[0])

        // 开启操作控制
        this.setMouseEnabled(true);
        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);

        // 开启时间检测
        this.schedule(this.update, 0);
        this.schedule(this.shoot, 2);
        this.schedule(this.medicumChange, 10);;
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
            debugger;
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

    // 定义药丸变化函数
    medicumChange:function(){
        var i;
        for(i in this.medicines){
            var medicine = this.medicines[i];
            var location = medicine.getPosition();
            if(medicine.kind == "shrink"){
                this.removeSprite(medicine);
                medicine = new Medicine("wax");
                this.medicines[i] = medicine;
                medicine.setPosition(location);
                this.addChild(medicine);
            }
            else if(medicine.kind == "wax"){
                this.removeSprite(medicine);
                medicine = new Medicine("shrink");
                this.medicines[i] = medicine;
                medicine.setPosition(location);
                this.addChild(medicine);
            }
        }
    },


    update:function(dt){
        this.hero.update(dt);
        this.vortexes[0].suck(this.hero);


        var i;
        var j;
        // 检测Bonus碰撞
        for(i in this.bonus){
            var bonu = this.bonus[i];
            if(this.collide(bonu, this.hero)){
                cc.AudioEngine.getInstance().playEffect(e_EatCoin);
                this.removeSprite(bonu);
            }
        }
        // 检测子弹碰撞墙
        for(i in this.bullets){
            var bullet = this.bullets[i];
            for(j in this.walls){
                var wall = this.walls[j];
                if(this.collide(bullet, wall)){
                    this.removeSprite(bullet);
                }
            }

        }
        //检测药丸使用情况
        for(i in this.medicines){
            var medicine = this.medicines[i];
            if(this.collide(medicine, this.hero)){
                medicine.change(this.hero);
                this.removeSprite(medicine);
            }
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
        layer.init();
    }
});
