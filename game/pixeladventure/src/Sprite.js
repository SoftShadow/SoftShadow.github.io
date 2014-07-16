/**
 * Created by lushinogetong on 7/14/14.
 */
var Hero = cc.Sprite.extend({

    radius: 15, // 定义边界
    distance: 40, //定义左移距离
    jumpDis: 5, //定义跳跃距离
    downSpeed: -80, //定义下落速度
    velocity: null,

    // 构造函数
    ctor:function(size){
        this._super();
        cc.Director.getInstance().getKeyboardDispatcher();
        cc.Director.getInstance().getMouseDispatcher();
        cc.Director.getInstance().getTouchDispatcher();
        if(size == 15){
            this.initWithFile(s_Hero, cc.rect(0, 0, 15, 15));
        }
        else if(size == 30){
            this.initWithFile(s_Hero, cc.rect(0, 0, 30, 30));
        }
        else if(size == 7.5){
            this.initWithFile(s_Hero, cc.rect(0, 0, 7.5, 7.5));
        }
        this.velocity = cc.p(0, this.downSpeed);
        this.volume = 1;
    },

    /*** 定义动作 ***/
    // 定义跳跃动作
    jumpAction:function(){
        var location = this.getPosition();//拿到物体的位置
        var jump = cc.JumpTo.create(1, cc.p(location.x, location.y+this.jumpDis), this.jumpDis, 1);
        this.runAction(jump);
    },
    // 定义上移动作
    moveUp:function(){
        var location = this.getPosition();
        var up = cc.MoveTo.create(0.3, cc.p(location.x, location.y+this.distance));
        this.runAction(up);
    },
    // 定义下移操作
    moveDown:function(){
        var location = this.getPosition();
        var down = cc.MoveTo.create(0.3, cc.p(location.x, location.y-this.distance));
        this.runAction(down);
    },
    // 定义左移动作
    moveLeft:function(){
        var location = this.getPosition();
        var left = cc.MoveTo.create(0.3, cc.p(location.x-this.distance, location.y));
        this.runAction(left);
    },
    // 定义右移动作
    moveRight:function(){
        var location = this.getPosition();
        var right = cc.MoveTo.create(0.3, cc.p(location.x+this.distance, location.y));
        this.runAction(right);
    },

    // 定义变大变小
    scaleTo:function(times){
        var scaleTo = cc.ScaleTo.create(0.3, times);
        this.runAction(scaleTo);
    },

    update:function(dt){
        // 移动位置
        this.setPosition(cc.pAdd(this.getPosition(), cc.pMult(this.velocity, dt)));
    }
})

var Gun = cc.Sprite.extend({
    angle:null,
    fundation:null,

    // 构造函数
    ctor:function(){
        this._super();
        this.initWithFile(s_Gun, cc.rect(0, 0, 10 ,25));
        this.angle = 0;
        this.fundation = cc.Sprite.create(s_GunFundation, cc.rect(0, 0, 15, 15));
    },


    // 定义子弹发射的动作
    shoot:function(duration, direction, bullet){
        var shoot = cc.MoveTo.create(duration, direction);
        var finished = cc.CallFunc.create(function(){return true;});
        cc.AudioEngine.getInstance().playEffect(e_Shoot);
        bullet.runAction(cc.Sequence.create(shoot, finished));
    },


    rotate:function(time, dire){
        // 旋转
        var location = this.getPosition();
        var rotAngle = 0;
        rotAngle = Math.atan(Math.abs(location.x - dire.x)/Math.abs(location.y-dire.y));
        rotAngle /= Math.PI;
        rotAngle *= 180;
        if(dire.y > location.y){
            if(dire.x < location.x){
                rotAngle = 180 - rotAngle;
            }
            else{
                rotAngle = 180 + rotAngle;
            }
        }
        else{
            if(dire.x > location.x){
                rotAngle = 360 - rotAngle;
            }
        }
        rotAngle -= this.angle;
        var rotate = cc.RotateBy.create(time, rotAngle);
        this.runAction(rotate);
        this.angle += rotAngle;
    }
})

