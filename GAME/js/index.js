class BaseCharacter {
  constructor(name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.ap = ap;
    this.alive = true;
  }
  attack(character, damage) {
    if (this.alive == false) {
      return;
    }
    character.getHurt(damage);
  }
  getHurt(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.die();
    }
  

    var _this = this;
    var i = 1;
    //斬棘動畫
    _this.id = setInterval(function() {
      if ( i == 1) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "block" ;
        //斬棘的動畫打開
        _this.element.getElementsByClassName("hurt-text")[0].classList.add("attacked");
        //數字的動畫
        _this.element.getElementsByClassName("hurt-text")[0].textContent = damage;
        //數字內容
      }
      
      _this.element.getElementsByClassName("effect-image")[0].src = 'images/effect/blade/' +i+ '.png';
      i++;

      if (i >8 ) {
        _this.element.getElementsByClassName("effect-image")[0].style.display = "none" ;
        _this.element.getElementsByClassName("hurt-text")[0].classList.remove("attacked");
        _this.element.getElementsByClassName("hurt-text")[0].textContent = " ";
        clearInterval(_this.id);
      }
    }, 100);
  }

  heal(){
    this.hp += 30;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
    var _this = this;
    var i = 1;

     _this.id = setInterval(function() {
      if ( i == 1) {
        _this.element.getElementsByClassName("heal-image")[0].style.display = "block" ;
        _this.element.getElementsByClassName("heal-text")[0].classList.add("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = "30";
      }
        _this.element.getElementsByClassName("heal-image")[0].src = 'images/heal/' +i+ '.png';
        i++;
       if (i >8 ) {
        _this.element.getElementsByClassName("heal-image")[0].style.display = "none" ;
        _this.element.getElementsByClassName("heal-text")[0].classList.remove("healed");
        _this.element.getElementsByClassName("heal-text")[0].textContent = " ";
        clearInterval(_this.id);
      }
    }, 100);


  }

  die() {
    this.alive = false;
  }
  updateHtml(hpElement, hurtElement) {

    hpElement.textContent = this.hp;
    hurtElement.style.width = (100 - this.hp / this.maxHp * 100) + "%";
  }
}

class Hero extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    this.element = document.getElementById("hero-image-block");
    this.hpElement = document.getElementById("hero-hp");
    this.maxHpElement = document.getElementById("hero-max-hp");
    this.hurtElement = document.getElementById("hero-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("召喚英雄 " + this.name + "！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
  heal(){
    super.heal();
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}

class Monster extends BaseCharacter {
  constructor(name, hp, ap) {
    super(name, hp, ap);

    this.element = document.getElementById("monster-image-block");
    this.hpElement = document.getElementById("monster-hp");
    this.maxHpElement = document.getElementById("monster-max-hp");
    this.hurtElement = document.getElementById("monster-hp-hurt");

    this.hpElement.textContent = this.hp;
    this.maxHpElement.textContent = this.maxHp;

    console.log("遇到怪獸 " + this.name + "了！");
  }
  attack(character) {
    var damage = Math.random() * (this.ap / 2) + (this.ap / 2);
    super.attack(character, Math.floor(damage));
  }
  getHurt(damage) {
    super.getHurt(damage);
    this.updateHtml(this.hpElement, this.hurtElement);
  }
}

function endTurn() {
  rounds--;
  document.getElementById("round-num").textContent  =rounds;
  if (rounds < 1 ) {
    finish();
  }
}

function heroAttack() {
  // Hero 選技能時觸發回合開始
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  //把skill block關掉


  setTimeout(function(){
    hero.element.classList.add("attacking");
    setTimeout(function() {
      hero.attack(monster);
      //斬棘動畫+ 少血
      hero.element.classList.remove("attacking");
    }, 500);
  }, 100);

  setTimeout(function() {
    if (monster.alive) {
      monster.element.classList.add("attacking")
      setTimeout(function(){
      monster.attack(hero);
      monster.element.classList.remove("attacking");
      endTurn();
      if (hero.alive == false) {
        finish();
      }//why?{} 
      else { 
        document.getElementsByClassName("skill-block")[0].style.display = "block";}
    }, 500);

    } else {
      finish();
    }
  }, 1100);//hero 跑完需要1.1秒
}

function heroHeal(){
  document.getElementsByClassName("skill-block")[0].style.display = "none";
  
  setTimeout(function(){
    hero.heal();
  }, 500);
 
  
  setTimeout(function() {
    if (monster.alive) {
      monster.element.classList.add("attacking")
      setTimeout(function(){
      monster.attack(hero);
      monster.element.classList.remove("attacking");
      endTurn();
      if (hero.alive == false) {
        finish();
      }
      else { 
        document.getElementsByClassName("skill-block")[0].style.display = "block";}
    }, 500);

    } else {
      finish();
    }
  }, 1100);
}


function addSkillEvent() {
  var skill = document.getElementById("skill");
  skill.onclick = function() {
    heroAttack();
  };
}



function addHealEvent() {
  var heal = document.getElementById("heal");
  heal.onclick = function() {
    heroHeal();
  }
}


function keyEvent(e){
  var key = String.fromCharCode(event.keyCode);
  if(turn){
    switch (key){
      case "A":
      case "a":
        heroAttack();
        break;
      case "D":
      case "d":
        heroHeal();
        break;
      default:
    }
  }
}

window.addEventListener("keydown",keyEvent);

addSkillEvent();




var rounds = 10;
var turn = true;
var hero = new Hero("Dex", 130, 30);
var monster = new Monster("Skeleton", 130, 10);


function finish() {
  var dialog = document.getElementById("dialog")
  dialog.style.display = "block";
  if (monster.alive == false) {
    dialog.classList.add("win");
  }else{
    dialog.classList.add("lose");
  
  }
}




 












