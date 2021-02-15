Game = class {
  constructor(){
    this.world = new World();
  }

  update() {
    this.world.update();
  };
};

World = class {
  constructor() {
    this.background_color = "	#cccccc";
    this.height = 1600;
    this.width = 1000;

    this.player = new Player();

    this.wordList;

    this.homePage = new HomePage(this);
    this.page;
  }

  setup(){
    this.page = this.homePage;
    this.updateWordList();
  }

  updateWordList() {
    this.wordList = [
      "你", "我", "愛", "他/她", "喜歡", "唱", "歌", "可惜", "星", "眼", "我們",
      "一個", "什麽", "可以", "沒有", "世界", "不要", "自己", "如何", "怎麽", "生活",
      "情人", "近", "火箭", "一點", "逐漸", "飯", "期待", "朋友", "母親", "流淚", "狗",
      "貓", "紅", "白", "藍", "吻", "錯", "美", "長島冰茶", "今天", "原來", "如果",
      "手", "一", "金", "木", "水", "火", "鼠", "牛", "遠", "心", "百年", "時間",
      "分手", "分開", "今日", "春", "冬", "秋", "夏", "山", "畫", "醉", "酒", "罪",
      "今晚", "茶", "高", "低", "好", "那麽", "信", "誰", "忘記", "猜", "石", "快樂",
      "失眠", "垃圾", "病", "驕傲", "醜", "詩", "神", "故事", "雨", "晴", "陰", "海",
      "感情", "風", "勇氣", "愛情", "曾經", "夜", "月亮", "甜", "苦", "痛", "過去",
      "花", "笑", "哭", "鋼琴", "失去", "燈", "黑", "人生", "死", "雪"
    ];
  }

  updatePlayer() {
    this.player.score = 0;
    this.player.question = 1;
  }

  update() {
    this.page.update();
  }
}

Player = class {
  constructor() {
    this.score = 0;
    this.question = 1;
  }
}

HomePage = class {
  constructor(world) {
    this.widgets = [
      new Title("歌詞聯想", 500, 400, new TextStyle("Black", "Arial", 60), false),
      new Button("規則", 400, 1150, 200, 100, new TextStyle("Black", "Arial", 60), true, () => {
        world.page = new RulesPage(world);
      }),
      new Button("開始", 400, 1300, 200, 100, new TextStyle("Black", "Arial", 60), true, () => {
        world.updateWordList();
        world.updatePlayer();
        world.page = new GamePage(world);
      })
    ];
  }

  update() {

  }
}

RulesPage = class {
  constructor(world) {
    this.widgets = [
      new Title("規則", 500, 400, new TextStyle("Black", "Arial", 60), false),
      new Paragraph("在游戲開始時你會得到一個字或詞語，請在十秒内唱出一句含有那字或成語的歌，如果答對請按正確。 游戲越多人越好玩哦！", 500, 600, 900, new TextStyle("Black", "Arial", 60), false),
      new Button("返回", 400, 1200, 200, 100, new TextStyle("Black", "Arial", 60), true, () => {
        world.page = world.homePage;
      })
    ]
  }

  update() {

  }
}

GamePage = class {
  constructor(world) {
    const wordPointer = Math.floor(Math.random() * world.wordList.length);
    let word = world.wordList.splice(wordPointer,1);
    console.log(word, world.wordList);
    this.widgets = [
      new Countdown(10, 500, 800, world, new TextStyle("Black", "Arial", 120), false),
      new Title(world.player.score, 900, 100, new TextStyle("Black", "Arial", 60), false),
      new Paragraph(word[0], 500, 400, new TextStyle("Black", "Arial", 60), false),
      new Button("正確", 400, 1200, 200, 100, new TextStyle("Black", "Arial", 60), true, () => {
        if (world.player.question < 10) {
          world.player.score ++;
          world.player.question ++;
          world.page = new GamePage(world);
        } else {
          world.player.score ++;
          world.player.question ++;
          world.page = new ResultsPage(world);
        }
      })
    ]
  }

  update() {
    this.widgets[0].update();
  }
}

ResultsPage = class {
  constructor(world) {
    this.widgets = [
      new Title("分數: " + world.player.score, 500, 800, new TextStyle("Black", "Arial", 120), false),
      new Button("返回", 400, 1200, 200, 100, new TextStyle("Black", "Arial", 60), true, () => {
        world.page = world.homePage;
      })
    ]
  }

  update() {

  }
}

Widget = class {
  constructor(type, posX, posY, textStyle, interactable, run = undefined) {
    this.type = type;
    this.posX = posX;
    this.posY = posY;
    this.textStyle = textStyle;
    this.interactable = interactable;
    this.run = run;
  }
}

Countdown = class extends Widget {
  constructor(timeLeft, posX, posY, world, textStyle, interactable, run = undefined) {
    super("Countdown", posX, posY, textStyle, interactable, run);
    this.world = world;
    this.timeLeft = timeLeft;
    this.text = this.timeLeft;
    this.date = new Date();
    this.createTime = this.date.getTime();
  }

  update() {
    let currentTime = new Date().getTime();
    if (Math.floor((currentTime - this.createTime) / 1000) < this.timeLeft) {
      this.text = this.timeLeft - Math.floor((currentTime - this.createTime) / 1000);
    } else {
      if (this.world.player.question < 10) {
        this.world.player.question ++;
        this.world.page = new GamePage(this.world);
      } else {
        this.world.player.question ++;
        this.world.page = new ResultsPage(this.world);
      }
    }
  }
}

Title = class extends Widget {
  constructor(text, posX, posY, textStyle, interactable, run = undefined) {
    super("Title", posX, posY, textStyle, interactable, run);
    this.text = text;
  }
}

Paragraph = class extends Widget {
  constructor(text, posX, posY, maxWidth, textStyle, interactable, run = undefined) {
    super("Paragraph", posX, posY, textStyle, interactable, run);
    this.text = text;
    this.maxWidth = maxWidth;
  }
}

Button = class extends Widget{
  constructor(text, posX, posY, width, height, textStyle, interactable, run = undefined) {
    super("Button", posX, posY, textStyle, interactable, run);
    this.text = text;
    this.width = width;
    this.height = height;
  }
}

TextStyle = class {
  constructor(color, font, size) {
    this.color = color;
    this.font = font;
    this.size = size;
  }
}