var Bullet = cc.Sprite.extend({
    // 构造函数
    ctor:function(){
        this._super();
        this.initWithFile(s_Gun, cc.rect(0, 0, 5, 5));

        this.setTag(2);
    }


})

var Bonus = cc.Sprite.extend({
    // 构造函数
    ctor:function(){
        this._super();
        this.initWithFile(s_Bonus,cc.rect(0,0,10,10));
        this.setTag(1);
    },

    //定期左右移动的函数
    LRMove:function(dire, length, duration){
        if(dire == "left"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x-length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "right"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x+length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    },

    //定期上下移动的函数
    UDMove:function(dire, length, duration){
        if(dire == "up"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y+length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "down"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y-length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    }
})

var Vortex = cc.Sprite.extend({
    radius: 120,
    isSuck: null,
    // 构造函数
    ctor:function(){
        this._super();
        this.initWithFile(s_Vortex, cc.rect(0,0,20,20));
        this.isSuck = false;
        this.rotate();
    },

    //吸取函数
    suck:function(target){
        var location = this.getPosition();
        if(cc.pDistance(location, target.getPosition()) <= this.radius){
            var duration = 1;
            if(!this.isSuck){
                this.isSuck = true;
                var move = cc.MoveTo.create(duration*(cc.pDistance(location, target.getPosition())/this.radius), location);
                move.setTag(9);
                target.runAction(move);
            }
        }
        else{
            this.isSuck = false;
            target.stopActionByTag(9);
        }
    },

    rotate:function(){
        var rotate = cc.RotateBy.create(2, 360);
        var rep = cc.RepeatForever.create(rotate);
        this.runAction(rep);
    }


})

var Sawt = cc.Sprite.extend({
    radius:null,
    // 构造函数
    ctor:function(radius){
        this._super();
        this.radius = radius;
        if(radius == 25){
            this.initWithFile(s_Sawt50);
        }
        else if(radius == 30){
            this.initWithFile(s_Sawt60);
        }
        else if(radius == 40){
            this.initWithFile(s_Sawt80);
        }

        this.rotate();
    },

    rotate:function(){
        var rotate = cc.RotateBy.create(2, 360);
        var rep = cc.RepeatForever.create(rotate);
        this.runAction(rep);
    },

    ifCut:function(target){
        if(cc.pDistance(target.getPosition(), this.getPosition()) <= this.radius){
            return true;
        }
        return false;
    },

    LRMove:function(dire, length, duration){
        if(dire == "left"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x-length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "right"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x+length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    },
    UDMove:function(dire, length, duration){
        if(dire == "up"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y+length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "down"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y-length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    }

})

var Medicine = cc.Sprite.extend({
    kind:null,

    // 构造函数
    ctor:function(kind){
        this._super();
        this.kind = kind;
        if(kind == "wax"){
            this.initWithFile(s_Wax);
        }
        else if(kind == "shrink"){
            this.initWithFile(s_Shrink);
        }
        this.setTag(3);
    },

    //定期左右移动的函数
    LRMove:function(dire, length, duration){
        if(dire == "left"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x-length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "right"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x+length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    },

    //定期上下移动的函数
    UDMove:function(dire, length, duration){
        if(dire == "up"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y+length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "down"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y-length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    }
})


var Wall = cc.Sprite.extend({
    // 构造函数
    ctor:function(width, height){
        this._super();
        this.initWithFile(s_Wall, cc.rect(0, 0, width, height));
    },

    LRMove:function(dire, length, duration){
        if(dire == "left"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x-length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "right"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x+length, this.getPosition().y));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    },
    UDMove:function(dire, length, duration){
        if(dire == "up"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y+length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
        else if(dire == "down"){
            var actionBegin = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y-length));
            var actionEnd = cc.MoveTo.create(duration, cc.p(this.getPosition().x, this.getPosition().y));
            var action = cc.Sequence.create(actionBegin, actionEnd);
            var rep = cc.RepeatForever.create(action);
            this.runAction(rep);
        }
    }
})







