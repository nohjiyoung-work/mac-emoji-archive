// 화면에 표시할 이모티콘 목록입니다. macOS가 실제 모양을 결정합니다.
const emojiData = [
  {
    "name": "Smileys",
    "items": [
      [
        "😀",
        "grinning face"
      ],
      [
        "😃",
        "smiling face with open mouth"
      ],
      [
        "😄",
        "smiling face with open mouth and smiling eyes"
      ],
      [
        "😁",
        "grinning face with smiling eyes"
      ],
      [
        "😆",
        "smiling face with open mouth and tightly-closed eyes"
      ],
      [
        "😅",
        "smiling face with open mouth and cold sweat"
      ],
      [
        "🤣",
        "rolling on the floor laughing"
      ],
      [
        "😂",
        "face with tears of joy"
      ],
      [
        "🙂",
        "slightly smiling face"
      ],
      [
        "🙃",
        "upside-down face"
      ],
      [
        "🫠",
        "melting face"
      ],
      [
        "😉",
        "winking face"
      ],
      [
        "😊",
        "smiling face with smiling eyes"
      ],
      [
        "😇",
        "smiling face with halo"
      ],
      [
        "🥰",
        "smiling face with smiling eyes and three hearts"
      ],
      [
        "😍",
        "smiling face with heart-shaped eyes"
      ],
      [
        "🤩",
        "grinning face with star eyes"
      ],
      [
        "😘",
        "face throwing a kiss"
      ],
      [
        "😗",
        "kissing face"
      ],
      [
        "☺️",
        "white smiling face"
      ],
      [
        "😚",
        "kissing face with closed eyes"
      ],
      [
        "😙",
        "kissing face with smiling eyes"
      ],
      [
        "🥲",
        "smiling face with tear"
      ],
      [
        "😋",
        "face savouring delicious food"
      ],
      [
        "😛",
        "face with stuck-out tongue"
      ],
      [
        "😜",
        "face with stuck-out tongue and winking eye"
      ],
      [
        "🤪",
        "grinning face with one large and one small eye"
      ],
      [
        "😝",
        "face with stuck-out tongue and tightly-closed eyes"
      ],
      [
        "🤑",
        "money-mouth face"
      ],
      [
        "🤗",
        "hugging face"
      ],
      [
        "🤭",
        "smiling face with smiling eyes and hand covering mouth"
      ],
      [
        "🫢",
        "face with open eyes and hand over mouth"
      ],
      [
        "🫣",
        "face with peeking eye"
      ],
      [
        "🤫",
        "face with finger covering closed lips"
      ],
      [
        "🤔",
        "thinking face"
      ],
      [
        "🫡",
        "saluting face"
      ],
      [
        "🤐",
        "zipper-mouth face"
      ],
      [
        "🤨",
        "face with one eyebrow raised"
      ],
      [
        "😐",
        "neutral face"
      ],
      [
        "😑",
        "expressionless face"
      ],
      [
        "😶",
        "face without mouth"
      ],
      [
        "🫥",
        "dotted line face"
      ],
      [
        "😶‍🌫️",
        "face without mouth fog"
      ],
      [
        "😏",
        "smirking face"
      ],
      [
        "😒",
        "unamused face"
      ],
      [
        "🙄",
        "face with rolling eyes"
      ],
      [
        "😬",
        "grimacing face"
      ],
      [
        "😮‍💨",
        "face with open mouth dash symbol"
      ],
      [
        "🤥",
        "lying face"
      ],
      [
        "🫨",
        "shaking face"
      ],
      [
        "😌",
        "relieved face"
      ],
      [
        "😔",
        "pensive face"
      ],
      [
        "😪",
        "sleepy face"
      ],
      [
        "🤤",
        "drooling face"
      ],
      [
        "😴",
        "sleeping face"
      ],
      [
        "🥱",
        "yawning face"
      ],
      [
        "😷",
        "face with medical mask"
      ],
      [
        "🤒",
        "face with thermometer"
      ],
      [
        "🤕",
        "face with head-bandage"
      ],
      [
        "🤢",
        "nauseated face"
      ],
      [
        "🤮",
        "face with open mouth vomiting"
      ],
      [
        "🤧",
        "sneezing face"
      ],
      [
        "🥵",
        "overheated face"
      ],
      [
        "🥶",
        "freezing face"
      ],
      [
        "🥴",
        "face with uneven eyes and wavy mouth"
      ],
      [
        "😵",
        "dizzy face"
      ],
      [
        "😵‍💫",
        "dizzy face dizzy symbol"
      ],
      [
        "🤯",
        "shocked face with exploding head"
      ],
      [
        "🤠",
        "face with cowboy hat"
      ],
      [
        "🥳",
        "face with party horn and party hat"
      ],
      [
        "🥸",
        "disguised face"
      ],
      [
        "😎",
        "smiling face with sunglasses"
      ],
      [
        "🤓",
        "nerd face"
      ],
      [
        "🧐",
        "face with monocle"
      ],
      [
        "😕",
        "confused face"
      ],
      [
        "🫤",
        "face with diagonal mouth"
      ],
      [
        "😟",
        "worried face"
      ],
      [
        "🙁",
        "slightly frowning face"
      ],
      [
        "☹️",
        "white frowning face"
      ],
      [
        "😮",
        "face with open mouth"
      ],
      [
        "😯",
        "hushed face"
      ],
      [
        "😲",
        "astonished face"
      ],
      [
        "😳",
        "flushed face"
      ],
      [
        "🥺",
        "face with pleading eyes"
      ],
      [
        "🥹",
        "face holding back tears"
      ],
      [
        "😦",
        "frowning face with open mouth"
      ],
      [
        "😧",
        "anguished face"
      ],
      [
        "😨",
        "fearful face"
      ],
      [
        "😰",
        "face with open mouth and cold sweat"
      ],
      [
        "😥",
        "disappointed but relieved face"
      ],
      [
        "😢",
        "crying face"
      ],
      [
        "😭",
        "loudly crying face"
      ],
      [
        "😱",
        "face screaming in fear"
      ],
      [
        "😖",
        "confounded face"
      ],
      [
        "😣",
        "persevering face"
      ],
      [
        "😞",
        "disappointed face"
      ],
      [
        "😓",
        "face with cold sweat"
      ],
      [
        "😩",
        "weary face"
      ],
      [
        "😫",
        "tired face"
      ],
      [
        "😤",
        "face with look of triumph"
      ],
      [
        "😡",
        "pouting face"
      ],
      [
        "😠",
        "angry face"
      ],
      [
        "🤬",
        "serious face with symbols covering mouth"
      ],
      [
        "😈",
        "smiling face with horns"
      ],
      [
        "👿",
        "imp"
      ],
      [
        "💀",
        "skull"
      ],
      [
        "☠️",
        "skull and crossbones"
      ],
      [
        "💩",
        "pile of poo"
      ],
      [
        "🤡",
        "clown face"
      ],
      [
        "👹",
        "japanese ogre"
      ],
      [
        "👺",
        "japanese goblin"
      ],
      [
        "👻",
        "ghost"
      ],
      [
        "👽",
        "extraterrestrial alien"
      ],
      [
        "👾",
        "alien monster"
      ],
      [
        "🤖",
        "robot face"
      ],
      [
        "😺",
        "smiling cat face with open mouth"
      ],
      [
        "😸",
        "grinning cat face with smiling eyes"
      ],
      [
        "😹",
        "cat face with tears of joy"
      ],
      [
        "😻",
        "smiling cat face with heart-shaped eyes"
      ],
      [
        "😼",
        "cat face with wry smile"
      ],
      [
        "😽",
        "kissing cat face with closed eyes"
      ],
      [
        "🙀",
        "weary cat face"
      ],
      [
        "😿",
        "crying cat face"
      ],
      [
        "😾",
        "pouting cat face"
      ],
      [
        "🙈",
        "see-no-evil monkey"
      ],
      [
        "🙉",
        "hear-no-evil monkey"
      ],
      [
        "🙊",
        "speak-no-evil monkey"
      ]
    ]
  },
  {
    "name": "People & Hands",
    "items": [
      [
        "👋",
        "waving hand sign"
      ],
      [
        "🤚",
        "raised back of hand"
      ],
      [
        "🖐️",
        "raised hand with fingers splayed"
      ],
      [
        "✋",
        "raised hand"
      ],
      [
        "🖖",
        "raised hand with part between middle and ring fingers"
      ],
      [
        "🫱",
        "rightwards hand"
      ],
      [
        "🫲",
        "leftwards hand"
      ],
      [
        "🫳",
        "palm down hand"
      ],
      [
        "🫴",
        "palm up hand"
      ],
      [
        "🫷",
        "leftwards pushing hand"
      ],
      [
        "🫸",
        "rightwards pushing hand"
      ],
      [
        "👌",
        "ok hand sign"
      ],
      [
        "🤌",
        "pinched fingers"
      ],
      [
        "🤏",
        "pinching hand"
      ],
      [
        "✌️",
        "victory hand"
      ],
      [
        "🤞",
        "hand with index and middle fingers crossed"
      ],
      [
        "🫰",
        "hand with index finger and thumb crossed"
      ],
      [
        "🤟",
        "i love you hand sign"
      ],
      [
        "🤘",
        "sign of the horns"
      ],
      [
        "🤙",
        "call me hand"
      ],
      [
        "👈",
        "white left pointing backhand index"
      ],
      [
        "👉",
        "white right pointing backhand index"
      ],
      [
        "👆",
        "white up pointing backhand index"
      ],
      [
        "🖕",
        "reversed hand with middle finger extended"
      ],
      [
        "👇",
        "white down pointing backhand index"
      ],
      [
        "☝️",
        "white up pointing index"
      ],
      [
        "🫵",
        "index pointing at the viewer"
      ],
      [
        "👍",
        "thumbs up sign"
      ],
      [
        "👎",
        "thumbs down sign"
      ],
      [
        "✊",
        "raised fist"
      ],
      [
        "👊",
        "fisted hand sign"
      ],
      [
        "🤛",
        "left-facing fist"
      ],
      [
        "🤜",
        "right-facing fist"
      ],
      [
        "👏",
        "clapping hands sign"
      ],
      [
        "🙌",
        "person raising both hands in celebration"
      ],
      [
        "🫶",
        "heart hands"
      ],
      [
        "👐",
        "open hands sign"
      ],
      [
        "🤲",
        "palms up together"
      ],
      [
        "🤝",
        "handshake"
      ],
      [
        "🙏",
        "person with folded hands"
      ],
      [
        "✍️",
        "writing hand"
      ],
      [
        "💅",
        "nail polish"
      ],
      [
        "🤳",
        "selfie"
      ],
      [
        "💪",
        "flexed biceps"
      ],
      [
        "🦾",
        "mechanical arm"
      ],
      [
        "🦵",
        "leg"
      ],
      [
        "🦿",
        "mechanical leg"
      ],
      [
        "🦶",
        "foot"
      ],
      [
        "👂",
        "ear"
      ],
      [
        "🦻",
        "ear with hearing aid"
      ],
      [
        "👃",
        "nose"
      ],
      [
        "🧠",
        "brain"
      ],
      [
        "🫀",
        "anatomical heart"
      ],
      [
        "🫁",
        "lungs"
      ],
      [
        "🦷",
        "tooth"
      ],
      [
        "🦴",
        "bone"
      ],
      [
        "👀",
        "eyes"
      ],
      [
        "👁️",
        "eye"
      ],
      [
        "👅",
        "tongue"
      ],
      [
        "👄",
        "mouth"
      ],
      [
        "🫦",
        "biting lip"
      ],
      [
        "👶",
        "baby"
      ],
      [
        "🧒",
        "child"
      ],
      [
        "👦",
        "boy"
      ],
      [
        "👧",
        "girl"
      ],
      [
        "🧑",
        "adult"
      ],
      [
        "👱",
        "person with blond hair"
      ],
      [
        "👨",
        "man"
      ],
      [
        "👩",
        "woman"
      ],
      [
        "🧔",
        "bearded person"
      ],
      [
        "👴",
        "older man"
      ],
      [
        "👵",
        "older woman"
      ],
      [
        "🧓",
        "older adult"
      ],
      [
        "👲",
        "man with gua pi mao"
      ],
      [
        "👳",
        "man with turban"
      ],
      [
        "👮",
        "police officer"
      ],
      [
        "👷",
        "construction worker"
      ],
      [
        "💂",
        "guardsman"
      ],
      [
        "🕵️",
        "sleuth or spy"
      ],
      [
        "👩‍⚕️",
        "woman staff of aesculapius"
      ],
      [
        "👨‍⚕️",
        "man staff of aesculapius"
      ],
      [
        "👩‍🎓",
        "woman graduation cap"
      ],
      [
        "👨‍🎓",
        "man graduation cap"
      ],
      [
        "👩‍🏫",
        "woman school"
      ],
      [
        "👨‍🏫",
        "man school"
      ],
      [
        "👩‍💻",
        "woman personal computer"
      ],
      [
        "👨‍💻",
        "man personal computer"
      ],
      [
        "👩‍🎨",
        "woman artist palette"
      ],
      [
        "👨‍🎨",
        "man artist palette"
      ],
      [
        "👩‍🚀",
        "woman rocket"
      ],
      [
        "👨‍🚀",
        "man rocket"
      ],
      [
        "👩‍🍳",
        "woman cooking"
      ],
      [
        "👨‍🍳",
        "man cooking"
      ],
      [
        "👩‍🎤",
        "woman microphone"
      ],
      [
        "👨‍🎤",
        "man microphone"
      ],
      [
        "🧑‍🎄",
        "adult christmas tree"
      ],
      [
        "🎅",
        "father christmas"
      ],
      [
        "🤶",
        "mother christmas"
      ],
      [
        "🦸",
        "superhero"
      ],
      [
        "🦹",
        "supervillain"
      ],
      [
        "🧙",
        "mage"
      ],
      [
        "🧚",
        "fairy"
      ],
      [
        "🧛",
        "vampire"
      ],
      [
        "🧜",
        "merperson"
      ],
      [
        "🧝",
        "elf"
      ],
      [
        "🧞",
        "genie"
      ],
      [
        "🧟",
        "zombie"
      ],
      [
        "💃",
        "dancer"
      ],
      [
        "🕺",
        "man dancing"
      ],
      [
        "🕴️",
        "man in business suit levitating"
      ],
      [
        "🚶",
        "pedestrian"
      ],
      [
        "🏃",
        "runner"
      ],
      [
        "🧎",
        "kneeling person"
      ],
      [
        "🧘",
        "person in lotus position"
      ],
      [
        "🛌",
        "sleeping accommodation"
      ],
      [
        "🛀",
        "bath"
      ],
      [
        "👯",
        "woman with bunny ears"
      ],
      [
        "👫",
        "man and woman holding hands"
      ],
      [
        "👬",
        "two men holding hands"
      ],
      [
        "👭",
        "two women holding hands"
      ],
      [
        "💑",
        "couple with heart"
      ],
      [
        "💏",
        "kiss"
      ],
      [
        "👪",
        "family"
      ]
    ]
  },
  {
    "name": "Animals & Nature",
    "items": [
      [
        "🐶",
        "dog face"
      ],
      [
        "🐱",
        "cat face"
      ],
      [
        "🐭",
        "mouse face"
      ],
      [
        "🐹",
        "hamster face"
      ],
      [
        "🐰",
        "rabbit face"
      ],
      [
        "🦊",
        "fox face"
      ],
      [
        "🐻",
        "bear face"
      ],
      [
        "🐼",
        "panda face"
      ],
      [
        "🐻‍❄️",
        "bear face snowflake"
      ],
      [
        "🐨",
        "koala"
      ],
      [
        "🐯",
        "tiger face"
      ],
      [
        "🦁",
        "lion face"
      ],
      [
        "🐮",
        "cow face"
      ],
      [
        "🐷",
        "pig face"
      ],
      [
        "🐽",
        "pig nose"
      ],
      [
        "🐸",
        "frog face"
      ],
      [
        "🐵",
        "monkey face"
      ],
      [
        "🐒",
        "monkey"
      ],
      [
        "🦍",
        "gorilla"
      ],
      [
        "🦧",
        "orangutan"
      ],
      [
        "🐔",
        "chicken"
      ],
      [
        "🐧",
        "penguin"
      ],
      [
        "🐦",
        "bird"
      ],
      [
        "🐤",
        "baby chick"
      ],
      [
        "🐣",
        "hatching chick"
      ],
      [
        "🐥",
        "front-facing baby chick"
      ],
      [
        "🦆",
        "duck"
      ],
      [
        "🦅",
        "eagle"
      ],
      [
        "🦉",
        "owl"
      ],
      [
        "🦇",
        "bat"
      ],
      [
        "🐺",
        "wolf face"
      ],
      [
        "🐗",
        "boar"
      ],
      [
        "🐴",
        "horse face"
      ],
      [
        "🦄",
        "unicorn face"
      ],
      [
        "🫎",
        "moose"
      ],
      [
        "🫏",
        "donkey"
      ],
      [
        "🐝",
        "honeybee"
      ],
      [
        "🪲",
        "beetle"
      ],
      [
        "🐛",
        "bug"
      ],
      [
        "🦋",
        "butterfly"
      ],
      [
        "🐌",
        "snail"
      ],
      [
        "🐞",
        "lady beetle"
      ],
      [
        "🐜",
        "ant"
      ],
      [
        "🪰",
        "fly"
      ],
      [
        "🪱",
        "worm"
      ],
      [
        "🦟",
        "mosquito"
      ],
      [
        "🦗",
        "cricket"
      ],
      [
        "🕷️",
        "spider"
      ],
      [
        "🕸️",
        "spider web"
      ],
      [
        "🦂",
        "scorpion"
      ],
      [
        "🐢",
        "turtle"
      ],
      [
        "🐍",
        "snake"
      ],
      [
        "🦎",
        "lizard"
      ],
      [
        "🦖",
        "t-rex"
      ],
      [
        "🦕",
        "sauropod"
      ],
      [
        "🐙",
        "octopus"
      ],
      [
        "🦑",
        "squid"
      ],
      [
        "🦐",
        "shrimp"
      ],
      [
        "🦞",
        "lobster"
      ],
      [
        "🦀",
        "crab"
      ],
      [
        "🐡",
        "blowfish"
      ],
      [
        "🐠",
        "tropical fish"
      ],
      [
        "🐟",
        "fish"
      ],
      [
        "🐬",
        "dolphin"
      ],
      [
        "🐳",
        "spouting whale"
      ],
      [
        "🐋",
        "whale"
      ],
      [
        "🦈",
        "shark"
      ],
      [
        "🦭",
        "seal"
      ],
      [
        "🐊",
        "crocodile"
      ],
      [
        "🐅",
        "tiger"
      ],
      [
        "🐆",
        "leopard"
      ],
      [
        "🦓",
        "zebra face"
      ],
      [
        "🦒",
        "giraffe face"
      ],
      [
        "🦏",
        "rhinoceros"
      ],
      [
        "🦛",
        "hippopotamus"
      ],
      [
        "🐘",
        "elephant"
      ],
      [
        "🦣",
        "mammoth"
      ],
      [
        "🐪",
        "dromedary camel"
      ],
      [
        "🐫",
        "bactrian camel"
      ],
      [
        "🦘",
        "kangaroo"
      ],
      [
        "🦬",
        "bison"
      ],
      [
        "🐃",
        "water buffalo"
      ],
      [
        "🐂",
        "ox"
      ],
      [
        "🐄",
        "cow"
      ],
      [
        "🐎",
        "horse"
      ],
      [
        "🐖",
        "pig"
      ],
      [
        "🐏",
        "ram"
      ],
      [
        "🐑",
        "sheep"
      ],
      [
        "🦙",
        "llama"
      ],
      [
        "🐐",
        "goat"
      ],
      [
        "🦌",
        "deer"
      ],
      [
        "🐕",
        "dog"
      ],
      [
        "🐩",
        "poodle"
      ],
      [
        "🦮",
        "guide dog"
      ],
      [
        "🐈",
        "cat"
      ],
      [
        "🐈‍⬛",
        "cat black large square"
      ],
      [
        "🪶",
        "feather"
      ],
      [
        "🦃",
        "turkey"
      ],
      [
        "🦚",
        "peacock"
      ],
      [
        "🦜",
        "parrot"
      ],
      [
        "🦢",
        "swan"
      ],
      [
        "🦩",
        "flamingo"
      ],
      [
        "🕊️",
        "dove of peace"
      ],
      [
        "🐇",
        "rabbit"
      ],
      [
        "🦝",
        "raccoon"
      ],
      [
        "🦨",
        "skunk"
      ],
      [
        "🦡",
        "badger"
      ],
      [
        "🦫",
        "beaver"
      ],
      [
        "🦦",
        "otter"
      ],
      [
        "🦥",
        "sloth"
      ],
      [
        "🐁",
        "mouse"
      ],
      [
        "🐀",
        "rat"
      ],
      [
        "🐿️",
        "chipmunk"
      ],
      [
        "🦔",
        "hedgehog"
      ],
      [
        "🐾",
        "paw prints"
      ],
      [
        "🐉",
        "dragon"
      ],
      [
        "🐲",
        "dragon face"
      ],
      [
        "🌵",
        "cactus"
      ],
      [
        "🎄",
        "christmas tree"
      ],
      [
        "🌲",
        "evergreen tree"
      ],
      [
        "🌳",
        "deciduous tree"
      ],
      [
        "🌴",
        "palm tree"
      ],
      [
        "🪵",
        "wood"
      ],
      [
        "🌱",
        "seedling"
      ],
      [
        "🌿",
        "herb"
      ],
      [
        "☘️",
        "shamrock"
      ],
      [
        "🍀",
        "four leaf clover"
      ],
      [
        "🎍",
        "pine decoration"
      ],
      [
        "🪴",
        "potted plant"
      ],
      [
        "🎋",
        "tanabata tree"
      ],
      [
        "🍃",
        "leaf fluttering in wind"
      ],
      [
        "🍂",
        "fallen leaf"
      ],
      [
        "🍁",
        "maple leaf"
      ],
      [
        "🍄",
        "mushroom"
      ],
      [
        "🪺",
        "nest with eggs"
      ],
      [
        "🪹",
        "empty nest"
      ],
      [
        "🌾",
        "ear of rice"
      ],
      [
        "💐",
        "bouquet"
      ],
      [
        "🌷",
        "tulip"
      ],
      [
        "🌹",
        "rose"
      ],
      [
        "🥀",
        "wilted flower"
      ],
      [
        "🌺",
        "hibiscus"
      ],
      [
        "🌸",
        "cherry blossom"
      ],
      [
        "🌼",
        "blossom"
      ],
      [
        "🌻",
        "sunflower"
      ],
      [
        "🪻",
        "hyacinth"
      ],
      [
        "🪷",
        "lotus"
      ],
      [
        "🌞",
        "sun with face"
      ],
      [
        "🌝",
        "full moon with face"
      ],
      [
        "🌛",
        "first quarter moon with face"
      ],
      [
        "🌜",
        "last quarter moon with face"
      ],
      [
        "🌚",
        "new moon with face"
      ],
      [
        "🌕",
        "full moon symbol"
      ],
      [
        "🌖",
        "waning gibbous moon symbol"
      ],
      [
        "🌗",
        "last quarter moon symbol"
      ],
      [
        "🌘",
        "waning crescent moon symbol"
      ],
      [
        "🌑",
        "new moon symbol"
      ],
      [
        "🌒",
        "waxing crescent moon symbol"
      ],
      [
        "🌓",
        "first quarter moon symbol"
      ],
      [
        "🌔",
        "waxing gibbous moon symbol"
      ],
      [
        "🌙",
        "crescent moon"
      ],
      [
        "⭐",
        "white medium star"
      ],
      [
        "🌟",
        "glowing star"
      ],
      [
        "✨",
        "sparkles"
      ],
      [
        "⚡",
        "high voltage sign"
      ],
      [
        "☄️",
        "comet"
      ],
      [
        "💫",
        "dizzy symbol"
      ],
      [
        "🔥",
        "fire"
      ],
      [
        "🌈",
        "rainbow"
      ],
      [
        "☀️",
        "black sun with rays"
      ],
      [
        "🌤️",
        "white sun with small cloud"
      ],
      [
        "⛅",
        "sun behind cloud"
      ],
      [
        "🌥️",
        "white sun behind cloud"
      ],
      [
        "☁️",
        "cloud"
      ],
      [
        "🌦️",
        "white sun behind cloud with rain"
      ],
      [
        "🌧️",
        "cloud with rain"
      ],
      [
        "⛈️",
        "thunder cloud and rain"
      ],
      [
        "🌩️",
        "cloud with lightning"
      ],
      [
        "🌨️",
        "cloud with snow"
      ],
      [
        "❄️",
        "snowflake"
      ],
      [
        "☃️",
        "snowman"
      ],
      [
        "⛄",
        "snowman without snow"
      ],
      [
        "🌬️",
        "wind blowing face"
      ],
      [
        "💨",
        "dash symbol"
      ],
      [
        "💧",
        "droplet"
      ],
      [
        "💦",
        "splashing sweat symbol"
      ],
      [
        "☔",
        "umbrella with rain drops"
      ],
      [
        "☂️",
        "umbrella"
      ],
      [
        "🌊",
        "water wave"
      ]
    ]
  },
  {
    "name": "Food & Drink",
    "items": [
      [
        "🍏",
        "green apple"
      ],
      [
        "🍎",
        "red apple"
      ],
      [
        "🍐",
        "pear"
      ],
      [
        "🍊",
        "tangerine"
      ],
      [
        "🍋",
        "lemon"
      ],
      [
        "🍋‍🟩",
        "lemon large green square"
      ],
      [
        "🍌",
        "banana"
      ],
      [
        "🍉",
        "watermelon"
      ],
      [
        "🍇",
        "grapes"
      ],
      [
        "🍓",
        "strawberry"
      ],
      [
        "🫐",
        "blueberries"
      ],
      [
        "🍈",
        "melon"
      ],
      [
        "🍒",
        "cherries"
      ],
      [
        "🍑",
        "peach"
      ],
      [
        "🥭",
        "mango"
      ],
      [
        "🍍",
        "pineapple"
      ],
      [
        "🥥",
        "coconut"
      ],
      [
        "🥝",
        "kiwifruit"
      ],
      [
        "🍅",
        "tomato"
      ],
      [
        "🍆",
        "aubergine"
      ],
      [
        "🥑",
        "avocado"
      ],
      [
        "🥦",
        "broccoli"
      ],
      [
        "🥬",
        "leafy green"
      ],
      [
        "🥒",
        "cucumber"
      ],
      [
        "🌶️",
        "hot pepper"
      ],
      [
        "🫑",
        "bell pepper"
      ],
      [
        "🌽",
        "ear of maize"
      ],
      [
        "🥕",
        "carrot"
      ],
      [
        "🫒",
        "olive"
      ],
      [
        "🧄",
        "garlic"
      ],
      [
        "🧅",
        "onion"
      ],
      [
        "🥔",
        "potato"
      ],
      [
        "🍠",
        "roasted sweet potato"
      ],
      [
        "🫚",
        "ginger root"
      ],
      [
        "🫘",
        "beans"
      ],
      [
        "🥜",
        "peanuts"
      ],
      [
        "🌰",
        "chestnut"
      ],
      [
        "🍞",
        "bread"
      ],
      [
        "🥐",
        "croissant"
      ],
      [
        "🥖",
        "baguette bread"
      ],
      [
        "🫓",
        "flatbread"
      ],
      [
        "🥨",
        "pretzel"
      ],
      [
        "🥯",
        "bagel"
      ],
      [
        "🥞",
        "pancakes"
      ],
      [
        "🧇",
        "waffle"
      ],
      [
        "🧀",
        "cheese wedge"
      ],
      [
        "🍖",
        "meat on bone"
      ],
      [
        "🍗",
        "poultry leg"
      ],
      [
        "🥩",
        "cut of meat"
      ],
      [
        "🥓",
        "bacon"
      ],
      [
        "🍔",
        "hamburger"
      ],
      [
        "🍟",
        "french fries"
      ],
      [
        "🍕",
        "slice of pizza"
      ],
      [
        "🌭",
        "hot dog"
      ],
      [
        "🥪",
        "sandwich"
      ],
      [
        "🌮",
        "taco"
      ],
      [
        "🌯",
        "burrito"
      ],
      [
        "🫔",
        "tamale"
      ],
      [
        "🥙",
        "stuffed flatbread"
      ],
      [
        "🧆",
        "falafel"
      ],
      [
        "🥚",
        "egg"
      ],
      [
        "🍳",
        "cooking"
      ],
      [
        "🥘",
        "shallow pan of food"
      ],
      [
        "🍲",
        "pot of food"
      ],
      [
        "🫕",
        "fondue"
      ],
      [
        "🥣",
        "bowl with spoon"
      ],
      [
        "🥗",
        "green salad"
      ],
      [
        "🍿",
        "popcorn"
      ],
      [
        "🧈",
        "butter"
      ],
      [
        "🧂",
        "salt shaker"
      ],
      [
        "🥫",
        "canned food"
      ],
      [
        "🍱",
        "bento box"
      ],
      [
        "🍘",
        "rice cracker"
      ],
      [
        "🍙",
        "rice ball"
      ],
      [
        "🍚",
        "cooked rice"
      ],
      [
        "🍛",
        "curry and rice"
      ],
      [
        "🍜",
        "steaming bowl"
      ],
      [
        "🍝",
        "spaghetti"
      ],
      [
        "🍣",
        "sushi"
      ],
      [
        "🍤",
        "fried shrimp"
      ],
      [
        "🍥",
        "fish cake with swirl design"
      ],
      [
        "🥮",
        "moon cake"
      ],
      [
        "🍡",
        "dango"
      ],
      [
        "🥟",
        "dumpling"
      ],
      [
        "🥠",
        "fortune cookie"
      ],
      [
        "🥡",
        "takeout box"
      ],
      [
        "🦪",
        "oyster"
      ],
      [
        "🍦",
        "soft ice cream"
      ],
      [
        "🍧",
        "shaved ice"
      ],
      [
        "🍨",
        "ice cream"
      ],
      [
        "🍩",
        "doughnut"
      ],
      [
        "🍪",
        "cookie"
      ],
      [
        "🎂",
        "birthday cake"
      ],
      [
        "🍰",
        "shortcake"
      ],
      [
        "🧁",
        "cupcake"
      ],
      [
        "🥧",
        "pie"
      ],
      [
        "🍫",
        "chocolate bar"
      ],
      [
        "🍬",
        "candy"
      ],
      [
        "🍭",
        "lollipop"
      ],
      [
        "🍮",
        "custard"
      ],
      [
        "🍯",
        "honey pot"
      ],
      [
        "🍼",
        "baby bottle"
      ],
      [
        "🥛",
        "glass of milk"
      ],
      [
        "☕",
        "hot beverage"
      ],
      [
        "🫖",
        "teapot"
      ],
      [
        "🍵",
        "teacup without handle"
      ],
      [
        "🧃",
        "beverage box"
      ],
      [
        "🥤",
        "cup with straw"
      ],
      [
        "🧋",
        "bubble tea"
      ],
      [
        "🫙",
        "jar"
      ],
      [
        "🍶",
        "sake bottle and cup"
      ],
      [
        "🍺",
        "beer mug"
      ],
      [
        "🍻",
        "clinking beer mugs"
      ],
      [
        "🥂",
        "clinking glasses"
      ],
      [
        "🍷",
        "wine glass"
      ],
      [
        "🥃",
        "tumbler glass"
      ],
      [
        "🍸",
        "cocktail glass"
      ],
      [
        "🍹",
        "tropical drink"
      ],
      [
        "🍾",
        "bottle with popping cork"
      ],
      [
        "🧊",
        "ice cube"
      ],
      [
        "🥄",
        "spoon"
      ],
      [
        "🍴",
        "fork and knife"
      ],
      [
        "🍽️",
        "fork and knife with plate"
      ],
      [
        "🥢",
        "chopsticks"
      ]
    ]
  },
  {
    "name": "Activities & Objects",
    "items": [
      [
        "⚽",
        "soccer ball"
      ],
      [
        "🏀",
        "basketball and hoop"
      ],
      [
        "🏈",
        "american football"
      ],
      [
        "⚾",
        "baseball"
      ],
      [
        "🥎",
        "softball"
      ],
      [
        "🎾",
        "tennis racquet and ball"
      ],
      [
        "🏐",
        "volleyball"
      ],
      [
        "🏉",
        "rugby football"
      ],
      [
        "🥏",
        "flying disc"
      ],
      [
        "🎱",
        "billiards"
      ],
      [
        "🪀",
        "yo-yo"
      ],
      [
        "🏓",
        "table tennis paddle and ball"
      ],
      [
        "🏸",
        "badminton racquet and shuttlecock"
      ],
      [
        "🏒",
        "ice hockey stick and puck"
      ],
      [
        "🏑",
        "field hockey stick and ball"
      ],
      [
        "🥍",
        "lacrosse stick and ball"
      ],
      [
        "🏏",
        "cricket bat and ball"
      ],
      [
        "🪃",
        "boomerang"
      ],
      [
        "🥅",
        "goal net"
      ],
      [
        "⛳",
        "flag in hole"
      ],
      [
        "🪁",
        "kite"
      ],
      [
        "🏹",
        "bow and arrow"
      ],
      [
        "🎣",
        "fishing pole and fish"
      ],
      [
        "🤿",
        "diving mask"
      ],
      [
        "🥊",
        "boxing glove"
      ],
      [
        "🥋",
        "martial arts uniform"
      ],
      [
        "🎽",
        "running shirt with sash"
      ],
      [
        "🛹",
        "skateboard"
      ],
      [
        "🛼",
        "roller skate"
      ],
      [
        "🛷",
        "sled"
      ],
      [
        "⛸️",
        "ice skate"
      ],
      [
        "🥌",
        "curling stone"
      ],
      [
        "🎿",
        "ski and ski boot"
      ],
      [
        "⛷️",
        "skier"
      ],
      [
        "🏂",
        "snowboarder"
      ],
      [
        "🪂",
        "parachute"
      ],
      [
        "🏋️",
        "weight lifter"
      ],
      [
        "🤼",
        "wrestlers"
      ],
      [
        "🤸",
        "person doing cartwheel"
      ],
      [
        "⛹️",
        "person with ball"
      ],
      [
        "🤺",
        "fencer"
      ],
      [
        "🏌️",
        "golfer"
      ],
      [
        "🏇",
        "horse racing"
      ],
      [
        "🏊",
        "swimmer"
      ],
      [
        "🚣",
        "rowboat"
      ],
      [
        "🧗",
        "person climbing"
      ],
      [
        "🚴",
        "bicyclist"
      ],
      [
        "🚵",
        "mountain bicyclist"
      ],
      [
        "🎯",
        "direct hit"
      ],
      [
        "🎳",
        "bowling"
      ],
      [
        "🎮",
        "video game"
      ],
      [
        "🎰",
        "slot machine"
      ],
      [
        "🎲",
        "game die"
      ],
      [
        "🧩",
        "jigsaw puzzle piece"
      ],
      [
        "♟️",
        "black chess pawn"
      ],
      [
        "🎭",
        "performing arts"
      ],
      [
        "🎨",
        "artist palette"
      ],
      [
        "🧵",
        "spool of thread"
      ],
      [
        "🪡",
        "sewing needle"
      ],
      [
        "🧶",
        "ball of yarn"
      ],
      [
        "🪢",
        "knot"
      ],
      [
        "🎼",
        "musical score"
      ],
      [
        "🎵",
        "musical note"
      ],
      [
        "🎶",
        "multiple musical notes"
      ],
      [
        "🎤",
        "microphone"
      ],
      [
        "🎧",
        "headphone"
      ],
      [
        "📻",
        "radio"
      ],
      [
        "🎷",
        "saxophone"
      ],
      [
        "🪗",
        "accordion"
      ],
      [
        "🎸",
        "guitar"
      ],
      [
        "🎹",
        "musical keyboard"
      ],
      [
        "🎺",
        "trumpet"
      ],
      [
        "🎻",
        "violin"
      ],
      [
        "🪕",
        "banjo"
      ],
      [
        "🥁",
        "drum with drumsticks"
      ],
      [
        "🪘",
        "long drum"
      ],
      [
        "🎬",
        "clapper board"
      ],
      [
        "🎥",
        "movie camera"
      ],
      [
        "📷",
        "camera"
      ],
      [
        "📸",
        "camera with flash"
      ],
      [
        "📹",
        "video camera"
      ],
      [
        "📼",
        "videocassette"
      ],
      [
        "🔍",
        "left-pointing magnifying glass"
      ],
      [
        "🔎",
        "right-pointing magnifying glass"
      ],
      [
        "💡",
        "electric light bulb"
      ],
      [
        "🔦",
        "electric torch"
      ],
      [
        "🕯️",
        "candle"
      ],
      [
        "🪔",
        "diya lamp"
      ],
      [
        "📚",
        "books"
      ],
      [
        "📖",
        "open book"
      ],
      [
        "📕",
        "closed book"
      ],
      [
        "📗",
        "green book"
      ],
      [
        "📘",
        "blue book"
      ],
      [
        "📙",
        "orange book"
      ],
      [
        "📓",
        "notebook"
      ],
      [
        "📔",
        "notebook with decorative cover"
      ],
      [
        "📒",
        "ledger"
      ],
      [
        "📃",
        "page with curl"
      ],
      [
        "📜",
        "scroll"
      ],
      [
        "📄",
        "page facing up"
      ],
      [
        "📰",
        "newspaper"
      ],
      [
        "🗞️",
        "rolled-up newspaper"
      ],
      [
        "📑",
        "bookmark tabs"
      ],
      [
        "🔖",
        "bookmark"
      ],
      [
        "🏷️",
        "label"
      ],
      [
        "💰",
        "money bag"
      ],
      [
        "🪙",
        "coin"
      ],
      [
        "💵",
        "banknote with dollar sign"
      ],
      [
        "💴",
        "banknote with yen sign"
      ],
      [
        "💶",
        "banknote with euro sign"
      ],
      [
        "💷",
        "banknote with pound sign"
      ],
      [
        "💸",
        "money with wings"
      ],
      [
        "💳",
        "credit card"
      ],
      [
        "🧾",
        "receipt"
      ],
      [
        "✉️",
        "envelope"
      ],
      [
        "📧",
        "e-mail symbol"
      ],
      [
        "📨",
        "incoming envelope"
      ],
      [
        "📩",
        "envelope with downwards arrow above"
      ],
      [
        "📤",
        "outbox tray"
      ],
      [
        "📥",
        "inbox tray"
      ],
      [
        "📦",
        "package"
      ],
      [
        "📫",
        "closed mailbox with raised flag"
      ],
      [
        "📮",
        "postbox"
      ],
      [
        "🗳️",
        "ballot box with ballot"
      ],
      [
        "✏️",
        "pencil"
      ],
      [
        "✒️",
        "black nib"
      ],
      [
        "🖋️",
        "lower left fountain pen"
      ],
      [
        "🖊️",
        "lower left ballpoint pen"
      ],
      [
        "🖌️",
        "lower left paintbrush"
      ],
      [
        "🖍️",
        "lower left crayon"
      ],
      [
        "📝",
        "memo"
      ],
      [
        "💼",
        "briefcase"
      ],
      [
        "📁",
        "file folder"
      ],
      [
        "📂",
        "open file folder"
      ],
      [
        "🗂️",
        "card index dividers"
      ],
      [
        "📅",
        "calendar"
      ],
      [
        "📆",
        "tear-off calendar"
      ],
      [
        "🗒️",
        "spiral note pad"
      ],
      [
        "🗓️",
        "spiral calendar pad"
      ],
      [
        "📇",
        "card index"
      ],
      [
        "📈",
        "chart with upwards trend"
      ],
      [
        "📉",
        "chart with downwards trend"
      ],
      [
        "📊",
        "bar chart"
      ],
      [
        "📋",
        "clipboard"
      ],
      [
        "📌",
        "pushpin"
      ],
      [
        "📍",
        "round pushpin"
      ],
      [
        "📎",
        "paperclip"
      ],
      [
        "🖇️",
        "linked paperclips"
      ],
      [
        "📏",
        "straight ruler"
      ],
      [
        "📐",
        "triangular ruler"
      ],
      [
        "✂️",
        "black scissors"
      ],
      [
        "🗃️",
        "card file box"
      ],
      [
        "🗄️",
        "file cabinet"
      ],
      [
        "🗑️",
        "wastebasket"
      ],
      [
        "🔒",
        "lock"
      ],
      [
        "🔓",
        "open lock"
      ],
      [
        "🔐",
        "closed lock with key"
      ],
      [
        "🔑",
        "key"
      ],
      [
        "🗝️",
        "old key"
      ],
      [
        "🔨",
        "hammer"
      ],
      [
        "🪓",
        "axe"
      ],
      [
        "⛏️",
        "pick"
      ],
      [
        "⚒️",
        "hammer and pick"
      ],
      [
        "🛠️",
        "hammer and wrench"
      ],
      [
        "🗡️",
        "dagger knife"
      ],
      [
        "⚔️",
        "crossed swords"
      ],
      [
        "🛡️",
        "shield"
      ],
      [
        "🔧",
        "wrench"
      ],
      [
        "🪛",
        "screwdriver"
      ],
      [
        "🔩",
        "nut and bolt"
      ],
      [
        "⚙️",
        "gear"
      ],
      [
        "🗜️",
        "compression"
      ],
      [
        "⚖️",
        "scales"
      ],
      [
        "🦯",
        "probing cane"
      ],
      [
        "🔗",
        "link symbol"
      ],
      [
        "⛓️",
        "chains"
      ],
      [
        "🪝",
        "hook"
      ],
      [
        "🧲",
        "magnet"
      ],
      [
        "🪜",
        "ladder"
      ],
      [
        "🧰",
        "toolbox"
      ],
      [
        "🪣",
        "bucket"
      ],
      [
        "🧪",
        "test tube"
      ],
      [
        "🧫",
        "petri dish"
      ],
      [
        "🧬",
        "dna double helix"
      ],
      [
        "🔬",
        "microscope"
      ],
      [
        "🔭",
        "telescope"
      ],
      [
        "📡",
        "satellite antenna"
      ],
      [
        "💉",
        "syringe"
      ],
      [
        "🩸",
        "drop of blood"
      ],
      [
        "💊",
        "pill"
      ],
      [
        "🩹",
        "adhesive bandage"
      ],
      [
        "🩺",
        "stethoscope"
      ],
      [
        "🩻",
        "x-ray"
      ],
      [
        "🚪",
        "door"
      ],
      [
        "🪞",
        "mirror"
      ],
      [
        "🪟",
        "window"
      ],
      [
        "🛏️",
        "bed"
      ],
      [
        "🛋️",
        "couch and lamp"
      ],
      [
        "🪑",
        "chair"
      ],
      [
        "🚽",
        "toilet"
      ],
      [
        "🪠",
        "plunger"
      ],
      [
        "🚿",
        "shower"
      ],
      [
        "🛁",
        "bathtub"
      ],
      [
        "🧼",
        "bar of soap"
      ],
      [
        "🪥",
        "toothbrush"
      ],
      [
        "🪒",
        "razor"
      ],
      [
        "🧽",
        "sponge"
      ],
      [
        "🧹",
        "broom"
      ],
      [
        "🧺",
        "basket"
      ],
      [
        "🧻",
        "roll of paper"
      ],
      [
        "🛒",
        "shopping trolley"
      ],
      [
        "🎁",
        "wrapped present"
      ],
      [
        "🎀",
        "ribbon"
      ],
      [
        "🎈",
        "balloon"
      ],
      [
        "🎉",
        "party popper"
      ],
      [
        "🎊",
        "confetti ball"
      ],
      [
        "🎃",
        "jack-o-lantern"
      ],
      [
        "🎆",
        "fireworks"
      ],
      [
        "🎇",
        "firework sparkler"
      ],
      [
        "🧨",
        "firecracker"
      ],
      [
        "🎐",
        "wind chime"
      ],
      [
        "🎏",
        "carp streamer"
      ],
      [
        "🎎",
        "japanese dolls"
      ],
      [
        "🎑",
        "moon viewing ceremony"
      ],
      [
        "🧧",
        "red gift envelope"
      ],
      [
        "🎫",
        "ticket"
      ],
      [
        "🏆",
        "trophy"
      ],
      [
        "🥇",
        "first place medal"
      ],
      [
        "🥈",
        "second place medal"
      ],
      [
        "🥉",
        "third place medal"
      ],
      [
        "🏅",
        "sports medal"
      ],
      [
        "🎖️",
        "military medal"
      ]
    ]
  },
  {
    "name": "Travel & Places",
    "items": [
      [
        "🚗",
        "automobile"
      ],
      [
        "🚕",
        "taxi"
      ],
      [
        "🚙",
        "recreational vehicle"
      ],
      [
        "🚌",
        "bus"
      ],
      [
        "🚎",
        "trolleybus"
      ],
      [
        "🏎️",
        "racing car"
      ],
      [
        "🚓",
        "police car"
      ],
      [
        "🚑",
        "ambulance"
      ],
      [
        "🚒",
        "fire engine"
      ],
      [
        "🚐",
        "minibus"
      ],
      [
        "🛻",
        "pickup truck"
      ],
      [
        "🚚",
        "delivery truck"
      ],
      [
        "🚛",
        "articulated lorry"
      ],
      [
        "🚜",
        "tractor"
      ],
      [
        "🏍️",
        "racing motorcycle"
      ],
      [
        "🛵",
        "motor scooter"
      ],
      [
        "🚲",
        "bicycle"
      ],
      [
        "🛴",
        "scooter"
      ],
      [
        "🛺",
        "auto rickshaw"
      ],
      [
        "🚨",
        "police cars revolving light"
      ],
      [
        "🚥",
        "horizontal traffic light"
      ],
      [
        "🚦",
        "vertical traffic light"
      ],
      [
        "🛑",
        "octagonal sign"
      ],
      [
        "🚧",
        "construction sign"
      ],
      [
        "⚓",
        "anchor"
      ],
      [
        "⛵",
        "sailboat"
      ],
      [
        "🚤",
        "speedboat"
      ],
      [
        "🛥️",
        "motor boat"
      ],
      [
        "🛳️",
        "passenger ship"
      ],
      [
        "⛴️",
        "ferry"
      ],
      [
        "🚢",
        "ship"
      ],
      [
        "✈️",
        "airplane"
      ],
      [
        "🛩️",
        "small airplane"
      ],
      [
        "🛫",
        "airplane departure"
      ],
      [
        "🛬",
        "airplane arriving"
      ],
      [
        "💺",
        "seat"
      ],
      [
        "🚁",
        "helicopter"
      ],
      [
        "🚟",
        "suspension railway"
      ],
      [
        "🚠",
        "mountain cableway"
      ],
      [
        "🚡",
        "aerial tramway"
      ],
      [
        "🚞",
        "mountain railway"
      ],
      [
        "🚋",
        "tram car"
      ],
      [
        "🚃",
        "railway car"
      ],
      [
        "🚂",
        "steam locomotive"
      ],
      [
        "🚆",
        "train"
      ],
      [
        "🚇",
        "metro"
      ],
      [
        "🚈",
        "light rail"
      ],
      [
        "🚉",
        "station"
      ],
      [
        "🚊",
        "tram"
      ],
      [
        "🚝",
        "monorail"
      ],
      [
        "🚄",
        "high-speed train"
      ],
      [
        "🚅",
        "high-speed train with bullet nose"
      ],
      [
        "🚍",
        "oncoming bus"
      ],
      [
        "🚏",
        "bus stop"
      ],
      [
        "🗺️",
        "world map"
      ],
      [
        "🧭",
        "compass"
      ],
      [
        "🗿",
        "moyai"
      ],
      [
        "🗽",
        "statue of liberty"
      ],
      [
        "🗼",
        "tokyo tower"
      ],
      [
        "🏰",
        "european castle"
      ],
      [
        "🏯",
        "japanese castle"
      ],
      [
        "🏟️",
        "stadium"
      ],
      [
        "🎡",
        "ferris wheel"
      ],
      [
        "🎢",
        "roller coaster"
      ],
      [
        "🎠",
        "carousel horse"
      ],
      [
        "⛲",
        "fountain"
      ],
      [
        "⛱️",
        "umbrella on ground"
      ],
      [
        "🏖️",
        "beach with umbrella"
      ],
      [
        "🏝️",
        "desert island"
      ],
      [
        "🏜️",
        "desert"
      ],
      [
        "🌋",
        "volcano"
      ],
      [
        "⛰️",
        "mountain"
      ],
      [
        "🏔️",
        "snow capped mountain"
      ],
      [
        "🗻",
        "mount fuji"
      ],
      [
        "🏕️",
        "camping"
      ],
      [
        "🏠",
        "house building"
      ],
      [
        "🏡",
        "house with garden"
      ],
      [
        "🏘️",
        "house buildings"
      ],
      [
        "🏚️",
        "derelict house building"
      ],
      [
        "🏗️",
        "building construction"
      ],
      [
        "🏢",
        "office building"
      ],
      [
        "🏬",
        "department store"
      ],
      [
        "🏣",
        "japanese post office"
      ],
      [
        "🏤",
        "european post office"
      ],
      [
        "🏥",
        "hospital"
      ],
      [
        "🏦",
        "bank"
      ],
      [
        "🏨",
        "hotel"
      ],
      [
        "🏪",
        "convenience store"
      ],
      [
        "🏫",
        "school"
      ],
      [
        "🏩",
        "love hotel"
      ],
      [
        "💒",
        "wedding"
      ],
      [
        "🏛️",
        "classical building"
      ],
      [
        "⛪",
        "church"
      ],
      [
        "🕌",
        "mosque"
      ],
      [
        "🕍",
        "synagogue"
      ],
      [
        "🛕",
        "hindu temple"
      ],
      [
        "🕋",
        "kaaba"
      ],
      [
        "⛩️",
        "shinto shrine"
      ],
      [
        "🛤️",
        "railway track"
      ],
      [
        "🛣️",
        "motorway"
      ],
      [
        "🌅",
        "sunrise"
      ],
      [
        "🌄",
        "sunrise over mountains"
      ],
      [
        "🌠",
        "shooting star"
      ],
      [
        "🌇",
        "sunset over buildings"
      ],
      [
        "🌆",
        "cityscape at dusk"
      ],
      [
        "🏙️",
        "cityscape"
      ],
      [
        "🌃",
        "night with stars"
      ],
      [
        "🌉",
        "bridge at night"
      ],
      [
        "🌁",
        "foggy"
      ]
    ]
  },
  {
    "name": "Symbols & Hearts",
    "items": [
      [
        "❤️",
        "heavy black heart"
      ],
      [
        "🩷",
        "pink heart"
      ],
      [
        "🧡",
        "orange heart"
      ],
      [
        "💛",
        "yellow heart"
      ],
      [
        "💚",
        "green heart"
      ],
      [
        "💙",
        "blue heart"
      ],
      [
        "🩵",
        "light blue heart"
      ],
      [
        "💜",
        "purple heart"
      ],
      [
        "🤎",
        "brown heart"
      ],
      [
        "🖤",
        "black heart"
      ],
      [
        "🩶",
        "grey heart"
      ],
      [
        "🤍",
        "white heart"
      ],
      [
        "💔",
        "broken heart"
      ],
      [
        "❤️‍🔥",
        "heavy black heart fire"
      ],
      [
        "❤️‍🩹",
        "heavy black heart adhesive bandage"
      ],
      [
        "❣️",
        "heavy heart exclamation mark ornament"
      ],
      [
        "💕",
        "two hearts"
      ],
      [
        "💞",
        "revolving hearts"
      ],
      [
        "💓",
        "beating heart"
      ],
      [
        "💗",
        "growing heart"
      ],
      [
        "💖",
        "sparkling heart"
      ],
      [
        "💘",
        "heart with arrow"
      ],
      [
        "💝",
        "heart with ribbon"
      ],
      [
        "💟",
        "heart decoration"
      ],
      [
        "♥️",
        "black heart suit"
      ],
      [
        "💌",
        "love letter"
      ],
      [
        "💋",
        "kiss mark"
      ],
      [
        "💯",
        "hundred points symbol"
      ],
      [
        "💢",
        "anger symbol"
      ],
      [
        "💥",
        "collision symbol"
      ],
      [
        "🕳️",
        "hole"
      ],
      [
        "💬",
        "speech balloon"
      ],
      [
        "👁️‍🗨️",
        "eye left speech bubble"
      ],
      [
        "🗨️",
        "left speech bubble"
      ],
      [
        "🗯️",
        "right anger bubble"
      ],
      [
        "💭",
        "thought balloon"
      ],
      [
        "💤",
        "sleeping symbol"
      ],
      [
        "✅",
        "white heavy check mark"
      ],
      [
        "☑️",
        "ballot box with check"
      ],
      [
        "✔️",
        "heavy check mark"
      ],
      [
        "❌",
        "cross mark"
      ],
      [
        "❎",
        "negative squared cross mark"
      ],
      [
        "➕",
        "heavy plus sign"
      ],
      [
        "➖",
        "heavy minus sign"
      ],
      [
        "➗",
        "heavy division sign"
      ],
      [
        "✖️",
        "heavy multiplication x"
      ],
      [
        "♾️",
        "permanent paper sign"
      ],
      [
        "‼️",
        "double exclamation mark"
      ],
      [
        "⁉️",
        "exclamation question mark"
      ],
      [
        "❓",
        "black question mark ornament"
      ],
      [
        "❔",
        "white question mark ornament"
      ],
      [
        "❕",
        "white exclamation mark ornament"
      ],
      [
        "❗",
        "heavy exclamation mark symbol"
      ],
      [
        "〰️",
        "wavy dash"
      ],
      [
        "⚠️",
        "warning sign"
      ],
      [
        "🚸",
        "children crossing"
      ],
      [
        "🔱",
        "trident emblem"
      ],
      [
        "⚜️",
        "fleur-de-lis"
      ],
      [
        "🔰",
        "japanese symbol for beginner"
      ],
      [
        "♻️",
        "black universal recycling symbol"
      ],
      [
        "✳️",
        "eight spoked asterisk"
      ],
      [
        "❇️",
        "sparkle"
      ],
      [
        "✴️",
        "eight pointed black star"
      ],
      [
        "©️",
        "copyright sign"
      ],
      [
        "®️",
        "registered sign"
      ],
      [
        "™️",
        "trade mark sign"
      ],
      [
        "Ⓜ️",
        "circled latin capital letter m"
      ],
      [
        "🆕",
        "squared new"
      ],
      [
        "🆓",
        "squared free"
      ],
      [
        "🆙",
        "squared up with exclamation mark"
      ],
      [
        "🆒",
        "squared cool"
      ],
      [
        "🆗",
        "squared ok"
      ],
      [
        "🆘",
        "squared sos"
      ],
      [
        "🆔",
        "squared id"
      ],
      [
        "🆚",
        "squared vs"
      ],
      [
        "🔞",
        "no one under eighteen symbol"
      ],
      [
        "🚫",
        "no entry sign"
      ],
      [
        "⛔",
        "no entry"
      ],
      [
        "🚷",
        "no pedestrians"
      ],
      [
        "🚯",
        "do not litter symbol"
      ],
      [
        "🚱",
        "non-potable water symbol"
      ],
      [
        "🚳",
        "no bicycles"
      ],
      [
        "🚭",
        "no smoking symbol"
      ],
      [
        "📵",
        "no mobile phones"
      ],
      [
        "🔕",
        "bell with cancellation stroke"
      ],
      [
        "🔔",
        "bell"
      ],
      [
        "🔊",
        "speaker with three sound waves"
      ],
      [
        "🔉",
        "speaker with one sound wave"
      ],
      [
        "🔈",
        "speaker"
      ],
      [
        "🔇",
        "speaker with cancellation stroke"
      ],
      [
        "📢",
        "public address loudspeaker"
      ],
      [
        "📣",
        "cheering megaphone"
      ],
      [
        "🔴",
        "large red circle"
      ],
      [
        "🟠",
        "large orange circle"
      ],
      [
        "🟡",
        "large yellow circle"
      ],
      [
        "🟢",
        "large green circle"
      ],
      [
        "🔵",
        "large blue circle"
      ],
      [
        "🟣",
        "large purple circle"
      ],
      [
        "🟤",
        "large brown circle"
      ],
      [
        "⚫",
        "medium black circle"
      ],
      [
        "⚪",
        "medium white circle"
      ],
      [
        "🟥",
        "large red square"
      ],
      [
        "🟧",
        "large orange square"
      ],
      [
        "🟨",
        "large yellow square"
      ],
      [
        "🟩",
        "large green square"
      ],
      [
        "🟦",
        "large blue square"
      ],
      [
        "🟪",
        "large purple square"
      ],
      [
        "🟫",
        "large brown square"
      ],
      [
        "⬛",
        "black large square"
      ],
      [
        "⬜",
        "white large square"
      ],
      [
        "🔶",
        "large orange diamond"
      ],
      [
        "🔷",
        "large blue diamond"
      ],
      [
        "🔸",
        "small orange diamond"
      ],
      [
        "🔹",
        "small blue diamond"
      ],
      [
        "🔺",
        "up-pointing red triangle"
      ],
      [
        "🔻",
        "down-pointing red triangle"
      ],
      [
        "💠",
        "diamond shape with a dot inside"
      ],
      [
        "🔘",
        "radio button"
      ],
      [
        "🔳",
        "white square button"
      ],
      [
        "🔲",
        "black square button"
      ],
      [
        "▪️",
        "black small square"
      ],
      [
        "▫️",
        "white small square"
      ],
      [
        "◼️",
        "black medium square"
      ],
      [
        "◻️",
        "white medium square"
      ],
      [
        "◾",
        "black medium small square"
      ],
      [
        "◽",
        "white medium small square"
      ],
      [
        "⬆️",
        "upwards black arrow"
      ],
      [
        "↗️",
        "north east arrow"
      ],
      [
        "➡️",
        "black rightwards arrow"
      ],
      [
        "↘️",
        "south east arrow"
      ],
      [
        "⬇️",
        "downwards black arrow"
      ],
      [
        "↙️",
        "south west arrow"
      ],
      [
        "⬅️",
        "leftwards black arrow"
      ],
      [
        "↖️",
        "north west arrow"
      ],
      [
        "↕️",
        "up down arrow"
      ],
      [
        "↔️",
        "left right arrow"
      ],
      [
        "↩️",
        "leftwards arrow with hook"
      ],
      [
        "↪️",
        "rightwards arrow with hook"
      ],
      [
        "⤴️",
        "arrow pointing rightwards then curving upwards"
      ],
      [
        "⤵️",
        "arrow pointing rightwards then curving downwards"
      ],
      [
        "🔀",
        "twisted rightwards arrows"
      ],
      [
        "🔁",
        "clockwise rightwards and leftwards open circle arrows"
      ],
      [
        "🔂",
        "clockwise rightwards and leftwards open circle arrows with circled one overlay"
      ],
      [
        "▶️",
        "black right-pointing triangle"
      ],
      [
        "⏩",
        "black right-pointing double triangle"
      ],
      [
        "⏭️",
        "black right-pointing double triangle with vertical bar"
      ],
      [
        "⏯️",
        "black right-pointing triangle with double vertical bar"
      ],
      [
        "◀️",
        "black left-pointing triangle"
      ],
      [
        "⏪",
        "black left-pointing double triangle"
      ],
      [
        "⏮️",
        "black left-pointing double triangle with vertical bar"
      ],
      [
        "🔼",
        "up-pointing small red triangle"
      ],
      [
        "⏫",
        "black up-pointing double triangle"
      ],
      [
        "🔽",
        "down-pointing small red triangle"
      ],
      [
        "⏬",
        "black down-pointing double triangle"
      ],
      [
        "⏸️",
        "double vertical bar"
      ],
      [
        "⏹️",
        "black square for stop"
      ],
      [
        "⏺️",
        "black circle for record"
      ],
      [
        "⏏️",
        "eject symbol"
      ],
      [
        "🎦",
        "cinema"
      ],
      [
        "📶",
        "antenna with bars"
      ],
      [
        "🛜",
        "wireless"
      ],
      [
        "📳",
        "vibration mode"
      ],
      [
        "📴",
        "mobile phone off"
      ]
    ]
  },
  {
    "name": "Flags",
    "items": [
      [
        "🇰🇷",
        "regional indicator symbol letter k regional indicator symbol letter r"
      ],
      [
        "🇯🇵",
        "regional indicator symbol letter j regional indicator symbol letter p"
      ],
      [
        "🇺🇸",
        "regional indicator symbol letter u regional indicator symbol letter s"
      ],
      [
        "🇬🇧",
        "regional indicator symbol letter g regional indicator symbol letter b"
      ],
      [
        "🇫🇷",
        "regional indicator symbol letter f regional indicator symbol letter r"
      ],
      [
        "🇩🇪",
        "regional indicator symbol letter d regional indicator symbol letter e"
      ],
      [
        "🇮🇹",
        "regional indicator symbol letter i regional indicator symbol letter t"
      ],
      [
        "🇪🇸",
        "regional indicator symbol letter e regional indicator symbol letter s"
      ],
      [
        "🇵🇹",
        "regional indicator symbol letter p regional indicator symbol letter t"
      ],
      [
        "🇳🇱",
        "regional indicator symbol letter n regional indicator symbol letter l"
      ],
      [
        "🇧🇪",
        "regional indicator symbol letter b regional indicator symbol letter e"
      ],
      [
        "🇨🇭",
        "regional indicator symbol letter c regional indicator symbol letter h"
      ],
      [
        "🇦🇹",
        "regional indicator symbol letter a regional indicator symbol letter t"
      ],
      [
        "🇸🇪",
        "regional indicator symbol letter s regional indicator symbol letter e"
      ],
      [
        "🇳🇴",
        "regional indicator symbol letter n regional indicator symbol letter o"
      ],
      [
        "🇩🇰",
        "regional indicator symbol letter d regional indicator symbol letter k"
      ],
      [
        "🇫🇮",
        "regional indicator symbol letter f regional indicator symbol letter i"
      ],
      [
        "🇮🇸",
        "regional indicator symbol letter i regional indicator symbol letter s"
      ],
      [
        "🇮🇪",
        "regional indicator symbol letter i regional indicator symbol letter e"
      ],
      [
        "🇵🇱",
        "regional indicator symbol letter p regional indicator symbol letter l"
      ],
      [
        "🇨🇿",
        "regional indicator symbol letter c regional indicator symbol letter z"
      ],
      [
        "🇭🇺",
        "regional indicator symbol letter h regional indicator symbol letter u"
      ],
      [
        "🇬🇷",
        "regional indicator symbol letter g regional indicator symbol letter r"
      ],
      [
        "🇹🇷",
        "regional indicator symbol letter t regional indicator symbol letter r"
      ],
      [
        "🇬🇪",
        "regional indicator symbol letter g regional indicator symbol letter e"
      ],
      [
        "🇺🇦",
        "regional indicator symbol letter u regional indicator symbol letter a"
      ],
      [
        "🇷🇺",
        "regional indicator symbol letter r regional indicator symbol letter u"
      ],
      [
        "🇨🇦",
        "regional indicator symbol letter c regional indicator symbol letter a"
      ],
      [
        "🇲🇽",
        "regional indicator symbol letter m regional indicator symbol letter x"
      ],
      [
        "🇧🇷",
        "regional indicator symbol letter b regional indicator symbol letter r"
      ],
      [
        "🇦🇷",
        "regional indicator symbol letter a regional indicator symbol letter r"
      ],
      [
        "🇨🇱",
        "regional indicator symbol letter c regional indicator symbol letter l"
      ],
      [
        "🇨🇴",
        "regional indicator symbol letter c regional indicator symbol letter o"
      ],
      [
        "🇵🇪",
        "regional indicator symbol letter p regional indicator symbol letter e"
      ],
      [
        "🇦🇺",
        "regional indicator symbol letter a regional indicator symbol letter u"
      ],
      [
        "🇳🇿",
        "regional indicator symbol letter n regional indicator symbol letter z"
      ],
      [
        "🇨🇳",
        "regional indicator symbol letter c regional indicator symbol letter n"
      ],
      [
        "🇹🇼",
        "regional indicator symbol letter t regional indicator symbol letter w"
      ],
      [
        "🇭🇰",
        "regional indicator symbol letter h regional indicator symbol letter k"
      ],
      [
        "🇸🇬",
        "regional indicator symbol letter s regional indicator symbol letter g"
      ],
      [
        "🇹🇭",
        "regional indicator symbol letter t regional indicator symbol letter h"
      ],
      [
        "🇻🇳",
        "regional indicator symbol letter v regional indicator symbol letter n"
      ],
      [
        "🇮🇩",
        "regional indicator symbol letter i regional indicator symbol letter d"
      ],
      [
        "🇲🇾",
        "regional indicator symbol letter m regional indicator symbol letter y"
      ],
      [
        "🇵🇭",
        "regional indicator symbol letter p regional indicator symbol letter h"
      ],
      [
        "🇮🇳",
        "regional indicator symbol letter i regional indicator symbol letter n"
      ],
      [
        "🇵🇰",
        "regional indicator symbol letter p regional indicator symbol letter k"
      ],
      [
        "🇧🇩",
        "regional indicator symbol letter b regional indicator symbol letter d"
      ],
      [
        "🇳🇵",
        "regional indicator symbol letter n regional indicator symbol letter p"
      ],
      [
        "🇱🇰",
        "regional indicator symbol letter l regional indicator symbol letter k"
      ],
      [
        "🇦🇪",
        "regional indicator symbol letter a regional indicator symbol letter e"
      ],
      [
        "🇸🇦",
        "regional indicator symbol letter s regional indicator symbol letter a"
      ],
      [
        "🇮🇱",
        "regional indicator symbol letter i regional indicator symbol letter l"
      ],
      [
        "🇪🇬",
        "regional indicator symbol letter e regional indicator symbol letter g"
      ],
      [
        "🇲🇦",
        "regional indicator symbol letter m regional indicator symbol letter a"
      ],
      [
        "🇿🇦",
        "regional indicator symbol letter z regional indicator symbol letter a"
      ],
      [
        "🇳🇬",
        "regional indicator symbol letter n regional indicator symbol letter g"
      ],
      [
        "🇰🇪",
        "regional indicator symbol letter k regional indicator symbol letter e"
      ],
      [
        "🇪🇹",
        "regional indicator symbol letter e regional indicator symbol letter t"
      ],
      [
        "🇺🇳",
        "regional indicator symbol letter u regional indicator symbol letter n"
      ],
      [
        "🏳️",
        "waving white flag"
      ],
      [
        "🏴",
        "waving black flag"
      ],
      [
        "🏁",
        "chequered flag"
      ],
      [
        "🚩",
        "triangular flag on post"
      ],
      [
        "🎌",
        "crossed flags"
      ],
      [
        "🏳️‍🌈",
        "waving white flag rainbow"
      ],
      [
        "🏳️‍⚧️",
        "waving white flag male with stroke and male and female sign"
      ],
      [
        "🏴‍☠️",
        "waving black flag skull and crossbones"
      ]
    ]
  }
];
