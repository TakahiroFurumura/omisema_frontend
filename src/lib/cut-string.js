
const RELATIVE_FONT_WIDTH = {
    "a": 60,
    "b": 60,
    "c": 52,
    "d": 60,
    "e": 60,
    "f": 30,
    "g": 60,
    "h": 60,
    "i": 25,
    "j": 25,
    "k": 52,
    "l": 25,
    "m": 87,
    "n": 60,
    "o": 60,
    "p": 60,
    "q": 60,
    "r": 35,
    "s": 52,
    "t": 30,
    "u": 60,
    "v": 52,
    "w": 77,
    "x": 52,
    "y": 52,
    "z": 52,
    "A": 70,
    "B": 70,
    "C": 77,
    "D": 77,
    "E": 70,
    "F": 65,
    "G": 82,
    "H": 77,
    "I": 30,
    "J": 55,
    "K": 70,
    "L": 60,
    "M": 87,
    "N": 77,
    "O": 82,
    "P": 70,
    "Q": 82,
    "R": 77,
    "S": 70,
    "T": 65,
    "U": 77,
    "V": 70,
    "W": 100,
    "X": 70,
    "Y": 70,
    "Z": 65,

    "0": 65,
    "1": 65,
    "2": 65,
    "3": 65,
    "4": 65,
    "5": 65,
    "6": 65,
    "7": 65,
    "8": 65,
    "9": 65,

    "!": 65,
    "#": 65,
    "$": 65,
    "%": 65,
    "&": 65,
    "'": 65,
    "(": 65,
    ")": 65,
    "-": 65,
    "^": 65,
    "@": 65,
    "[": 65,
    ";": 65,
    ":": 65,
    "]": 65,
    ",": 65,
    ".": 65,
    "/": 65,
    "\\": 65,
    "+": 65,
    "=": 65,
    "~": 65,
    "|": 65,
    "`": 65,
    "{": 65,
    "*": 65,
    '"': 65,
    "}": 65,
    "<": 65,
    ">": 65,
    "?": 65,
    "_": 65
}

function cutString(str, cut_length_px, font_px) {
    if (!str) {
        return str
    }

    let str_length = 0.0;
    for (let i = 0; i < str.length; i++) {
        // 文字の長さを足していく
        if (str.charAt(i) in RELATIVE_FONT_WIDTH) {
            str_length += RELATIVE_FONT_WIDTH[str.charAt(i)] / 100 * font_px
        } else {
            str_length += 100 / 100 * font_px
        }
        // 指定の長さを超えたら、ちょん切って返す
        if (str_length > cut_length_px) {
            return (str.slice(0, i) + "..")
        }
    }
    return str
}

export {
    cutString
}